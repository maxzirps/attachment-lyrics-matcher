import os

import api
from env import load_env
from model import AttachmentStyleProbabilities, TextGenerationModel
import csv
import json
from fuzzywuzzy import fuzz
from tqdm import tqdm
import numpy as np

load_env()


if __name__ == "__main__":
    global api_client
    token = os.getenv("TOKEN")
    api_client = api.API_Client(token)
    
    with open("./data/test_output.json", "r") as json_file:
        predictions = json.load(json_file)
        
    if predictions:
        correct = np.sum([song["predicted"] == song["attachment_style"] for song in predictions])
        print(f"Accuracy: {correct/len(predictions)}")
        
    else:

        with open("./data/train.json", "r") as json_file:
            songs = json.load(json_file)
        
        model = TextGenerationModel()
        
        for song in tqdm(songs, desc="Processing songs"):
            lyrics = api_client.get_lyrics(song["id"])
            attachment_style = model.classify_attachment_style(lyrics)
            if attachment_style:
                song["predicted"] = max(attachment_style, key=attachment_style.get)
            else:
                song["predicted"] = "unknown"
        
        with open("./data/test_output.json", "w") as json_file:
            json.dump(songs, json_file, indent=4)