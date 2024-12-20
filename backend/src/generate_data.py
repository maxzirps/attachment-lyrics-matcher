import os

import api
from env import load_env
from model import AttachmentStyleProbabilities, TextGenerationModel
import csv
import json
from fuzzywuzzy import fuzz
from tqdm import tqdm

load_env()


def load_existing_data(path_to_data: str) -> list:
    """
    Load existing data from a CSV file. The CSV file should have the following columns:
    artist, title,attachment_style
    """
    data = []
    with open(path_to_data, mode='r', newline='') as file:
        reader = csv.DictReader(file)
        for row in reader:
            data.append({"artist":row['artist'], "title":row['title'],"attachment_style": row['attachment_style']})
    return data

def generate_data(song_query: str) -> list[AttachmentStyleProbabilities]:
    
    return []

if __name__ == "__main__":
    global api_client
    token = os.getenv("TOKEN")
    api_client = api.API_Client(token)
    data = load_existing_data("./data/train.csv")
    songs_with_ids = []
    
    for song in tqdm(data, desc="Processing songs"):
        search_results = api_client.search(f"{song['artist']} -  {song['title']}")
        if search_results:
            found_song = None
            best_match = None
            highest_score = 0
            for result in search_results:
                artist_score = fuzz.ratio(result.artist.lower(), song['artist'].lower())
                title_score = fuzz.ratio(result.title.lower(), song['title'].lower())
                score = artist_score + title_score
                if score > highest_score:
                    highest_score = score
                    best_match = result
            if best_match:
                found_song = best_match
            if not found_song:
                print(song)
                continue
            song_dict = {
                "id": found_song.id,
                "artist": found_song.artist,
                "title": found_song.title,
                "attachment_style": song['attachment_style'].lower(),
            }
            songs_with_ids.append(song_dict)

    with open("./data/songs_with_ids.json", "w") as json_file:
        json.dump(songs_with_ids, json_file, indent=4)
    
    
    #model = TextGenerationModel()
    song_queries = []
    #output = [generate_data(song_query) for song_query in song_queries]
    #output += load_existing_data("../data/train.csv")