import requests
import random

# Random Anime Fetcher (Used for Homepage Scrolling)
BASE_URL = 'https://api.jikan.moe/v4/anime'

# Lambda function to randomize page number
random_page = lambda min_page=1, max_page=10: random.randint(min_page, max_page)

def fetch_random_anime_page(page=1, limit=20):
    """
    Fetches a paginated list of anime for the homepage scrolling feature.
    """
    response = requests.get(f"{BASE_URL}?page={page}&limit={limit}")
    
    if response.status_code != 200:
        print(f"Error fetching data: {response.status_code}, {response.text}")
        return None
    
    data = response.json()
    
    if "data" in data:
        return data["data"]
    else:
        print(f"Invalid data format or empty list on page {page}.")
        return None

def display_anime_on_page(limit=20):

    page = random_page(1, 10)  # Call the lambda function to randomize the page between 1 and 10
    print(f"Fetching anime from page {page}...")
    
    anime_list = fetch_random_anime_page(page, limit)
    
    if anime_list:
        random.shuffle(anime_list)  # Shuffle the anime list to randomize the order
        return [
            {
                "id": anime["mal_id"],
                "title": anime["title"],
                "image_url": anime["images"]["jpg"]["image_url"],
                "synopsis": anime.get("synopsis", "No synopsis available."),
                "score": anime.get("score", "N/A"),
                "type": anime.get("type"),
                "episodes": anime.get("episodes"),
                "status": anime.get("status")
            } for anime in anime_list
        ]
    else:
        print("No anime data received.")
    return []

# Call to get random anime data (passing limit argument only)
def get_random_anime(limit=20):
    data = display_anime_on_page(limit)
    return data
