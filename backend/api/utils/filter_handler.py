import requests

# 📌 Filter Handler (Used for dynamic filtering in API calls)
base_url = 'https://api.jikan.moe/v4/anime'

def apply_filters(title=None, genre=None, anime_type=None, episodes=None, page=1):
    """
    Applies multiple filters to fetch anime dynamically.
    """
    params = {}
    if title:
        params['q'] = title
    if genre:
        params['genres'] = genre
    if anime_type:
        params['type'] = anime_type
    if episodes:
        params['episodes'] = episodes

    params['page'] = page
  
    
    response = requests.get(base_url, params=params)
    return response.json().get('data', []) if response.status_code == 200 else []



