import requests
import sys

base_url = 'https://api.jikan.moe/v4'

def get_genre_id(anime_genre):
    url = f"{base_url}/genres/anime"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        if 'data' in data:
            for genre in data['data']:
                if genre.get('name', '').lower() == anime_genre.lower():
                    print(f"Genre '{anime_genre}' found with ID: {genre.get('mal_id')}")
                    return genre.get('mal_id') 
        print(f"Genre '{anime_genre}' not found.")
        return None 
    else:
        print(f"Error fetching genres: HTTP {response.status_code}")
        return None

def get_anime_by_genre(genre_id, page=1):
    if genre_id is None:
        return [], {}  

    url = f"{base_url}/anime"
    params = {'genres': genre_id, 'page': page}
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        return data.get('data', []), data.get('pagination', {})
    else:
        print(f"Error fetching anime: HTTP {response.status_code}")
        return [], {}

def display_genre_results(anime_list):
    if anime_list:
        anime_list = sorted(anime_list, key=lambda x: x.get('score', 0), reverse=True)
        print(f"\nFound {len(anime_list)} anime in this genre:\n")
        for anime in anime_list[:25]: 
            print(f"Title: {anime.get('title', 'Unknown')}")
            print(f"   Type: {anime.get('type', 'N/A')}")
            print(f"   Score: {anime.get('score', 'N/A')}")
            print(f"   Genres: {', '.join([genre['name'] for genre in anime.get('genres', [])])}")
            print(f"   Link: {anime.get('url', 'No URL available')}")
            print("-" * 50)
    else:
        print("No anime found in this genre.")
        userinput = input('1. Try again\n2. Quit\n')
        if userinput == '1':
           from utils import common
           common.return_home()
        else:
            userinput = input('1. Try again\n2. Quit\n')
        if userinput == '1':
           from utils import common
           common.return_home()
        else:
            sys.exit()

def fetch_by_genre(anime_genre):
    genre_id = get_genre_id(anime_genre) 
    if genre_id is None:
        print("Invalid genre name. Please try again.")
        return

    page = 1
    while True:
        anime_list, pagination = get_anime_by_genre(genre_id, page)
        if anime_list:
            display_genre_results(anime_list)

            if pagination.get('has_next_page', False):
                user_input = input("1. Next, 2. Previous, 3. Return 4. Quit\n").strip().lower()
                if user_input == '1':
                    page += 1
                elif user_input == '2' and page > 1:
                    page -= 1
                elif user_input == '3':
                    from utils import common
                    common.return_home()
                elif user_input == '4':
                    question_input = input('Are you sure?\n')
                    if question_input == 'yes':
                        sys.exit()
                    elif question_input == 'no':
                        fetch_by_genre(anime_genre)
                else:
                    if user_input == '2' and page == 1:
                        print("Error, you're at the first page.")
            else:
                print('No more pages.')
                user_input = input('1. Previous 2. Quit.\n')
                if user_input == '1':
                    fetch_by_genre(anime_genre)
                if user_input == '2':
                    input("Would you like to return?\n")
                if user_input == 'yes':
                    from utils import common
                    common.return_home()
                else:
                    print("Goodbye!")
                    break
        else:
            print("No results found.")
            break