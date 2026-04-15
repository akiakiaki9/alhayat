'use client';
import { useState, useEffect } from 'react';
import { FiX, FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiUser, FiPhone, FiMapPin, FiMessageSquare, FiSend } from 'react-icons/fi';
import './Cart.css';

export default function Cart({ isOpen, onClose, cartItems, updateQuantity, removeItem }) {
    const [total, setTotal] = useState(0);
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [orderData, setOrderData] = useState({
        name: '',
        phone: '',
        address: '',
        comment: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    useEffect(() => {
        const newTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotal(newTotal);
    }, [cartItems]);

    // Блокировка скролла при открытой корзине
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else if (!showCheckoutModal) {
            document.body.style.overflow = 'unset';
        }
        return () => {
            if (!showCheckoutModal) {
                document.body.style.overflow = 'unset';
            }
        };
    }, [isOpen, showCheckoutModal]);

    // Блокировка скролла при открытой модалке оформления
    useEffect(() => {
        if (showCheckoutModal) {
            document.body.style.overflow = 'hidden';
        } else if (!isOpen) {
            document.body.style.overflow = 'unset';
        }
        return () => {
            if (!showCheckoutModal && !isOpen) {
                document.body.style.overflow = 'unset';
            }
        };
    }, [showCheckoutModal, isOpen]);

    const handleClose = () => {
        document.body.style.overflow = 'unset';
        onClose();
    };

    const handleCheckoutClick = () => {
        setShowCheckoutModal(true);
    };

    const handleInputChange = (e) => {
        setOrderData({
            ...orderData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/api/send-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: orderData.name,
                    phone: orderData.phone,
                    address: orderData.address,
                    items: cartItems,
                    total: total,
                    comment: orderData.comment
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSubmitStatus('success');
                setTimeout(() => {
                    setShowCheckoutModal(false);
                    onClose();
                    setOrderData({ name: '', phone: '', address: '', comment: '' });
                    setSubmitStatus(null);
                }, 2000);
            } else {
                setSubmitStatus('error');
                setTimeout(() => setSubmitStatus(null), 3000);
            }
        } catch (error) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeCheckoutModal = () => {
        setShowCheckoutModal(false);
        if (!isOpen) {
            document.body.style.overflow = 'unset';
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="cart-overlay" onClick={handleClose}>
                <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="cart-header">
                        <h3>Ваша корзина</h3>
                        <button className="close-cart" onClick={handleClose}>
                            <FiX />
                        </button>
                    </div>

                    <div className="cart-items">
                        {cartItems.length === 0 ? (
                            <div className="empty-cart">
                                <FiShoppingBag />
                                <p>Корзина пуста</p>
                                <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Добавьте блюда из меню</p>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-info">
                                        <div className="cart-item-name">{item.name}</div>
                                        <div className="cart-item-price">{(item.price * item.quantity).toLocaleString()} сум</div>
                                    </div>
                                    <div className="cart-item-controls">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                            <FiMinus />
                                        </button>
                                        <span className="cart-item-quantity">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                            <FiPlus />
                                        </button>
                                        <button className="remove-item" onClick={() => removeItem(item.id)}>
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className="cart-footer">
                            <div className="cart-total">
                                <span>Итого:</span>
                                <span>{total.toLocaleString()} сум</span>
                            </div>
                            <div className="cart-buttons">
                                <button className="btn btn-gold" onClick={handleCheckoutClick}>
                                    <FiSend /> Оформить заказ
                                </button>
                                <button className="btn btn-outline" onClick={handleClose}>
                                    Продолжить
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Модалка оформления заказа */}
            {showCheckoutModal && (
                <div className="checkout-modal-overlay" onClick={closeCheckoutModal}>
                    <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="checkout-modal-close" onClick={closeCheckoutModal}>
                            <FiX />
                        </button>

                        <div className="checkout-modal-header">
                            <div className="checkout-icon">🛍️</div>
                            <h3>Оформление заказа</h3>
                            <p>Заполните форму для оформления заказа</p>
                        </div>

                        <form onSubmit={handleSubmitOrder}>
                            <div className="checkout-form-group">
                                <label>
                                    <FiUser className="checkout-input-icon" />
                                    Ваше имя *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={orderData.name}
                                    onChange={handleInputChange}
                                    placeholder="Как к вам обращаться?"
                                    required
                                />
                            </div>

                            <div className="checkout-form-group">
                                <label>
                                    <FiPhone className="checkout-input-icon" />
                                    Телефон *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={orderData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+998 (__) ___-__-__"
                                    required
                                />
                            </div>

                            <div className="checkout-form-group">
                                <label>
                                    <FiMapPin className="checkout-input-icon" />
                                    Адрес доставки
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={orderData.address}
                                    onChange={handleInputChange}
                                    placeholder="Укажите адрес для доставки (или оставьте пустым для самовывоза)"
                                />
                            </div>

                            <div className="checkout-form-group">
                                <label>
                                    <FiMessageSquare className="checkout-input-icon" />
                                    Комментарий к заказу
                                </label>
                                <textarea
                                    name="comment"
                                    value={orderData.comment}
                                    onChange={handleInputChange}
                                    placeholder="Пожелания, особые требования..."
                                    rows="3"
                                />
                            </div>

                            <div className="checkout-order-summary">
                                <h4>Ваш заказ:</h4>
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="summary-item">
                                        <span>{item.name} x{item.quantity}</span>
                                        <span>{(item.price * item.quantity).toLocaleString()} сум</span>
                                    </div>
                                ))}
                                <div className="summary-total">
                                    <span>Итого к оплате:</span>
                                    <span>{total.toLocaleString()} сум</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="checkout-submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="checkout-spinner"></div>
                                        Отправка...
                                    </>
                                ) : (
                                    <>
                                        <FiSend /> Подтвердить заказ
                                    </>
                                )}
                            </button>

                            {submitStatus === 'success' && (
                                <div className="checkout-status success">
                                    ✅ Заказ успешно отправлен! Мы свяжемся с вами.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="checkout-status error">
                                    ❌ Ошибка отправки. Попробуйте позже.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}