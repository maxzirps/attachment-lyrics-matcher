from typing import List, Optional
from src.api import get_lyrics
from src.model import TextGenerationModel
from fastapi import FastAPI, Query
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
import logging

logger = logging.getLogger('uvicorn.error')

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True, 
    allow_methods=["GET", "POST"], 
    allow_headers=["*"],
)

@app.on_event("startup")
async def init_model():
    global model
    load_dotenv(dotenv_path=".env")
    load_dotenv(dotenv_path=".env.local", override=True)
    model_id = os.getenv("MODEL_ID")
    logger.info(f"Using model {model_id}")
    model = TextGenerationModel(model_id)

class Song(BaseModel):
    id: int
    title: str
    artist: str
    
class LyricsRequest(BaseModel):
    lyrics: str

@app.post("/classify-by-lyrics")
async def classify_attachment_style(body: LyricsRequest):
    output = model.classify_attachment_style(body.lyrics)
    return output

class SongIDsRequest(BaseModel):
    song_ids: List[int]
    
@app.post("/classify-by-song-ids")
async def classify_attachment_style(body: SongIDsRequest):
    lyricsList = [get_lyrics(song_id) for song_id in body.song_ids]
    outputs = [model.classify_attachment_style(lyrics) for lyrics in lyricsList]
    return outputs

songs_db = [
    Song(id=0, title="Shape of You", artist="Ed Sheeran"),
    Song(id=1, title="Blinding Lights", artist="The Weeknd"),
    Song(id=2, title="Someone Like You", artist="Adele"),
    Song(id=3, title="Rolling in the Deep", artist="Adele"),
    Song(id=4, title="Perfect", artist="Ed Sheeran"),
    Song(id=5, title="Save Your Tears", artist="The Weeknd"),
]

@app.get("/search", response_model=List[Song])
async def search_songs(
    search_string: Optional[str] = Query(None, min_length=1, max_length=100)
) -> List[Song]:
    results = []
    for song in songs_db:
        if search_string and (
            search_string.lower() in song.title.lower() or search_string.lower() in song.artist.lower()
        ):
            results.append(song)

    return results