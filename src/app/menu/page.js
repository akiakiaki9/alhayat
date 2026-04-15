'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar/Navbar';
import Cart from '../components/Cart/Cart';
import Footer from '../components/Footer/Footer';
import { menuItems, categories } from '@/app/utils/data';
import { FiSearch, FiFilter, FiTrendingUp, FiChevronRight, FiShoppingBag, FiMinus, FiPlus } from 'react-icons/fi';
import './Menu.css';

export default function MenuPage() {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [quantities, setQuantities] = useState({});
    const [priceRange, setPriceRange] = useState([0, 500000]);
    const [showFilters, setShowFilters] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const [animatingCard, setAnimatingCard] = useState(null);

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

    const addToCart = (item) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });

        setAddedToCart({ [item.id]: true });
        setTimeout(() => setAddedToCart({}), 1000);
    };

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

    const updateQuantityLocal = (id, delta) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max(1, (prev[id] || 1) + delta)
        }));
    };

    const handleAddToCartLocal = (item, quantity) => {
        // Анимация карточки
        setAnimatingCard(item.id);
        setTimeout(() => setAnimatingCard(null), 500);

        for (let i = 0; i < quantity; i++) {
            addToCart(item);
        }
        const newQuantities = { ...quantities };
        delete newQuantities[item.id];
        setQuantities(newQuantities);
    };

    const filteredItems = menuItems.filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
        return matchesCategory && matchesSearch && matchesPrice;
    });

    const getCategoryIcon = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.icon : '🍽️';
    };

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
            <div className="menu-hero">
                <div className="menu-hero-overlay"></div>
                <div className="menu-hero-content">
                    <div className="breadcrumb">
                        <Link href="/">Главная</Link>
                        <FiChevronRight />
                        <span>Меню</span>
                    </div>
                    <h1 className="menu-hero-title">Наше меню</h1>
                    <p className="menu-hero-subtitle">
                        Откройте для себя богатство узбекской кухни в исполнении наших шеф-поваров
                    </p>
                    <div className="menu-hero-stats">
                        <div className="hero-stat">
                            <span className="stat-number">{menuItems.length}+</span>
                            <span className="stat-label">блюд</span>
                        </div>
                        <div className="hero-stat">
                            <span className="stat-number">7+</span>
                            <span className="stat-label">лет опыта</span>
                        </div>
                        <div className="hero-stat">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">халяль</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="menu-filters-section">
                <div className="container">
                    <div className="filters-header">
                        <div className="search-wrapper">
                            <FiSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Поиск блюд..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                        <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
                            <FiFilter /> Фильтры
                        </button>
                    </div>

                    <div className={`filters-panel ${showFilters ? 'show' : ''}`}>
                        <div className="filter-group">
                            <label>Цена (сум)</label>
                            <div className="price-inputs">
                                <input
                                    type="number"
                                    value={priceRange[0]}
                                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                    placeholder="От"
                                />
                                <span>-</span>
                                <input
                                    type="number"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                    placeholder="До"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="categories-tabs">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                <span className="tab-icon">{cat.icon}</span>
                                <span>{cat.name}</span>
                                {selectedCategory === cat.id && <div className="tab-glow"></div>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Menu Grid */}
            <div className="menu-grid-section">
                <div className="container">
                    {filteredItems.length === 0 ? (
                        <div className="no-results">
                            <FiSearch className="no-results-icon" />
                            <h3>Ничего не найдено</h3>
                            <p>Попробуйте изменить параметры поиска</p>
                        </div>
                    ) : (
                        <>
                            <div className="results-info">
                                <span>Найдено {filteredItems.length} блюд</span>
                            </div>
                            <div className="menu-items-grid">
                                {filteredItems.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className={`menu-item-card ${animatingCard === item.id ? 'adding-animation' : ''}`}
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        <div className="card-glow"></div>
                                        {item.popular && (
                                            <div className="popular-tag">
                                                <FiTrendingUp /> Хит продаж
                                            </div>
                                        )}
                                        <div className="card-image">
                                            <img src={item.image} alt={item.name} />
                                            <div className="image-overlay"></div>
                                            <div className="category-badge">
                                                {getCategoryIcon(item.category)}
                                            </div>
                                        </div>
                                        <div className="card-content">
                                            <div className="card-header">
                                                <h3 className="item-name">{item.name}</h3>
                                                <div className="item-price">{item.price.toLocaleString()} сум</div>
                                            </div>
                                            <p className="item-description">{item.description}</p>

                                            {item.isSet && item.includes && (
                                                <div className="includes-preview">
                                                    <span className="includes-label">🎁 Входит:</span>
                                                    <div className="includes-tags">
                                                        {item.includes.slice(0, 3).map((inc, idx) => (
                                                            <span key={idx} className="include-tag">{inc}</span>
                                                        ))}
                                                        {item.includes.length > 3 && (
                                                            <span className="include-more">+{item.includes.length - 3}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="card-actions">
                                                {quantities[item.id] ? (
                                                    <div className="quantity-selector">
                                                        <button onClick={() => updateQuantityLocal(item.id, -1)} className="qty-btn">
                                                            <FiMinus />
                                                        </button>
                                                        <span className="quantity">{quantities[item.id]}</span>
                                                        <button onClick={() => updateQuantityLocal(item.id, 1)} className="qty-btn">
                                                            <FiPlus />
                                                        </button>
                                                        <button
                                                            onClick={() => handleAddToCartLocal(item, quantities[item.id])}
                                                            className="add-btn"
                                                        >
                                                            <FiShoppingBag /> В корзину
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => updateQuantityLocal(item.id, 1)}
                                                        className="order-btn"
                                                    >
                                                        Заказать
                                                    </button>
                                                )}
                                            </div>

                                            {addedToCart[item.id] && (
                                                <div className="added-toast">
                                                    ✅ Добавлено в корзину!
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}