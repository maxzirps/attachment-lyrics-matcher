
from models import Song
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



    def get_lyrics(self, song_id: int) -> list[str]:
        
        
        return """
    Home in Your Arms
    I’ve walked through storms, I’ve braved the night,
    Searching for something to feel right.
    But every road kept leading me,
    To the place where you’re all I see.

    No need to question, no need to run,
    You’re my shelter, my morning sun.
    When the world feels cold and unsure,
    You’re the calm I’ve been fighting for.

    I’m safe, I’m whole, I’m free where you are,
    You’re my constant, my north star.
    No doubts, no fears, no need for alarms,
    Because I’m always home in your arms.

    Your voice is the song I hold deep inside,
    The melody that quiets the tide.
    Every heartbeat echoes your name,
    With you, love’s a steady flame.

    No cracks in the foundation we’ve built,
    Every touch erases guilt.
    You’re my anchor, my steady ground,
    In your love, I’m always found.

    I’m safe, I’m whole, I’m free where you are,
    You’re my constant, my north star.
    No doubts, no fears, no need for alarms,
    Because I’m always home in your arms.

    No storm could break what we’ve made strong,
    You’ve been my truth all along.
    Every moment, I choose you still,
    A love unshaken, an unbent will.

    I’m safe, I’m whole, I’m free where you are,
    You’re my constant, my north star.
    No doubts, no fears, no need for alarms,
    Because I’m always home in your arms.

    With you, I’ve found where I belong,
    My heart beats steady, our love’s the song.
    No matter where, near or far,
    I’ll always find home where you are.
    """