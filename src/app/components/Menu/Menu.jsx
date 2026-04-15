'use client';
import { useState, useEffect, useRef } from 'react';
import { FiMinus, FiPlus, FiShoppingBag, FiCheck, FiTrendingUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { menuItems, categories } from '@/app/utils/data';
import './Menu.css';

export default function Menu({ addToCart }) {
    const [quantities, setQuantities] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [addedToCart, setAddedToCart] = useState({});
    const [animateCard, setAnimateCard] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
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

    // Сброс страницы при изменении фильтров
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchTerm]);

    const filteredItems = menuItems.filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Пагинация
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, endIndex);

    const updateQuantityLocal = (id, delta) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max(1, (prev[id] || 1) + delta)
        }));
    };

    const handleAddToCart = (item, quantity) => {
        for (let i = 0; i < quantity; i++) {
            addToCart(item);
        }

        setAddedToCart({ [item.id]: true });
        setAnimateCard(item.id);

        setTimeout(() => {
            setAddedToCart({});
            setAnimateCard(null);
        }, 1000);

        const newQuantities = { ...quantities };
        delete newQuantities[item.id];
        setQuantities(newQuantities);
    };

    const getCategoryIcon = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.icon : '🍽️';
    };

    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: sectionRef.current.offsetTop - 100, behavior: 'smooth' });
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <section id="menu" className="menu" ref={sectionRef}>
            <div className="container">
                <div className="menu-header">
                    <span className="menu-badge">Наше меню</span>
                    <h2 className="menu-title">
                        Изысканные блюда
                        <span className="title-gradient"> для настоящих гурманов</span>
                    </h2>
                    <p className="menu-subtitle">
                        Откройте для себя богатство узбекской кухни в исполнении наших шеф-поваров
                    </p>
                </div>

                <div className="menu-filters">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Поиск блюд..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="categories-wrapper">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                <span className="category-icon">{cat.icon}</span>
                                <span>{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {filteredItems.length === 0 ? (
                    <div className="no-results">
                        <FiShoppingBag className="no-results-icon" />
                        <h3>Ничего не найдено</h3>
                        <p>Попробуйте изменить параметры поиска</p>
                    </div>
                ) : (
                    <>
                        <div className="results-info">
                            <span>Найдено: {filteredItems.length} блюд</span>
                            <span>Страница {currentPage} из {totalPages}</span>
                        </div>

                        <div className="menu-grid">
                            {currentItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`menu-card ${isVisible ? 'animate' : ''} ${animateCard === item.id ? 'adding' : ''}`}
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    {item.popular && (
                                        <div className="popular-badge">
                                            <FiTrendingUp /> Хит продаж
                                        </div>
                                    )}

                                    <div className="menu-card-image">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/300x200?text=AL-HAYAT';
                                            }}
                                        />
                                        {item.isSet && (
                                            <div className="set-badge">
                                                <span>🎁 Сет</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="menu-card-content">
                                        <div className="card-header">
                                            <h3 className="menu-card-title">{item.name}</h3>
                                            <div className="category-tag">
                                                {getCategoryIcon(item.category)}
                                            </div>
                                        </div>

                                        <p className="menu-card-description">{item.description}</p>

                                        {item.isSet && item.includes && (
                                            <div className="includes-list">
                                                <span className="includes-title">Входит:</span>
                                                <div className="includes-items">
                                                    {item.includes.slice(0, 3).map((inc, idx) => (
                                                        <span key={idx} className="include-item">{inc}</span>
                                                    ))}
                                                    {item.includes.length > 3 && (
                                                        <span className="include-more">+{item.includes.length - 3}</span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div className="menu-card-footer">
                                            <div className="price-wrapper">
                                                <span className="menu-card-price">{item.price.toLocaleString()} сум</span>
                                                {item.popular && (
                                                    <span className="price-badge">Популярное</span>
                                                )}
                                            </div>

                                            {quantities[item.id] ? (
                                                <div className="quantity-controls">
                                                    <button
                                                        onClick={() => updateQuantityLocal(item.id, -1)}
                                                        className="qty-btn"
                                                    >
                                                        <FiMinus />
                                                    </button>
                                                    <span className="quantity">{quantities[item.id]}</span>
                                                    <button
                                                        onClick={() => updateQuantityLocal(item.id, 1)}
                                                        className="qty-btn"
                                                    >
                                                        <FiPlus />
                                                    </button>
                                                    <button
                                                        onClick={() => handleAddToCart(item, quantities[item.id])}
                                                        className="add-to-cart-btn"
                                                    >
                                                        <FiShoppingBag /> В корзину
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => updateQuantityLocal(item.id, 1)}
                                                    className="order-btn"
                                                >
                                                    В корзину
                                                </button>
                                            )}
                                        </div>

                                        {addedToCart[item.id] && (
                                            <div className="added-toast">
                                                <FiCheck /> Добавлено в корзину
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    className="pagination-btn"
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <FiChevronLeft />
                                </button>

                                {getPageNumbers().map((page, index) => (
                                    <button
                                        key={index}
                                        className={`pagination-btn ${page === currentPage ? 'active' : ''} ${page === '...' ? 'dots' : ''}`}
                                        onClick={() => page !== '...' && goToPage(page)}
                                        disabled={page === '...'}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    className="pagination-btn"
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    <FiChevronRight />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}