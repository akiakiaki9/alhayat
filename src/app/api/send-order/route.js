export async function POST(request) {
    try {
        const { name, phone, address, items, total, comment } = await request.json();
        
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const adminId = process.env.TELEGRAM_ADMIN_ID;
        
        if (!botToken || !adminId) {
            console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_ADMIN_ID');
            return Response.json({ 
                success: false, 
                message: 'Ошибка конфигурации сервера' 
            }, { status: 500 });
        }
        
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
                chat_id: adminId,
                text: text,
                parse_mode: 'Markdown',
            }),
        });
        
        const data = await response.json();
        
        if (data.ok) {
            return Response.json({ success: true, message: 'Заказ отправлен!' });
        } else {
            console.error('Telegram API error:', data);
            return Response.json({ 
                success: false, 
                message: data.description || 'Ошибка отправки в Telegram' 
            }, { status: 500 });
        }
    } catch (error) {
        console.error('Server error:', error);
        return Response.json({ 
            success: false, 
            message: error.message || 'Внутренняя ошибка сервера' 
        }, { status: 500 });
    }
}