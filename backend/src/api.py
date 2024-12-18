
from models import Song
from bs4 import BeautifulSoup
import urllib.parse
import requests
import logging
logger = logging.getLogger('uvicorn.error')

class API_Client():
    
    def __init__(self, token: str):
        self.API_ENDPOINT = "https://api.genius.com"
        self.TOKEN = token
        if not self.TOKEN:
            raise Exception("No token specified. Change .env/.env.local")


    def search(self,query: str) -> list[Song]:
        url = f"{self.API_ENDPOINT}/search?{urllib.parse.urlencode({"q": query})}"
        headers = {
        "Authorization": f"Bearer {self.TOKEN}",
        "Accept": "application/json"
        }
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            try:
                data = response.json()
                songs_data = data.get("response", {}).get("hits", [])

                songs = [
                    Song(
                        id=song["result"]["id"],
                        title=song["result"]["title"],
                        artist=song["result"]["primary_artist"]["name"]
                    )
                    for song in songs_data
                ]

                return songs
            except ValueError:
                raise ValueError("Response is not valid JSON:", response.text)
        elif response.status_code == 404:
            try:
                data = response.json()
                if "meta" in data:
                    print(f"Error {data['meta']['status']}: {data['meta']['message']}")
                else:
                    raise Exception("Error 404: Resource not found")
            except ValueError:
                raise ValueError("Error 404: Resource not found (Non-JSON Response)", response.text)
        else:
            logging.error(f"Request failed with status code {response.status_code}")
            try:
                raise Exception("Response:", response.json())
            except ValueError:
                raise ValueError("Response (Non-JSON):", response.text)



    def get_lyrics(self, song_id: int) -> str:
        url = f"{self.API_ENDPOINT}/songs/{song_id}"
        headers = {
        "Authorization": f"Bearer {self.TOKEN}",
        "Accept": "application/json"
        }
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            try:
                data = response.json()
                song_url = data.get("response", {}).get("song", {}).get("url", "")
                print(song_url)
                return self.scrape_lyrics(song_url)
            except ValueError:
                raise ValueError("Response is not valid JSON:", response.text)
        elif response.status_code == 404:
            try:
                data = response.json()
                if "meta" in data:
                    print(f"Error {data['meta']['status']}: {data['meta']['message']}")
                else:
                    raise Exception("Error 404: Resource not found")
            except ValueError:
                raise ValueError("Error 404: Resource not found (Non-JSON Response)", response.text)
        else:
            logging.error(f"Request failed with status code {response.status_code}")
            try:
                raise Exception("Response:", response.json())
            except ValueError:
                raise ValueError("Response (Non-JSON):", response.text)
            
    def scrape_lyrics(self, song_url) -> str:
        song_page = requests.get(song_url)

        soup = BeautifulSoup(song_page.text, "html.parser")

        # Extract lyrics
        lyrics_div = soup.find("div", class_="lyrics")  # Older Genius pages
        if not lyrics_div:
        # Newer Genius pages use `data-lyrics-container`
            lyrics_div = soup.find_all("div", attrs={"data-lyrics-container": "true"})

        lyrics = "\n".join([line.get_text() for line in lyrics_div])
        return lyrics