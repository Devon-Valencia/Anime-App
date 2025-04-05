import requests
import sys
base_url = 'https://api.jikan.moe/v4'


def search_anime_title(title, page=1):
    
    url = f"{base_url}/anime"
    params = {'q': title, 'page': page}
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        if 'data' in data:
            anime_list = data['data']
            pagination = data.get('pagination', {})  
            return anime_list, pagination  

        else:
            print("Error 'data' key was not found in response. Full response", data)
            return []
    else:
        print(f"Error fetching data: HTTP {response.status_code}")


def display_anime_results(anime_list):
    if anime_list:
        anime_list = sorted(anime_list, key=lambda x: x['score'] if x.get('score') is not None else 0, reverse=True)
        print(f"\nFound {len(anime_list)} anime(s):\n")
        for idx, anime in enumerate(anime_list, 1):
            print(f"{idx}. {anime.get('title', 'Unknown Title')}")
            print(f"   Score: {anime.get('score', 'N/A')}")
            print(f"   Type: {anime.get('type', 'N/A')}")
            print(f"   Genres: {', '.join([genre['name'] for genre in anime.get('genres', [])])}")
            synopsis = anime.get('synopsis')
            if synopsis:
                print(f"   Synopsis: {synopsis[:150]}...")  
            else:
                print(f"   Synopsis: No synopsis available")
            print(f"   Link: {anime.get('url', 'No URL available')}")
            print("\n" + "-" * 50)
    else:
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


def fetch_by_name(title):
    page = 1
    while True:
        anime_list, pagination = search_anime_title(title, page)
        if anime_list:
            display_anime_results(anime_list)

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
                        fetch_by_name(title)
                else:
                    if user_input == '2' and page == 1:
                        print("Error, you're at the first page.")
                        
            else:
                print('No more pages.')
                user_input = input('1. Previous 2. Quit.\n')
                if user_input == '1':
                    fetch_by_name(title)
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