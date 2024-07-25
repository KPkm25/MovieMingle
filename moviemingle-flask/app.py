from flask import Flask, request, jsonify
import pickle
import difflib
import requests
from requests.exceptions import RequestException, ConnectionError
from flask_cors import CORS
import time
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

with open('movie_recommender.pkl', 'rb') as f:
    movies_data = pickle.load(f)
    similarity = pickle.load(f)
    vectorizer = pickle.load(f)

TMDB_API_KEY = os.getenv('TMDB_API_KEY')

def get_movie_details(movie_title):
    search_url = f"https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&query={movie_title}"
    try:
        response = requests.get(search_url)
        response.raise_for_status()
        data = response.json()
        if data['results']:
            movie_id = data['results'][0]['id']
            movie_details_url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={TMDB_API_KEY}&append_to_response=credits"
            details_response = requests.get(movie_details_url)
            details_response.raise_for_status()
            details = details_response.json()
            genres = [genre['name'] for genre in details.get('genres', [])]
            cast = [{
                "name": cast_member['name'],
                "character": cast_member['character'],
                "profile_path": cast_member['profile_path']
            } for cast_member in details['credits']['cast'][:5]]  # Limit to top 5 cast members
            return {
                "title": details.get('title'),
                "director": ", ".join([crew['name'] for crew in details['credits']['crew'] if crew['job'] == 'Director']),
                "poster": f"https://image.tmdb.org/t/p/w500{details.get('poster_path')}",
                "synopsis": details.get('overview'),
                "release_date": details.get('release_date'),
                "genre": ", ".join(genres),
                "backdrop_path": details.get('backdrop_path'),
                "cast": cast,
                "tagline": details.get('tagline')
            }
    except ConnectionError as e:
        if 'ConnectionResetError' in str(e):
            return {"error": "ConnectionResetError"}
        print(f"An error occurred: {e}")
        return None
    except RequestException as e:
        print(f"An error occurred: {e}")
        return None
    return None

@app.route('/recommend', methods=['GET'])
def recommend_movies():
    movie_name = request.args.get('movie')
    if not movie_name:
        return jsonify({"error": "Please provide a movie name"}), 400

    list_of_all_titles = movies_data['title'].tolist()
    find_close_match = difflib.get_close_matches(movie_name, list_of_all_titles)
    if not find_close_match:
        return jsonify({"error": "Movie not found"}), 404

    close_match = find_close_match[0]

    index_of_the_movie = movies_data[movies_data.title == close_match]['index'].values[0]

    similarity_score = list(enumerate(similarity[index_of_the_movie]))
    sorted_similar_movies = sorted(similarity_score, key=lambda x: x[1], reverse=True)

    recommendations = []
    for movie in sorted_similar_movies[:10]: 
        index = movie[0]
        title_from_index = movies_data[movies_data.index == index]['title'].values[0]
        print(title_from_index)
        details = get_movie_details(title_from_index)
        if details:
            if "error" in details and details["error"] == "ConnectionResetError":
                return jsonify({"error": "Search limit exceeded. Please wait a few moments and try again."}), 429
            recommendations.append(details)
        time.sleep(2)
    print(recommendations)

    return jsonify(recommendations)

@app.route('/', methods=['GET'])
def hello():
    return 'Health check'

@app.route('/trending', methods=['GET'])
def trending_movies():
    trending_url = f"https://api.themoviedb.org/3/trending/movie/week?api_key={TMDB_API_KEY}"
    try:
        response = requests.get(trending_url)
        response.raise_for_status()
        data = response.json()
        trending_movies = [
            {
                "title": movie.get('title'),
                "poster": f"https://image.tmdb.org/t/p/w500{movie.get('poster_path')}"
            }
            for movie in data['results']
        ]
        return jsonify(trending_movies)
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "Failed to fetch trending movies"}), 500

@app.route('/movie_details', methods=['GET'])
def movie_details():
    movie_title = request.args.get('movie_title')
    if not movie_title:
        return jsonify({"error": "Please provide a movie title"}), 400
    
    details = get_movie_details(movie_title)
    if details:
        if "error" in details and details["error"] == "ConnectionResetError":
            return jsonify({"error": "Search limit exceeded. Please wait a few moments and try again."}), 429
        return jsonify(details)
    else:
        return jsonify({"error": "Movie details not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
