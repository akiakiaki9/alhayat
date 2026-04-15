export async function POST(request) {
    try {
        const { name, phone, address, items, total, comment } = await request.json();

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        // Формируем список блюд
        const itemsList = items.map(item =>
            `🍽️ ${item.name} x${item.quantity} = ${(item.price * item.quantity).toLocaleString()} сум`
        ).join('\n');

        const text = `🛍️ **НОВЫЙ ЗАКАЗ В AL-HAYAT!**\n\n` +
            `👤 **Имя:** ${name}\n` +
            `📞 **Телефон:** ${phone}\n` +
            `📍 **Адрес:** ${address || 'Самовывоз'}\n` +
            `📋 **Заказ:**\n${itemsList}\n\n` +
            `💰 **Итого:** ${total.toLocaleString()} сум\n` +
            `${comment ? `💬 **Комментарий:** ${comment}\n` : ''}` +
            `🕐 **Время заказа:** ${new Date().toLocaleString('ru-RU')}`;

        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'Markdown',
            }),
        });

        const data = await response.json();

        if (data.ok) {
            return Response.json({ success: true, message: 'Заказ отправлен!' });
        } else {
            return Response.json({ success: false, message: 'Ошибка отправки' }, { status: 500 });
        }
    } catch (error) {
        return Response.json({ success: false, message: error.message }, { status: 500 });
    }
}