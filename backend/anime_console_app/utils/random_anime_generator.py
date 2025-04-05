import requests
import sys

base_url = 'https://api.jikan.moe/v4'

def fetch_random_anime_page(page=1, limit=20):
    url = f"{base_url}/anime?page={page}&limit={limit}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None
    
def display_anime_on_page(page=1, limit=20):
    data = fetch_random_anime_page(page)
    if data and 'data' in data:
        print(f"Page {page} - Showing {limit} anime:")
        for anime in data['data']:
            print(f"{anime['mal_id']}: {anime['title']}")
        print("\n1. Filter, 2. Next page, 3. Previous page, 4. quit.")
    else:
        print("Failed to fetch data.")

def navigation_function():    
        page = 1
        limit = 20
        while True:
            display_anime_on_page(page)
            command = input("").strip().lower()
            if command == '1':
                break
            elif command == '2':
                page += 1
            elif command == '3' and page > 1:
                page -= 1
            elif command == '4':
                yes_or_no = input('Are you sure?\n')
                if yes_or_no == 'yes':
                   sys.exit() 
                else:
                    navigation_function()