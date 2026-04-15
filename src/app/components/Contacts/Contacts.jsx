'use client';
import { useState, useEffect, useRef } from 'react';
import {
    FiPhone, FiMapPin, FiInstagram, FiClock, FiMessageSquare,
    FiSend, FiStar, FiUser, FiCheckCircle, FiAlertCircle
} from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import { contacts } from '@/app/utils/data';
import './Contacts.css';

export default function Contacts() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: '',
        rating: 5
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [hoveredRating, setHoveredRating] = useState(0);
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const handlePhoneClick = () => {
        window.open(`tel:+${contacts.phone.replace(/[^\d]/g, '')}`);
    };

    const handleInstagramClick = () => {
        window.open(contacts.instagram, '_blank');
    };

    const handleMapClick = () => {
        window.open(`https://maps.google.com/?q=${encodeURIComponent(contacts.address)}`, '_blank');
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

    const socialLinks = [
        { icon: <FiInstagram />, url: contacts.instagram, label: "Instagram", color: "#E4405F" },
        { icon: <FaFacebook />, url: "https://facebook.com", label: "Facebook", color: "#1877F2" },
        { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter", color: "#1DA1F2" },
        { icon: <FaYoutube />, url: "https://youtube.com", label: "YouTube", color: "#FF0000" }
    ];

    return (
        <section id="contacts" className="contacts" ref={sectionRef}>
            <div className="container">
                <div className="contacts-header">
                    <span className="contacts-badge">Свяжитесь с нами</span>
                    <h2 className="contacts-title">
                        Мы всегда на связи
                        <span className="title-decoration"></span>
                    </h2>
                    <p className="contacts-subtitle">
                        Оставьте отзыв или задайте вопрос - мы ответим в ближайшее время
                    </p>
                </div>

                <div className="contacts-wrapper">
                    {/* Contact Info */}
                    <div className={`contact-info ${isVisible ? 'animate-left' : ''}`}>
                        <div className="info-card" onClick={handlePhoneClick}>
                            <div className="info-icon-wrapper">
                                <FiPhone className="info-icon" />
                            </div>
                            <div className="info-content">
                                <h3>Позвоните нам</h3>
                                <p>{contacts.phone}</p>
                                <span className="info-hint">Быстрая связь</span>
                            </div>
                        </div>

                        <div className="info-card" onClick={handleMapClick}>
                            <div className="info-icon-wrapper">
                                <FiMapPin className="info-icon" />
                            </div>
                            <div className="info-content">
                                <h3>Наш адрес</h3>
                                <p>{contacts.address}</p>
                                <span className="info-hint">Построить маршрут</span>
                            </div>
                        </div>

                        <div className="info-card" onClick={handleInstagramClick}>
                            <div className="info-icon-wrapper">
                                <FiInstagram className="info-icon" />
                            </div>
                            <div className="info-content">
                                <h3>Социальные сети</h3>
                                <p>@al_hayat_family_restaurant</p>
                                <span className="info-hint">Подписывайтесь</span>
                            </div>
                        </div>

                        <div className="info-card">
                            <div className="info-icon-wrapper">
                                <FiClock className="info-icon" />
                            </div>
                            <div className="info-content">
                                <h3>Режим работы</h3>
                                <p>{contacts.workHours}</p>
                                <span className="info-hint">Без выходных</span>
                            </div>
                        </div>

                        <div className="social-links">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    style={{ '--hover-color': social.color }}
                                >
                                    <span className="social-icon-wrapper">{social.icon}</span>
                                    <span>{social.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Review Form */}
                    <div className={`review-form ${isVisible ? 'animate-right' : ''}`}>
                        <div className="form-header">
                            <FiMessageSquare className="form-icon" />
                            <h3>Оставить отзыв</h3>
                            <p>Поделитесь впечатлениями о нашем ресторане</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>
                                    <FiUser className="input-icon" />
                                    Ваше имя
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
                                    Телефон
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
                                    Ваш отзыв
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Расскажите о вашем визите, качестве блюд и обслуживания..."
                                    rows="4"
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
                        <FiMapPin className="map-icon" />
                        <h3>Как нас найти</h3>
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
            </div>
        </section>
    );
}