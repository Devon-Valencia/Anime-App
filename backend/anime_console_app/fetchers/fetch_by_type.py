import requests
import sys

base_url = 'https://api.jikan.moe/v4'

def get_type_results(anime_type, page=1):
    url = f"{base_url}/anime"
    params = {'type': anime_type, 'page': page}
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        return data.get('data', []), data.get('pagination', {})
    else:
        print(f"Error fetching data: HTTP {response.status_code}")
        return None, None

def display_anime_type(data, page):
    if data:
        data = sorted(data, key=lambda x: x.get('score', 0), reverse=True)
        print(f"\nPage {page}: Found {len(data)} anime results:\n")
        for anime in data:
            print(f"Title: {anime.get('title', 'Unknown')}")
            print(f"   Type: {anime.get('type', 'N/A')}")
            print(f"   Score: {anime.get('score', 'N/A')}")
            print(f"   Genres: {', '.join([genre['name'] for genre in anime.get('genres', [])])}")
            print(f"   Link: {anime.get('url', 'No URL available')}")
            print("-" * 50)
        

def fetch_by_type(anime_type):
    page = 1
    while True:
        anime_list, pagination = get_type_results(anime_type, page)
        if not anime_list:
            print("No results found.")
            break

        display_anime_type(anime_list, page)

        if pagination.get('has_next_page', False) or page > 1:
            user_input = input("1. Next, 2. Previous, 3. Return 4. Quit\n").strip().lower()
            if user_input == '1' and pagination.get('has_next_page', False):
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
                    fetch_by_type(anime_type)
            else:
                print('No more pages.')
                user_input = input('1. Previous 2. Quit.\n')
                if user_input == '1':
                    fetch_by_type(anime_type)
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