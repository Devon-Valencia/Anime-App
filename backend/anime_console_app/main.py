from fetchers.fetch_by_genre import fetch_by_genre
from fetchers.fetch_by_name import fetch_by_name
from utils.random_anime_generator import navigation_function
from fetchers.fetch_by_type import fetch_by_type
import sys


def main():
    print("Welcome to AniFilter\n")
    try:
        navigation_function()
    except SystemExit:
        sys.exit()
    print('\n1. Filter by name \n2. Filter by genre \n3. Filter by type')
    user_input = input('\nWhat filter would you like to use: ')

    if user_input == '1':
        anime_title = input('Enter a name: ').strip()
        fetch_by_name(anime_title)
    elif user_input == '2':
        anime_genre = input('Enter a genre: ').strip()
        fetch_by_genre(anime_genre)
    elif user_input == '3':
        anime_type = input('Enter a type: ').strip()
        fetch_by_type(anime_type)
    else:
        print("Error please provide a valid selection!")

if __name__ == '__main__':
    main()
