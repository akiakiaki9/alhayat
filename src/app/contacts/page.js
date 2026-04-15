'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar/Navbar';
import Cart from '../components/Cart/Cart';
import Footer from '../components/Footer/Footer';
import { contacts } from '@/app/utils/data';
import {
    FiPhone, FiMapPin, FiInstagram, FiClock, FiMail, FiMessageSquare,
    FiSend, FiStar, FiUser, FiChevronRight, FiCheckCircle, FiAlertCircle,
    FiFacebook, FiTwitter, FiYoutube, FiNavigation, FiPhoneCall
} from 'react-icons/fi';
import './Contacts.css';

export default function ContactsPage() {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
        rating: 5
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [hoveredRating, setHoveredRating] = useState(0);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity <= 0) {
            setCartItems(prev => prev.filter(item => item.id !== id));
        } else {
            setCartItems(prev => prev.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRatingClick = (rating) => {
        setFormData({
            ...formData,
            rating: rating
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/api/send-review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    message: '',
                    rating: 5
                });
                setTimeout(() => setSubmitStatus(null), 5000);
            } else {
                setSubmitStatus('error');
                setTimeout(() => setSubmitStatus(null), 5000);
            }
        } catch (error) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePhoneClick = () => {
        window.open(`tel:+${contacts.phone.replace(/[^\d]/g, '')}`);
    };

    const handleInstagramClick = () => {
        window.open(contacts.instagram, '_blank');
    };

    const handleMapClick = () => {
        window.open(`https://maps.google.com/?q=${encodeURIComponent(contacts.address)}`, '_blank');
    };

    const socialLinks = [
        { icon: <FiInstagram />, url: contacts.instagram, label: "Instagram", color: "#E4405F", followers: "1.2K" },
        { icon: <FiFacebook />, url: "https://facebook.com", label: "Facebook", color: "#1877F2", followers: "856" },
        { icon: <FiTwitter />, url: "https://twitter.com", label: "Twitter", color: "#1DA1F2", followers: "423" },
        { icon: <FiYoutube />, url: "https://youtube.com", label: "YouTube", color: "#FF0000", followers: "2.1K" }
    ];

    const workingHours = [
        { day: "Понедельник - Четверг", hours: "10:00 - 22:00" },
        { day: "Пятница - Суббота", hours: "10:00 - 23:00" },
        { day: "Воскресенье", hours: "10:00 - 22:00" }
    ];

    return (
        <>
            <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
            <Cart
                isOpen={cartOpen}
                onClose={() => setCartOpen(false)}
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                removeItem={removeFromCart}
            />

            {/* Hero Section */}
            <div className="contacts-hero">
                <div className="contacts-hero-overlay"></div>
                <div className="contacts-hero-content">
                    <div className="breadcrumb">
                        <Link href="/">Главная</Link>
                        <FiChevronRight />
                        <span>Контакты</span>
                    </div>
                    <h1 className="contacts-hero-title">Свяжитесь с нами</h1>
                    <p className="contacts-hero-subtitle">
                        Мы всегда рады ответить на ваши вопросы и помочь с бронированием
                    </p>
                </div>
            </div>

            {/* Contact Info Cards */}
            <div className="contact-cards-section">
                <div className="container">
                    <div className="contact-cards-grid">
                        <div className="contact-card" onClick={handlePhoneClick}>
                            <div className="card-icon">
                                <FiPhoneCall />
                            </div>
                            <h3>Позвоните нам</h3>
                            <p>{contacts.phone}</p>
                            <span className="card-hint">Быстрая связь</span>
                        </div>

                        <div className="contact-card" onClick={handleMapClick}>
                            <div className="card-icon">
                                <FiNavigation />
                            </div>
                            <h3>Наш адрес</h3>
                            <p>{contacts.address}</p>
                            <span className="card-hint">Построить маршрут</span>
                        </div>

                        <div className="contact-card" onClick={handleInstagramClick}>
                            <div className="card-icon">
                                <FiInstagram />
                            </div>
                            <h3>Instagram</h3>
                            <p>@al_hayat_family_restaurant</p>
                            <span className="card-hint">Подписывайтесь</span>
                        </div>

                        <div className="contact-card">
                            <div className="card-icon">
                                <FiMail />
                            </div>
                            <h3>Email</h3>
                            <p>{contacts.email}</p>
                            <span className="card-hint">Напишите нам</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="contacts-main">
                <div className="container">
                    <div className="contacts-wrapper">
                        {/* Contact Info */}
                        <div className="contact-info-panel">
                            <div className="info-header">
                                <h2>Контактная информация</h2>
                                <p>Свяжитесь с нами любым удобным способом</p>
                            </div>

                            <div className="info-details">
                                <div className="detail-item">
                                    <div className="detail-icon"><FiMapPin /></div>
                                    <div className="detail-content">
                                        <h4>Адрес</h4>
                                        <p>{contacts.address}</p>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <div className="detail-icon"><FiPhone /></div>
                                    <div className="detail-content">
                                        <h4>Телефон</h4>
                                        <p>{contacts.phone}</p>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <div className="detail-icon"><FiClock /></div>
                                    <div className="detail-content">
                                        <h4>Режим работы</h4>
                                        {workingHours.map((item, index) => (
                                            <p key={index}>{item.day}: {item.hours}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="social-media">
                                <h3>Мы в соцсетях</h3>
                                <div className="social-grid">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-item"
                                            style={{ '--hover-color': social.color }}
                                        >
                                            <div className="social-icon">{social.icon}</div>
                                            <div className="social-info">
                                                <span className="social-name">{social.label}</span>
                                                <span className="social-followers">{social.followers} подписчиков</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Review Form */}
                        <div className="review-panel">
                            <div className="form-header">
                                <h2>Оставить отзыв</h2>
                                <p>Поделитесь впечатлениями о нашем ресторане</p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>
                                            <FiUser className="input-icon" />
                                            Ваше имя *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Как к вам обращаться?"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            <FiPhone className="input-icon" />
                                            Телефон *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+998 (__) ___-__-__"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>
                                        <FiMail className="input-icon" />
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Оценка</label>
                                    <div className="rating-stars">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FiStar
                                                key={star}
                                                className={`star ${star <= (hoveredRating || formData.rating) ? 'active' : ''}`}
                                                onClick={() => handleRatingClick(star)}
                                                onMouseEnter={() => setHoveredRating(star)}
                                                onMouseLeave={() => setHoveredRating(0)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>
                                        <FiMessageSquare className="input-icon" />
                                        Ваш отзыв *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Расскажите о вашем визите, качестве блюд и обслуживания..."
                                        rows="5"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="spinner"></div>
                                            Отправка...
                                        </>
                                    ) : (
                                        <>
                                            <FiSend /> Отправить отзыв
                                        </>
                                    )}
                                </button>

                                {submitStatus === 'success' && (
                                    <div className="status-message success">
                                        <FiCheckCircle />
                                        Спасибо за отзыв! Мы ценим ваше мнение.
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="status-message error">
                                        <FiAlertCircle />
                                        Ошибка отправки. Попробуйте позже.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="map-section">
                        <div className="map-header">
                            <h3>Как нас найти</h3>
                            <p>Мы находимся в центре Бухары</p>
                        </div>
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3000.123456789!2d64.421789!3d39.774789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMznCsDQ2JzI5LjIiTiA2NMKwMjUnMTguNCJF!5e0!3m2!1sru!2s!4v1700000000000!5m2!1sru!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="AL-HAYAT location"
                            ></iframe>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="faq-section">
                        <div className="faq-header">
                            <h3>Часто задаваемые вопросы</h3>
                            <p>Ответы на популярные вопросы</p>
                        </div>
                        <div className="faq-grid">
                            <div className="faq-item">
                                <h4>Можно ли забронировать столик онлайн?</h4>
                                <p>Да, вы можете позвонить нам по телефону или оставить заявку в форме обратной связи.</p>
                            </div>
                            <div className="faq-item">
                                <h4>Есть ли у вас парковка?</h4>
                                <p>Да, для наших гостей предусмотрена бесплатная парковка.</p>
                            </div>
                            <div className="faq-item">
                                <h4>Работаете ли вы с доставкой?</h4>
                                <p>Да, мы осуществляем доставку по городу. Минимальная сумма заказа - 50 000 сум.</p>
                            </div>
                            <div className="faq-item">
                                <h4>Можно ли провести банкет?</h4>
                                <p>Да, у нас есть банкетный зал на 50 человек. Звоните для подробностей.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};