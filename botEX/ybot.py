from telegram import Update
from telegram .ext import Application, CommandHandler, MessageHandler, filters, CallbackContext

import talk_yej as tk
import gemini

from dotenv import load_dotenv
import os

load_dotenv()
TOKEN = os.getenv('TELEGRAM_TOKEN')
tk.TRIGGER_WORDS

async def start(update, context):
    await update.message.reply_text("안녕하세요! 저는 바봇입니다. 무엇을 도와드릴까요?")

async def send_photo(update,context):
    photo_url = "https://www.google.com/imgres?q=%EC%95%84%EC%9D%B4%EC%9C%A0&imgurl=https%3A%2F%2Fi.namu.wiki%2Fi%2FTYxKQDnuwFOcxdSaPR-L81SPQGf5aPEz13tINJ-Z508LKNtGmRmkZTKKEN82SrIZAYoLL8WSbXGzv2PiLgpRSg.webp&imgrefurl=https%3A%2F%2Fnamu.wiki%2Fw%2F%25EC%2595%2584%25EC%259D%25B4%25EC%259C%25A0%3Fuuid%3D1a89c6de-17a9-4ca2-8f95-ee6ad0e81a0e&docid=wLnnd4PNN2GSYM&tbnid=u4yiVq43HeGrDM&vet=12ahUKEwiB-6Kmjt6LAxWdjq8BHWEpAXQQM3oECBkQAA..i&w=1000&h=1333&hcb=2&itg=1&ved=2ahUKEwiB-6Kmjt6LAxWdjq8BHWEpAXQQM3oECBkQAA"
    await update.message.reply_photo(photo=photo_url,caption="이미지를 불러왔습니다")
    
async def monitor_chat(update, context):
    user_text = update.message.text # 감지된 메시지들
    chat_id = update.message.chat_id # 메시지가 온 채팅방

    if "gpt" in user_text:
        res = gemini.aiai(user_text.replace("gpt",""))
        await context.bot.send_message(chat_id = chat_id, text=res)
    elif "영화정보" in user_text: pass
        #await 영화정보크롤링() 함수 실행
    elif "사진줘" in user_text:
        await send_photo(update, context)
    else:
        for key, res in tk.TRIGGER_WORDS.items():
            if key in user_text:
                await context.bot.send_message(chat_id = chat_id, text=res)
                break
    
    
def main():
    app = Application.builder().token(TOKEN).build()

    # 명령어 핸들러 추가
    app.add_handler(CommandHandler("start",start))

    # 응답 핸들러 추가
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, monitor_chat))

    print("텔레그램 봇이 실행중입니다 모니터링 중...")
    app.run_polling()


if __name__ == "__main__":
    main()

