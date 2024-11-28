import torch
from transformers import pipeline

class TextGenerationModel:
    def __init__(self, model_id: str):
        self.pipe = pipeline(
            "text-generation",
            model=model_id,
            torch_dtype=torch.bfloat16,
            device_map="auto",
        )
        
    def classify_attachment_style(self, lyrics: str, max_new_tokens: int = 256) -> str:
        system_message = "You are an assistant that classifies attachment styles based on song lyrics. The possible attachment styles are Secure, Anxious, Avoidant, and Disorganized. For each set of lyrics, determine the attachment style that best fits the lyrics. Give me the probabilities for each attachment style in JSON format."

        messages = [
            {"role": "system", "content": system_message},
            {"role": "user", "content": lyrics}
        ]
        
        outputs = self.pipe(messages, max_new_tokens=max_new_tokens)
        print(outputs)

        return outputs[0]["generated_text"][-1]
