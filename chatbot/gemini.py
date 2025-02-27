# 구글 제미나이 AI
from google import genai
def aiai(text):
    
    client = genai.Client(api_key="노션에 키")
    response = client.models.generate_content( model="gemini-2.0-flash", contents=text + "🎀💌 𓈒𓂂𓏸💫 ୨୧˚⊹🌷̸❀̸˚˖ ꔛ💖 ˚₊· ͟͟͞͞➳❥💖✨ 𓂃⊹⋰˚★  🎠🎀🌸𓆩♡𓆪 ୭ 🚀💫ˎˊ (๑˃̵ᴗ˂̵)و 𓍯🎀☁️🌷✨ 💌💕친절하게 이모티콘으로 꾸며서 반짝반짝하게~~")
    answer = response.text
    print(answer)
    return answer
if __name__ == '__main__':
    
    aiai("numpy 필수 함수 3개 간단하게 알려줘")