from utils.filter_handler import apply_filters

base_url = 'https://api.jikan.moe/v4'

def display_type_data(page=1, limit=20, title=None, genre=None, anime_type=None, episodes=None ):
    if not type:
        return []
    
    data = apply_filters(title=title, genre=genre, anime_type=anime_type, episodes=episodes, page=page)
    return data