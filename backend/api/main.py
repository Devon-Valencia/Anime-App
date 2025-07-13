from flask import Flask, jsonify, request
from flask_cors import CORS
from fetchers.fetch_by_genre import display_genre_results
from fetchers.fetch_by_name import display_name_results
from fetchers.fetch_by_type import display_type_data
from fetchers.random_anime_generator import display_anime_on_page
from fetchers.fetch_by_airing import display_airing_results

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():

    return jsonify({"message": "Welcome to the Anime API"}), 200

@app.route("/anime/random", methods=["GET"])
def get_random_anime():
    limit = 20  
    anime_data = display_anime_on_page(limit)  
    return jsonify(anime_data)


@app.route("/anime/search", methods=["GET"])
def search_anime():
    query = request.args.get("q", default="", type=str)  
    page = request.args.get("page", default=1, type=int)
    limit = request.args.get("limit", default=20, type=int)
    data = display_name_results(query, page, limit)  
    return jsonify({"page": page, "anime": data})

@app.route("/anime/genre", methods=["GET"])
def get_anime_by_genre():
    page = request.args.get("page", default=1, type=int)
    limit = request.args.get("limit", default=20, type=int)
    genre = request.args.get("genre", type=str)
    data = display_genre_results(page, limit, genre=genre)  
    return jsonify({"page": page, "anime": data})



@app.route("/anime/type", methods=["GET"])
def get_anime_by_type():
    page = request.args.get("page", default=1, type=int)
    limit = request.args.get("limit", default=20, type=int)
    data = display_type_data(page, limit)
    return jsonify({"page": page, "anime": data})

@app.route("/anime/airing", methods=["GET"])
def get_airing_anime():
    page = request.args.get("page", default=1, type=int)
    limit = request.args.get("limit", default=20, type=int)
    data = display_airing_results(page=page, limit=limit)
    return jsonify({"page": page, "anime": data})


if __name__ == "__main__":
    app.run(debug=True)