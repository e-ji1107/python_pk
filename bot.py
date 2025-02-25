from telegram import Update
from telegram .ext import Application, CommandHandler, MessageHandler, filters, CallbackContext
TOKEN = ""
import talk_yej as tk

tk.TRIGGER_WORDS

#TRIGGER_WORDS = {
#    "안녕":"안녕하세요! 저는 바봇입니다!!",
#    "정보":"어떤 정보가 필요하세요??",
#    "기분":"저는 기분이 좋아요!",
#    "바보":"네 바봇입니다 💪🏿₍ ᐢ. ̫ .ᐢ ₎💪🏿",
#    "바보야":"ₒ₍₊˒₃˓₎ₒ▁▂▃▅▆▓▒░✩⃛",
#    "공격":"ก็็็็็็็็็็็็็ʕ•͡ᴥ•ʔ ก้้้้้้้้้้้",
#    "신나":"♬ ⋒( ˙◡˙)⋑ ♫ ⋐( • ω • )⋑ ♫ ⋐( ˊᵕˋ )⋒",
#    "바봇":"ヾ(´•👅•｀)ノ",
#    "야옹":"^ↀᴥↀ^"
#}

async def start(update, context):
    await update.message.reply_text("안녕하세요! 저는 바봇입니다. 무엇을 도와드릴까요?")
    
async def monitor_chat(update, context):
    user_text = update.message.text # 감지된 메시지들
    chat_id = update.message.chat_id # 메시지가 온 채팅방

    for key, res in tk.items():
        if key in user_text:
            await context.bot.send_message(chat_id = chat_id, text=res)
            break # 한개의 키워드에만 적용
    
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