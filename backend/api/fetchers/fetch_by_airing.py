from utils.filter_handler import apply_filters
import requests

def display_airing_results(page=1, limit=20, title=None, genre=None, anime_type=None, episodes=None):
    url = f"https://api.jikan.moe/v4/seasons/now?page={page}&limit={limit}"

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        # Clean/format the data as needed
        anime_list = []
        for anime in data.get("data", []):
            anime_list.append({
                "mal_id": anime.get("mal_id"),
                "title": anime.get("title"),
                "image_url": anime.get("images", {}).get("jpg", {}).get("image_url"),
                "score": anime.get("score"),
                "type": anime.get("type")
            })

        return anime_list

    except requests.exceptions.RequestException as e:
        print("Error fetching currently airing anime:", e)
        return []
