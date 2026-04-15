export async function POST(request) {
    try {
        const { name, message, rating } = await request.json();

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        const text = `📝 Новый отзыв в ресторане AL-HAYAT!\n\n👤 Имя: ${name}\n⭐ Оценка: ${rating}/5\n💬 Отзыв: ${message}\n\n📅 Дата: ${new Date().toLocaleString('ru-RU')}`;

        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'HTML',
            }),
        });

        const data = await response.json();

        if (data.ok) {
            return Response.json({ success: true, message: 'Отзыв отправлен!' });
        } else {
            return Response.json({ success: false, message: 'Ошибка отправки' }, { status: 500 });
        }
    } catch (error) {
        return Response.json({ success: false, message: error.message }, { status: 500 });
    }
}