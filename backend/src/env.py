from dotenv import load_dotenv

def load_env():
    load_dotenv(dotenv_path=".env")
    load_dotenv(dotenv_path=".env.local", override=True)