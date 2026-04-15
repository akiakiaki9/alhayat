'use client';
import { FiHeart, FiMapPin, FiPhone, FiClock, FiMail, FiArrowUp, FiStar, FiMusic, FiUsers, FiCoffee } from 'react-icons/fi';
import { FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import './Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Колонка 1: Логотип и описание */}
                    <div className="footer-col">
                        <div className="footer-logo">
                            <div className="logo-wrapper">
                                <img src="/images/logo.png" alt="AL-HAYAT" className="logo-img-footer" />
                                <div className="logo-text">
                                    <h3>AL-HAYAT</h3>
                                    <span>Семейный ресторан</span>
                                </div>
                            </div>
                            <p className="footer-description">
                                Место, где традиционная узбекская кухня встречается
                                с восточным гостеприимством и семейным уютом.
                            </p>
                            <div className="social-links">
                                <a href="https://instagram.com/al_hayat_family_restaurant" target="_blank" rel="noopener noreferrer" className="social-link">
                                    <FaInstagram />
                                </a>
                                <a href="https://t.me/al_hayat_restaurant" target="_blank" rel="noopener noreferrer" className="social-link">
                                    <FaTelegram />
                                </a>
                                <a href="https://wa.me/998919800038" target="_blank" rel="noopener noreferrer" className="social-link">
                                    <FaWhatsapp />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Колонка 2: Быстрые ссылки */}
                    <div className="footer-col">
                        <h4 className="footer-title">Навигация</h4>
                        <ul className="footer-menu">
                            <li><a onClick={() => scrollToSection('home')}>Главная</a></li>
                            <li><a onClick={() => scrollToSection('menu')}>Меню</a></li>
                            <li><a onClick={() => scrollToSection('about')}>О нас</a></li>
                            <li><a href="/contacts">Контакты</a></li>
                        </ul>
                    </div>

                    {/* Колонка 3: Контакты */}
                    <div className="footer-col">
                        <h4 className="footer-title">Контакты</h4>
                        <ul className="footer-contact-list">
                            <li>
                                <FiMapPin className="contact-icon" />
                                <span>Боги Амир 28, Северный, Голубой Экран, Бухара</span>
                            </li>
                            <li>
                                <FiPhone className="contact-icon" />
                                <a href="tel:+998919800038">+998 (91) 980-00-38</a>
                            </li>
                            <li>
                                <FiMail className="contact-icon" />
                                <a href="mailto:info@alhayat.uz">info@alhayat.uz</a>
                            </li>
                            <li>
                                <FiClock className="contact-icon" />
                                <span>Ежедневно: 10:00 - 23:00</span>
                            </li>
                        </ul>
                    </div>

                    {/* Колонка 4: Особенности */}
                    <div className="footer-col">
                        <h4 className="footer-title">Особенности</h4>
                        <div className="features-list">
                            <div className="feature-item">
                                <FiStar className="feature-icon" />
                                <span>100% Халяль</span>
                            </div>
                            <div className="feature-item">
                                <FiMusic className="feature-icon" />
                                <span>Живая музыка</span>
                            </div>
                            <div className="feature-item">
                                <FiUsers className="feature-icon" />
                                <span>Семейная атмосфера</span>
                            </div>
                            <div className="feature-item">
                                <FiCoffee className="feature-icon" />
                                <span>Уютный интерьер</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copyright">
                        <p>
                            Разработано с <FiHeart className="heart-icon" /> by{' '}
                            <a href="https://akbarsoft.uz" target="_blank" rel="noopener noreferrer">
                                Akbar Soft
                            </a>
                        </p>
                        <p className="copyright-text">© {currentYear} AL-HAYAT. Все права защищены.</p>
                    </div>
                    <div className="footer-payment">
                        <span>Принимаем к оплате:</span>
                        <div className="payment-icons">
                            <span className="payment-icon">Visa</span>
                            <span className="payment-icon">MasterCard</span>
                            <span className="payment-icon">UzCard</span>
                            <span className="payment-icon">Click</span>
                            <span className="payment-icon">Payme</span>
                        </div>
                    </div>
                </div>
            </div>

            {showScrollTop && (
                <button className="scroll-top" onClick={scrollToTop}>
                    <FiArrowUp />
                </button>
            )}
        </footer>
    );
}