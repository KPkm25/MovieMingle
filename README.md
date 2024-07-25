
# MovieMingle

MovieMingle is a single-page application (SPA) designed to provide users with trending movies and personalized movie recommendations. Users can search for a movie, and the application will suggest similar movies along with detailed information about each movie.

## Recommendation Engine
The recommendation engine in this project is designed to provide movie recommendations based on a given movie title. It leverages cosine similarity and a movie database sourced from Kaggle to suggest movies that are similar to the user's input. 




### TMDB API
The MovieMingle application relies on the TMDB API to fetch movie details. The Movie Database (TMDb) is a popular, user editable database for movies and TV shows, focussing on building high quality data that's easy to edit and consume.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
```
TMDB_API_KEY= your_tmdb_api_key
```


## Features

- Trending Movies: Display a list of trending movies.
- Movie Recommendations: Provide movie recommendations based on a search query.
- Movie Details: Show detailed information about a selected movie, including its cast, synopsis, genre, and more.
- Rate Limit Handling: Gracefully handle API rate limit issues by informing users to wait and try again.


## Installation

Clone the project

```bash
  git clone https://github.com/KPkm25/MovieMingle
```

Go to the project directory

```bash
  cd movie-mingle
```

### Backend setup
Navigate to the backend directory
```
cd moviemingle-flask
```
Create a virtual environment:
```
python -m venv venv
venv\Scripts\activate
```
Install the required dependencies:
```
pip install -r requirements.txt
```
Create a .env file in the root directory and add your TMDB API key:
```
TMDB_API_KEY=your_tmdb_api_key
```

### Frontend setup
Navigate to the frontend directory:
```
cd moviemingle
```
Install the required dependencies:
```
npm install
```

## Run Locally
### Backend
Navigate to the backend directory
```
cd moviemingle-flask
```
Ensure the virtual environment is activated

Start the Flask server:
```
python app.py
```
The backend server will start on:
```
 http://localhost:5000.
 ```
### Frontend
Navigate to the frontend directory:
```
cd moviemingle
```
Start the React development server:
```
npm start
```
The frontend will be available at:
```
http://localhost:3000
```

## Screenshots

![App Screenshot](https://github.com/KPkm25/MovieMingle/blob/main/mm1.png?raw="true")

![App Screenshot](https://github.com/KPkm25/MovieMingle/blob/main/mm2.png?raw="true")

![App Screenshot](https://github.com/KPkm25/MovieMingle/blob/main/mm3.png?raw="true")

![App Screenshot](https://github.com/KPkm25/MovieMingle/blob/main/mm4.png?raw="true")

