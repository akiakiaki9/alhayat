'use client';
import { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiMapPin, FiClock, FiUsers, FiAward, FiPlay, FiPause } from 'react-icons/fi';
import { aboutUs } from "@/app/utils/data";
import './About.css';

export default function About() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const interiorImages = [
        {
            url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop",
            title: "Уютный зал",
            description: "Атмосфера восточного гостеприимства"
        },
        {
            url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop",
            title: "Ресторанный зал",
            description: "Современный интерьер с восточными нотками"
        },
        {
            url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=500&fit=crop",
            title: "Банкетный зал",
            description: "Идеальное место для торжеств"
        },
        {
            url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=500&fit=crop",
            title: "Летняя терраса",
            description: "Уютная терраса на свежем воздухе"
        },
        {
            url: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&h=500&fit=crop",
            title: "VIP зал",
            description: "Отдельный зал для особых гостей"
        }
    ];

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

    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                nextSlide();
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [currentSlide, isAutoPlaying]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % interiorImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + interiorImages.length) % interiorImages.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const toggleAutoPlay = () => {
        setIsAutoPlaying(!isAutoPlaying);
    };

    const stats = [
        { icon: <FiUsers />, number: "5000+", label: "Довольных гостей" },
        { icon: <FiAward />, number: "7+", label: "Лет на рынке" },
        { icon: <FiClock />, number: "24/7", label: "Готовы к работе" },
        { icon: <FiMapPin />, number: "1", label: "Уникальная локация" }
    ];

    return (
        <section id="about" className="about" ref={sectionRef}>
            <div className="container">
                <div className="about-header">
                    <span className="about-badge">О нас</span>
                    <h2 className="about-title">
                        {aboutUs.title}
                        <span className="title-decoration"></span>
                    </h2>
                    <p className="about-subtitle">
                        Узнайте больше о нашем ресторане и философии
                    </p>
                </div>

                <div className="about-wrapper">
                    <div className={`about-text ${isVisible ? 'animate-left' : ''}`}>
                        <div className="text-content">
                            <p>{aboutUs.description1}</p>
                            <p>{aboutUs.description2}</p>
                            <div className="about-quote">
                                <span className="quote-icon">"</span>
                                <p className="about-highlight">{aboutUs.description3}</p>
                            </div>
                        </div>

                        <div className="about-stats">
                            {stats.map((stat, index) => (
                                <div key={index} className="stat-card">
                                    <div className="stat-icon">{stat.icon}</div>
                                    <div className="stat-number">{stat.number}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="about-features">
                            <div className="feature-item">
                                <div className="feature-dot"></div>
                                <span>Только свежие продукты</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-dot"></div>
                                <span>Авторские рецепты</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-dot"></div>
                                <span>Безупречный сервис</span>
                            </div>
                        </div>
                    </div>

                    <div className={`about-gallery ${isVisible ? 'animate-right' : ''}`}>
                        <div className="gallery-main">
                            <img
                                src={interiorImages[currentSlide].url}
                                alt={interiorImages[currentSlide].title}
                                className="gallery-image"
                            />
                            <div className="gallery-overlay">
                                <div className="gallery-caption">
                                    <h4>{interiorImages[currentSlide].title}</h4>
                                    <p>{interiorImages[currentSlide].description}</p>
                                </div>
                            </div>

                            <button className="gallery-nav prev" onClick={prevSlide}>
                                <FiChevronLeft />
                            </button>
                            <button className="gallery-nav next" onClick={nextSlide}>
                                <FiChevronRight />
                            </button>

                            <button className="gallery-autoplay" onClick={toggleAutoPlay}>
                                {isAutoPlaying ? <FiPause /> : <FiPlay />}
                            </button>
                        </div>

                        <div className="gallery-thumbnails">
                            {interiorImages.map((image, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail ${currentSlide === index ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                >
                                    <img src={image.url} alt={image.title} />
                                    <div className="thumbnail-overlay"></div>
                                </div>
                            ))}
                        </div>

                        <div className="gallery-dots">
                            {interiorImages.map((_, index) => (
                                <button
                                    key={index}
                                    className={`dot ${currentSlide === index ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="about-bottom">
                    <div className="working-hours">
                        <FiClock className="hours-icon" />
                        <div>
                            <strong>Режим работы:</strong> Ежедневно с 10:00 до 23:00
                        </div>
                    </div>
                    <div className="reservation-banner">
                        <span>Забронируйте столик прямо сейчас!</span>
                        <button className="reservation-btn" onClick={() => window.open('tel:+998919800038')}>
                            Позвонить
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};