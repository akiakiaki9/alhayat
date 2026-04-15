'use client';
import { useState, useEffect, useRef } from 'react';
import { FiArrowRight, FiPhone, FiStar, FiUsers, FiMusic } from 'react-icons/fi';
import './Hero.css';

export default function Hero() {
    const [videoError, setVideoError] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        // Пытаемся загрузить видео
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log('Video autoplay failed:', error);
                setVideoError(true);
            });
        }
    }, []);

    const scrollToMenu = () => {
        const menuSection = document.getElementById('menu');
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCall = () => {
        window.open('tel:+998919800038');
    };

    return (
        <section id="home" className="hero">
            {/* Видео фон - только если нет ошибки */}
            {!videoError && (
                <video
                    ref={videoRef}
                    className="hero-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onError={() => setVideoError(true)}
                >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
            )}

            <div className="hero-overlay"></div>

            <div className="container hero-content">
                <div className="hero-badge">
                    <span className="badge-icon">✨</span>
                    <span>Семейный ресторан</span>
                </div>

                <h1 className="hero-title">
                    AL-HAYAT
                    <span className="title-accent">Семейный ресторан в Бухаре</span>
                </h1>

                <p className="hero-subtitle">
                    Добро пожаловать в AL-HAYAT — место, где традиционная узбекская кухня встречается с восточным гостеприимством.
                    Уютная атмосфера, живая музыка и только халяль продукты.
                </p>

                <div className="hero-features">
                    <div className="hero-feature">
                        <FiMusic className="feature-icon" />
                        <span>Живая музыка каждый вечер</span>
                    </div>
                    <div className="hero-feature">
                        <FiStar className="feature-icon" />
                        <span>100% Халяль</span>
                    </div>
                    <div className="hero-feature">
                        <FiUsers className="feature-icon" />
                        <span>Идеально для семей</span>
                    </div>
                </div>

                <div className="hero-buttons">
                    <button className="btn btn-gold" onClick={scrollToMenu}>
                        Посмотреть меню <FiArrowRight />
                    </button>
                    <button className="btn btn-outline" onClick={handleCall}>
                        <FiPhone /> Забронировать столик
                    </button>
                </div>

                <div className="hero-stats">
                    <div className="stat">
                        <span className="stat-number">7+</span>
                        <span className="stat-label">Лет на рынке</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat">
                        <span className="stat-number">50+</span>
                        <span className="stat-label">Блюд в меню</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat">
                        <span className="stat-number">5000+</span>
                        <span className="stat-label">Довольных гостей</span>
                    </div>
                </div>
            </div>

            <div className="hero-scroll-indicator">
                <span>Листайте вниз</span>
                <div className="scroll-mouse"></div>
            </div>
        </section>
    );
};