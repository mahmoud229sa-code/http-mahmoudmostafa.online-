// ============================================
// Shopping Cart Functionality
// ============================================

class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        this.loadCart();
        this.attachEventListeners();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.showNotification(`تم إضافة ${product.name} إلى السلة`);
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveCart();
    }

    updateQuantity(id, quantity) {
        const item = this.items.find(item => item.id === id);
        if (item && quantity > 0) {
            item.quantity = quantity;
            this.saveCart();
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            const price = parseInt(item.price) || 0;
            return total + (price * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartUI();
    }

    loadCart() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
    }

    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.getItemCount();
            cartCount.style.display = this.getItemCount() > 0 ? 'block' : 'none';
        }
    }

    attachEventListeners() {
        document.addEventListener('addToCart', (e) => {
            this.addItem(e.detail);
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: #10b981;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideUp 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    clearCart() {
        this.items = [];
        this.saveCart();
    }
}

// ============================================
// Analytics Tracking
// ============================================

class AnalyticsTracker {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.init();
    }

    generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    init() {
        this.trackPageView();
        this.trackUserEvents();
    }

    trackPageView() {
        const pageData = {
            url: window.location.href,
            title: document.title,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId
        };

        // Log to console (replace with actual analytics service)
        console.log('📊 Page View:', pageData);
    }

    trackUserEvents() {
        // Track button clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn')) {
                const buttonText = e.target.textContent;
                this.trackEvent('button_click', {
                    text: buttonText,
                    element: e.target.className
                });
            }
        });

        // Track form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'contactForm') {
                this.trackEvent('form_submit', {
                    form: 'contact_form'
                });
            }
        });

        // Track scroll depth
        let scrollPercentage = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = Math.round((scrollTop / docHeight) * 100);

            if (scrolled > scrollPercentage + 25) {
                scrollPercentage = scrolled;
                this.trackEvent('scroll_depth', {
                    percentage: scrollPercentage
                });
            }
        });
    }

    trackEvent(eventName, eventData = {}) {
        const event = {
            name: eventName,
            data: eventData,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId
        };

        // Log to console (replace with actual analytics service)
        console.log('📈 Event:', event);
    }
}

// ============================================
// Performance Monitoring
// ============================================

class PerformanceMonitor {
    static init() {
        if ('PerformanceObserver' in window) {
            // Monitor Core Web Vitals
            this.observeLCP();
            this.observeFID();
            this.observeCLS();
        }

        // Log page load time
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('⏱️ Page Load Time:', pageLoadTime + 'ms');
        });
    }

    static observeLCP() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('🎯 LCP:', entry.renderTime || entry.loadTime);
            }
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    static observeFID() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('⌨️ FID:', entry.processingDuration);
            }
        });
        observer.observe({ entryTypes: ['first-input'] });
    }

    static observeCLS() {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                clsValue += entry.value;
            }
            console.log('📐 CLS:', clsValue);
        });
        observer.observe({ entryTypes: ['layout-shift'] });
    }
}

// ============================================
// Lazy Loading Images
// ============================================

class LazyImageLoader {
    static init() {
        if ('IntersectionObserver' in window) {
            const images = document.querySelectorAll('img[data-src]');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => observer.observe(img));
        }
    }
}

// ============================================
// Initialize All Features
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize shopping cart
    const cart = new ShoppingCart();
    window.cart = cart;

    // Initialize analytics
    const analytics = new AnalyticsTracker();
    window.analytics = analytics;

    // Initialize performance monitoring
    PerformanceMonitor.init();

    // Initialize lazy loading
    LazyImageLoader.init();

    console.log('✓ جميع الميزات المتقدمة تم تحميلها بنجاح!');
});

// ============================================
// Export for module use
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ShoppingCart,
        AnalyticsTracker,
        PerformanceMonitor,
        LazyImageLoader
    };
}