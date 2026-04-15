'use client';
import { useState, useEffect, useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import './Features.css';

export default function Features() {
    const [activeIndex, setActiveIndex] = useState(null);
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

    const features = [
        {
            title: "Живая музыка",
            description: "Каждый вечер выступают лучшие музыканты Бухары, создавая неповторимую атмосферу восточного вечера",
            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop"
        },
        {
            title: "Уютная атмосфера",
            description: "Интерьер в восточном стиле с современными элементами, создающий особое настроение для каждого гостя",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop"
        },
        {
            title: "100% Халяль",
            description: "Все блюда приготовлены по стандартам халяль из свежих и качественных продуктов",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop"
        },
        {
            title: "Семейный отдых",
            description: "Идеальное место для семейных встреч, праздников и создания теплых воспоминаний",
            image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&fit=crop"
        },
        {
            title: "Шеф-повар",
            description: "Блюда от опытных шеф-поваров, сохраняющих традиционные рецепты узбекской кухни",
            image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=400&fit=crop"
        },
        {
            title: "Премиум качество",
            description: "Лучшие продукты, отборные рецепты и безупречное обслуживание",
            image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop"
        }
    ];

    return (
        <section className="features" ref={sectionRef}>
            <div className="container">
                <div className="features-header">
                    <span className="section-badge">Почему именно мы?</span>
                    <h2 className="section-title">
                        Преимущества
                        <span className="title-highlight"> AL-HAYAT</span>
                    </h2>
                    <p className="section-subtitle">
                        Мы создали ресторан, где каждый гость чувствует себя особенным
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`feature-card ${isVisible ? 'animate' : ''} ${activeIndex === index ? 'active' : ''}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            <div className="feature-image">
                                <img src={feature.image} alt={feature.title} loading="lazy" />
                            </div>

                            <div className="feature-content">
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                                <div className="feature-link">
                                    <span>Узнать больше</span>
                                    <FiArrowRight className="link-icon" />
                                </div>
                            </div>

                            <div className="feature-number">
                                <span>0{index + 1}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="features-stats">
                    <div className="stat-item">
                        <div className="stat-number">5000+</div>
                        <div className="stat-label">Довольных гостей</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">50+</div>
                        <div className="stat-label">Блюд в меню</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">7+</div>
                        <div className="stat-label">Лет опыта</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">100%</div>
                        <div className="stat-label">Халяль</div>
                    </div>
                </div>
            </div>
        </section>
    );
};