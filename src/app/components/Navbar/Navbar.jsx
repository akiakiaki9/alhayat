'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiShoppingCart, FiMenu, FiX, FiPhone, FiInstagram } from 'react-icons/fi';
import './Navbar.css';

export default function Navbar({ cartCount, onCartOpen }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Блокировка скролла при открытом мобильном меню
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else if (!showBookingModal) {
            document.body.style.overflow = 'unset';
        }
        return () => {
            if (!showBookingModal && !mobileMenuOpen) {
                document.body.style.overflow = 'unset';
            }
        };
    }, [mobileMenuOpen, showBookingModal]);

    // Блокировка скролла при открытой модалке бронирования
    useEffect(() => {
        if (showBookingModal) {
            document.body.style.overflow = 'hidden';
        } else if (!mobileMenuOpen) {
            document.body.style.overflow = 'unset';
        }
        return () => {
            if (!showBookingModal && !mobileMenuOpen) {
                document.body.style.overflow = 'unset';
            }
        };
    }, [showBookingModal, mobileMenuOpen]);

    const handleBooking = () => {
        window.location.href = 'tel:+998919800038';
        setShowBookingModal(false);
    };

    const closeBookingModal = () => {
        setShowBookingModal(false);
        document.body.style.overflow = 'unset';
    };

    const isActive = (path) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname?.startsWith(path)) return true;
        return false;
    };

    return (
        <>
            <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
                <div className="navbar-container">
                    <Link href="/" className="logo">
                        <div className="logo-wrapper">
                            <img src="/images/logo.png" alt="AL-HAYAT" className="logo-img" />
                            <div className="logo-glow"></div>
                        </div>
                        <span className="logo-text">AL-HAYAT</span>
                    </Link>

                    <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                        <li>
                            <Link href="/" className={isActive('/') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
                                Главная
                            </Link>
                        </li>
                        <li>
                            <Link href="/menu" className={isActive('/menu') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
                                Меню
                            </Link>
                        </li>
                        <li>
                            <Link href="/contacts" className={isActive('/contacts') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
                                Контакты
                            </Link>
                        </li>
                    </ul>

                    <div className="nav-actions">
                        <a href="tel:+998919800038" className="nav-phone">
                            <FiPhone />
                            <span>+998 (91) 980-00-38</span>
                        </a>

                        <a href="https://www.instagram.com/al_hayat_family_restaurant" target="_blank" rel="noopener noreferrer" className="nav-instagram">
                            <FiInstagram />
                        </a>

                        <button className="booking-btn" onClick={() => setShowBookingModal(true)}>
                            Забронировать
                        </button>

                        <button className="cart-icon" onClick={onCartOpen}>
                            <FiShoppingCart />
                            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                        </button>

                        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Booking Modal */}
            {showBookingModal && (
                <div className="modal-overlay" onClick={closeBookingModal}>
                    <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeBookingModal}>
                            <FiX />
                        </button>
                        <div className="modal-icon">📞</div>
                        <h3>Забронировать столик</h3>
                        <p>Позвоните нам, чтобы забронировать столик в ресторане AL-HAYAT</p>
                        <button className="modal-call-btn" onClick={handleBooking}>
                            <FiPhone /> Позвонить сейчас
                        </button>
                        <p className="modal-phone">+998 (91) 980-00-38</p>
                    </div>
                </div>
            )}
        </>
    );
}