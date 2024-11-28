from model import TextGenerationModel
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

#model = TextGenerationModel()

class SongLyrics(BaseModel):
    lyrics: str

@app.post("/classify_attachment_style/")
async def classify_attachment_style(song: SongLyrics):
    # attachment_style = model.classify_attachment_style(song.lyrics)
    attachment_style = "Avoidant"
    return {"attachment_style": attachment_style}