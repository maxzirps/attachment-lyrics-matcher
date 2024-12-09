import torch
import re
from transformers import pipeline
from typing import TypedDict

class AttachmentStyleProbabilities(TypedDict):
    secure: float
    anxious: float
    avoidant: float
    disorganized: float

class TextGenerationModel:
    def __init__(self, model_id: str):
        self.pipe = pipeline(
            "text-generation",
            model=model_id,
            torch_dtype=torch.bfloat16,
            device_map="auto",
            # TODO: make it more deterministic
            temperature=0.01
        )
        
    def classify_attachment_style(self, lyrics: str, max_new_tokens: int = 256) -> AttachmentStyleProbabilities:
        system_message = """
        You are an assistant that classifies attachment styles based on song lyrics.
        Analyze the following song lyrics and classify the attachment style it reflects. 
        Use the four main attachment styles: secure, anxious, avoidant, and disorganized. 
        Provide the confidence/probability for each style. The total of all probabilities should sum to 1.
        Do not include any commentary, explanations, or additional text. Return the probabilites as float.
        """

        messages = [
            {"role": "system", "content": system_message},
            {"role": "user", "content": lyrics}
        ]
        
        outputs = self.pipe(messages, max_new_tokens=max_new_tokens)
        answer = outputs[0]["generated_text"][-1]["content"]
        print(answer)
        matches = re.findall(r"(Secure|Anxious|Avoidant|Disorganized): (\d+\.\d+)", answer)


        attachment_probs: AttachmentStyleProbabilities = {
            match[0].lower(): float(match[1]) for match in matches
            }


        return attachment_probs
