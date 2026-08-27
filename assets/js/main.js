// ============================================
// Navigation & Mobile Menu
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});

const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');

const siteSupabase = window.supabase && window.SUPABASE_CONFIG
    ? window.supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey)
    : null;

if (siteSupabase) {
    siteSupabase.from('visitors').insert({ page: window.location.pathname }).then(({ error }) => {
        if (error) console.warn('Visitor tracking unavailable:', error.message);
    });
}

const translations = {
    ar: {
        brandName: 'محمود مصطفى',
        brandSubtitle: 'مصمم فيديو احترافي',
        navHome: 'الرئيسية',
        navPortfolio: 'أعمالي',
        navShop: 'آراء العملاء',
        navAbout: 'من أنا',
        navContact: 'تواصل معي',
        themeButtonDark: 'وضع الظلام',
        themeButtonLight: 'الوضع الفاتح',
        langButtonEn: 'EN',
        langButtonAr: 'AR',
        heroTitle: 'سينيور مونتاج وفيديو يبحث عن أفكارك الرقمية',
        heroIntro: 'أمنح علامتك فيديوهات حديثة ومذهلة',
        heroDesc: 'أفضل تجربة بصرية لتقديم قصتك في كل منصة',
        heroAction1: 'شاهد أعمالي',
        heroAction2: 'شاهد آراء العملاء',
        aboutTitle: 'من أنا',
        aboutIntro: 'أنا محمود مصطفى، سينيور مونتير ومصمم فيديو بخبرة تمتد لأكثر من 6 سنوات في مجال صناعة المحتوى المرئي.',
        aboutDesc: 'أتعامل مع الفيديو من جميع جوانبه، بدايةً من ابتكار الأفكار وتطوير المحتوى، مرورًا بالتصميم والمعالجة البصرية، وصولًا إلى المونتاج والإخراج النهائي. أحرص دائمًا على تحويل كل فكرة إلى قصة بصرية قوية ومؤثرة، تجمع بين الإبداع والدقة وتواكب أحدث أساليب وتقنيات الإنتاج.',
        aboutDetail: 'أساعد الشركات وصنّاع المحتوى على تقديم فيديوهات احترافية ومتكاملة، من خلال أفكار مبتكرة، وتصميمات حديثة، ومونتاج جذاب، وتأثيرات بصرية تضيف قيمة حقيقية لكل عمل وتمنحه هوية مميزة.',
        aboutSkillsTitle: 'مهاراتي:',
        contactTitle: 'تواصل معي',
        contactDesc: 'لديك مشروع في الذهن؟ تواصل معي لمناقشة أفكارك'
    },
    en: {
        brandName: 'Mahmoud Mostafa',
        brandSubtitle: 'Professional Video Designer',
        navHome: 'Home',
        navPortfolio: 'Portfolio',
        navShop: 'Client Reviews',
        navAbout: 'About Me',
        navContact: 'Contact',
        themeButtonDark: 'Dark Mode',
        themeButtonLight: 'Light Mode',
        langButtonEn: 'EN',
        langButtonAr: 'عربي',
        heroTitle: 'Senior Video Editor for Modern Digital Stories',
        heroIntro: 'I deliver fresh, high-impact video content.',
        heroDesc: 'I craft visuals that make your story stand out across platforms.',
        heroAction1: 'View Work',
        heroAction2: 'Read Client Reviews',
        aboutTitle: 'About',
        aboutIntro: 'I’m Mahmoud Mostafa, a senior video editor and modern content creator. I have over 6 years of experience in video production and editing.',
        aboutDesc: 'I have broad experience across editing and design workflows, transforming ideas into strong visual stories that combine creativity and precision with modern production techniques.',
        aboutDetail: 'I help brands and content creators deliver professional work through engaging edits, modern visual design, and creative effects that give every video a distinct identity and lasting impact.',
        aboutSkillsTitle: 'Skills:',
        contactTitle: 'Contact Me',
        contactDesc: 'Have a project in mind? Reach out to discuss your ideas.'
    }
};

let currentLang = localStorage.getItem('siteLang') || 'ar';
let currentTheme = localStorage.getItem('siteTheme') || 'dark';

function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
}

function updateThemeButton(theme = currentTheme, lang = currentLang) {
    if (!themeToggle) return;

    const isDark = theme === 'dark';
    const iconClass = isDark ? 'fa-sun' : 'fa-moon';

    themeToggle.innerHTML = '<span class="theme-icon"><i class="fa-solid ' + iconClass + '"></i></span>';
    themeToggle.setAttribute('aria-label', isDark ? 'تبديل للوضع الفاتح' : 'تبديل للوضع الداكن');
}

function setTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    currentTheme = theme;
    localStorage.setItem('siteTheme', theme);
    updateThemeButton(theme, currentLang);
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('siteLang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    applyTranslations(lang);
    if (langToggle) langToggle.textContent = lang === 'ar' ? translations[lang].langButtonEn : translations[lang].langButtonAr;
    updateThemeButton(currentTheme, lang);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        setTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
    });
}

setLanguage(currentLang);
setTheme(currentTheme);

// ============================================
// Active Navigation Link
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Portfolio Filter
// ============================================

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Set initial animation for portfolio items
portfolioItems.forEach(item => {
    item.style.transition = 'all 0.3s ease';
    item.style.opacity = '1';
});

// ============================================
// Contact Form
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const data = {
            name: contactForm.querySelector('input[name="name"]').value,
            email: contactForm.querySelector('input[name="email"]').value,
            projectType: contactForm.querySelector('input[name="projectType"]').value,
            message: contactForm.querySelector('textarea[name="message"]').value
        };

        if (window.supabase && window.SUPABASE_CONFIG) {
            const supabaseClient = window.supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);
            const { error } = await supabaseClient.from('orders').insert({
                customer_name: data.name,
                customer_email: data.email,
                package_type: data.projectType,
                details: data.message,
                budget: null
            });
            if (error) console.warn('Order storage unavailable:', error.message);
        }

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideDown 0.3s ease;
        `;
        successMessage.textContent = 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً';
        document.body.appendChild(successMessage);

        // Reset form
        contactForm.reset();

        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);

        console.log('تم إرسال البيانات:', data);
    });
}

// ============================================
// Add to Cart Functionality
// ============================================

const addToCartButtons = document.querySelectorAll('.btn-small.btn-primary');

addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;

        // Show notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: #7c3aed;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(124, 58, 237, 0.3);
            z-index: 9999;
            animation: slideUp 0.3s ease;
        `;
        notification.innerHTML = `
            <div style="font-weight: 600;">${productName}</div>
            <div style="font-size: 0.9rem; margin-top: 5px;">تم إضافة المنتج للسلة - ${productPrice}</div>
        `;
        document.body.appendChild(notification);

        // Animate button
        button.style.background = '#10b981';
        button.textContent = '✓ تم الإضافة';

        setTimeout(() => {
            notification.remove();
        }, 4000);

        setTimeout(() => {
            button.style.background = '';
            button.textContent = 'أضف للسلة';
        }, 2000);
    });
});

// ============================================
// Smooth Scroll Enhancement
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Video Placeholder Click
// ============================================

const videoPlaceholder = document.querySelector('.video-placeholder');

if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
        alert('سيتم فتح عرض الفيديو الرئيسي هنا');
    });
}

// ============================================
// Video Gallery Modal

const videoModal = document.getElementById('videoModal');
const videoModalPlayer = videoModal ? videoModal.querySelector('.video-modal-player') : null;
const videoModalClose = videoModal ? videoModal.querySelector('.video-modal-close') : null;
const videoGrid = document.getElementById('videoGrid');
const horizontalVideoGrid = document.getElementById('horizontalVideoGrid');
let resumeVideoCarousel = null;
const horizontalVideoIds = ['BwQ85PPHxeI', 'LARe8gb1Lak', 'kBsRKXYkXA0'];
const fallbackShortIds = [
    'Pw4Pc8C-M-k', 'WqU39FOxGak', 'ODhjA9WY7Io', '2oRABHBkn5k', '08rblFzX5HM',
    'Qr6Y3vddc-A', 'fcZrYdc1n9U', '2I9X75vWSEU', 'A5tIQmsbJQw', 'cQTbjGAgij0',
    'fKEaSYW6jTU', 'XlCKMC9i8Ko', 'hQJdps8FgHI', '_RNFv9VvCJM', 'zljPGP__Txg',
    'hPdYPSq_lPA', 'gFs2K6rhnvU', '0OYQgPBaI1M', 'X3Noh1t4CPs', '5PP6kp2Ss-U',
    'X-2Pa80mdwM', 'ZmNIr8BD36M', 'Dppn6F4rHs0', '6CEghhL9xWs', 'e0N2Ikze_Kg',
    '8Ipn32SVNtE', 'UdXehpmu814', 'FOe3kK75HnE', '3orVFnsYAuM', 'NFD8dEDEXKE',
    'ne2slIhRm1k', 'O6WGgWwu7J0', 'vH5b3HcgINs', '2lIXY4zB7-U', 'dMvUD2IogiE',
    'C-RRw7Z_5p4', 'PWaAuHZ0euM', 'ho3EVJFEP3U', 'aBTy9uihRz0', '3AuwWtOeErc'
];

const renderVideoCards = (videoIds) => {
    const carouselIds = [...videoIds, ...videoIds];
    videoGrid.innerHTML = carouselIds.map((videoId) => {
        const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        return `
            <div class="video-card" data-video-id="${videoId}">
                <img class="video-preview" src="${thumbnail}" alt="فيديو قصير" loading="lazy">
                <div class="video-more-card">
                    <button class="video-more-btn" type="button" onclick="window.open('https://www.behance.net/midofox3', '_blank', 'noopener,noreferrer')">للمزيد اضغط هنا</button>
                </div>
            </div>
        `;
    }).join('');

    videoGrid.querySelectorAll('.video-card').forEach((card) => {
        let longPressTimer;

        card.addEventListener('pointerdown', () => {
            card.classList.add('is-pressed');
            longPressTimer = window.setTimeout(() => {
                card.classList.add('long-pressed');
            }, 550);
        });

        const cancelPress = () => {
            window.clearTimeout(longPressTimer);
            card.classList.remove('is-pressed', 'long-pressed');
        };

        card.addEventListener('pointerup', cancelPress);
        card.addEventListener('pointercancel', cancelPress);
        card.addEventListener('pointerleave', cancelPress);

        card.addEventListener('click', (event) => {
            if (event.target.closest('.video-more-btn') || !videoModal || !videoModalPlayer) return;
            pauseCarousel();
            const videoId = card.getAttribute('data-video-id');
            if (!videoId) return;

            if (window.location.protocol === 'file:') {
                window.open(`https://www.youtube.com/shorts/${videoId}`, '_blank', 'noopener,noreferrer');
                return;
            }

            videoModalPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;
            videoModal.classList.add('open', 'short');
            videoModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    });

    let isPaused = false;
    let lastTimestamp = 0;
    const speed = 36;

    const pauseCarousel = () => {
        isPaused = true;
    };

    const resumeCarousel = () => {
        if (!videoModal || !videoModal.classList.contains('open')) {
            isPaused = false;
        }
    };

    resumeVideoCarousel = resumeCarousel;

    const moveCarousel = (timestamp) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const elapsed = Math.min(timestamp - lastTimestamp, 64);
        lastTimestamp = timestamp;

        if (!isPaused) {
            const loopWidth = videoGrid.scrollWidth / 2;
            videoGrid.scrollLeft += (speed * elapsed) / 1000;
            if (loopWidth > 0 && videoGrid.scrollLeft >= loopWidth) {
                videoGrid.scrollLeft -= loopWidth;
            }
        }

        window.requestAnimationFrame(moveCarousel);
    };

    videoGrid.addEventListener('pointerdown', pauseCarousel);
    videoGrid.addEventListener('pointerup', (event) => {
        if (event.pointerType === 'touch') {
            resumeCarousel();
        }
    });
    videoGrid.addEventListener('pointercancel', resumeCarousel);
    videoGrid.addEventListener('mouseenter', pauseCarousel);
    videoGrid.addEventListener('mouseleave', resumeCarousel);
    window.requestAnimationFrame(moveCarousel);

};

const renderHorizontalVideos = () => {
    if (!horizontalVideoGrid) return;

    horizontalVideoGrid.innerHTML = horizontalVideoIds.map((videoId) => `
        <button class="horizontal-video-card" type="button" data-video-id="${videoId}" aria-label="تشغيل فيديو عرضي">
            <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" alt="فيديو عرضي" loading="lazy">
            <span class="horizontal-video-play" aria-hidden="true"><i class="fas fa-play"></i></span>
        </button>
    `).join('');

    horizontalVideoGrid.querySelectorAll('.horizontal-video-card').forEach((card) => {
        card.addEventListener('click', () => {
            const videoId = card.dataset.videoId;
            if (window.location.protocol === 'file:') {
                window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', 'noopener,noreferrer');
                return;
            }

            if (!videoModal || !videoModalPlayer) return;
            videoModalPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            videoModal.classList.add('open');
            videoModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    });
};

const buildVideoGallery = async () => {
    if (!videoGrid) {
        return;
    }

    try {
        const shortUrlPath = new URL(window.location.pathname.includes('/pages/') ? '../urlShort.txt' : 'urlShort.txt', window.location.href).href;
        const response = await fetch(shortUrlPath);

        console.log('Fetch response:', response);

        if (!response.ok) {
            console.error(response.status, response.statusText);
            throw new Error(`Failed to load urlShort.txt (${response.status})`);
        }

        const text = await response.text();
        console.log('Text file:', text);

        const urls = text
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean);

        console.log('Fetch response:', response);
        console.log('Text file length:', text.length);
        console.log('Raw URL lines:', urls);

        const extractUrlFromLine = (line) => {
            const markdownUrlMatch = line.match(/\((https?:\/\/[^\s)]+)\)/i);
            if (markdownUrlMatch) {
                return markdownUrlMatch[1];
            }

            const plainUrlMatch = line.match(/https?:\/\/[^\s|)]+/i);
            return plainUrlMatch ? plainUrlMatch[0] : null;
        };

        const extractVideoId = (url) => {
            if (!url) {
                return null;
            }

            const normalizedUrl = url.trim();

            const shortsMatch = normalizedUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtube\.googleapis\.com)\/shorts\/([A-Za-z0-9_-]{11})/i);
            if (shortsMatch) {
                return shortsMatch[1];
            }

            const youtuBeMatch = normalizedUrl.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([A-Za-z0-9_-]{11})/i);
            if (youtuBeMatch) {
                return youtuBeMatch[1];
            }

            const watchMatch = normalizedUrl.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?[^\s]*/i);
            if (watchMatch) {
                try {
                    return new URL(normalizedUrl).searchParams.get('v');
                } catch (error) {
                    return null;
                }
            }

            return null;
        };

        const videoIds = urls
            .filter((line) => /youtube\.com\/shorts\//i.test(line))
            .map((line, index) => {
                const url = extractUrlFromLine(line);
                const videoId = extractVideoId(url);

                if (!videoId) {
                    console.error(`Unable to parse YouTube ID on line ${index + 1}:`, line);
                }

                return videoId;
            })
            .filter(Boolean);

        console.log('Video IDs:', videoIds);

        if (!videoIds.length) {
            videoGrid.innerHTML = '<div class="video-card"><div class="video-preview" style="display:flex;align-items:center;justify-content:center;color:#fff;background:linear-gradient(135deg,#111827,#0f172a);">لا توجد روابط شورتس</div><div class="video-card-content"><h3>لا توجد فيديوهات</h3><p>أضف روابط Shorts إلى ملف urlShort.txt.</p></div></div>';
            return;
        }

        renderVideoCards(videoIds);
    } catch (error) {
        console.error(error);
        renderVideoCards(fallbackShortIds);
    }
};

const closeVideoModal = () => {
    if (!videoModal || !videoModalPlayer) {
        return;
    }

    videoModal.classList.remove('open', 'short');
    videoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    videoModalPlayer.src = '';
    if (resumeVideoCarousel) {
        resumeVideoCarousel();
    }
};

if (videoModalClose) {
    videoModalClose.addEventListener('click', closeVideoModal);
}

if (videoModal) {
    videoModal.addEventListener('click', (event) => {
        if (event.target === videoModal || event.target.classList.contains('video-modal-backdrop')) {
            closeVideoModal();
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && videoModal && videoModal.classList.contains('open')) {
        closeVideoModal();
    }
});

buildVideoGallery();
renderHorizontalVideos();

async function loadManagedContent() {
    if (!siteSupabase || !document.querySelector('.portfolio-grid')) return;
    const { data, error } = await siteSupabase.from('site_content').select('*').eq('is_visible', true).order('sort_order');
    if (error || !data?.length) return;

    data.filter(item => item.content_type === 'skill').forEach(item => {
        const list = document.querySelector('.skills-list');
        if (list && !Array.from(list.children).some(skill => skill.textContent === item.title)) {
            const skill = document.createElement('li');
            skill.textContent = item.title;
            list.appendChild(skill);
        }
    });

    data.filter(item => item.content_type === 'portfolio').forEach(item => {
        const grid = document.querySelector('.portfolio-grid');
        const card = document.createElement('div');
        card.className = 'portfolio-item';
        card.dataset.category = item.category || 'all';
        card.innerHTML = `<div class="portfolio-image"><img src="${item.image_url || 'assets/images/1159372.png'}" alt=""></div><div class="portfolio-info"><h3></h3><p></p></div>`;
        card.querySelector('img').alt = item.title;
        card.querySelector('h3').textContent = item.title;
        card.querySelector('p').textContent = item.description;
        if (item.image_url && /^https?:\/\//i.test(item.image_url)) card.addEventListener('click', () => window.open(item.image_url, '_blank', 'noopener,noreferrer'));
        grid.appendChild(card);
    });

    data.filter(item => item.content_type === 'review').forEach(item => {
        const grid = document.querySelector('.reviews-grid');
        if (!grid) return;
        const card = createReviewCard({ name: item.title, role: item.category || 'عميل', text: item.description, rating: item.rating || 5 });
        card.classList.remove('review-card-new');
        grid.appendChild(card);
    });

    data.filter(item => item.content_type === 'video' && item.image_url).forEach(item => {
        const videoId = item.image_url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{6,})/)?.[1];
        if (!videoId || !videoGrid) return;
        const card = document.createElement('div');
        card.className = 'video-card';
        card.dataset.videoId = videoId;
        card.innerHTML = `<img class="video-preview" src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt=""><div class="video-card-content"><h3></h3><p></p></div>`;
        card.querySelector('img').alt = item.title;
        card.querySelector('h3').textContent = item.title;
        card.querySelector('p').textContent = item.description;
        card.addEventListener('click', () => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', 'noopener,noreferrer'));
        videoGrid.appendChild(card);
    });
}

loadManagedContent();

// ============================================
// Portfolio Image Click
// ============================================

const portfolioLinks = document.querySelectorAll('.portfolio-link');

portfolioLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('سيتم فتح الفيديو الكامل في نافذة جديدة');
    });
});

// ============================================
// Add CSS Animations

// ============================================
// Add CSS Animations
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Intersection Observer for Animations
// ============================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const revealElements = document.querySelectorAll('.hero-content, .hero-background, .section-header, .portfolio-item, .product-card, .review-card, .stat-item, .about-content, .contact-container, .profile-card');
revealElements.forEach(el => {
    el.classList.add('reveal-item');
    revealObserver.observe(el);
});

let reviewCards = Array.from(document.querySelectorAll('.review-card'));
const reviewsGrid = document.querySelector('.reviews-grid');
const reviewsAddButton = document.getElementById('reviewsAddButton');
const reviewForm = document.getElementById('reviewForm');
const ratingInput = reviewForm?.querySelector('input[name="reviewRating"]');
const ratingStars = reviewForm ? Array.from(reviewForm.querySelectorAll('.rating-star')) : [];
let reviewDeleteHandler = null;

const resetRating = () => {
    ratingInput.value = '5';
    ratingStars.forEach(star => star.classList.add('is-selected'));
};

ratingStars.forEach(star => {
    star.addEventListener('click', () => {
        const selectedRating = Number(star.dataset.rating);
        ratingInput.value = String(selectedRating);
        ratingStars.forEach(item => {
            item.classList.toggle('is-selected', Number(item.dataset.rating) <= selectedRating);
        });
    });
});

const createReviewCard = ({ name, role, text, rating, id }) => {
    const card = document.createElement('article');
    card.className = 'review-card review-card-new';
    if (id) card.dataset.reviewId = id;
    const stars = '★'.repeat(Number(rating));
    const icon = getReviewIcon(role);
    card.innerHTML = `
        <div class="review-card-top"><span class="review-quote" aria-hidden="true">“</span><div class="review-stars" aria-label="${rating} نجوم">${stars}</div></div>
        <p></p>
        <div class="review-author"><span class="review-author-icon" aria-hidden="true"><i class="fas ${icon}"></i></span><div><h3></h3><span></span></div></div>
        ${id ? '<button class="review-delete-btn" type="button"><i class="fas fa-trash-alt"></i> حذف الرأي</button>' : ''}
    `;
    card.querySelector('p').textContent = text;
    card.querySelector('h3').textContent = name;
    card.querySelector('.review-author > div > span').textContent = role;
        if (id) {
            card.querySelector('.review-delete-btn').addEventListener('click', () => {
                if (reviewDeleteHandler) reviewDeleteHandler(id, card);
            });
        }
    return card;
};

function getReviewIcon(role = '') {
    const roleText = role.toLowerCase();
    if (roleText.includes('فيديو') || roleText.includes('مونتاج') || roleText.includes('محتوى') || roleText.includes('video') || roleText.includes('editor')) return 'fa-video';
    if (roleText.includes('تسويق') || roleText.includes('مسوق') || roleText.includes('marketing')) return 'fa-chart-line';
    if (roleText.includes('مشروع') || roleText.includes('تجارة') || roleText.includes('business')) return 'fa-briefcase';
    if (roleText.includes('تصميم') || roleText.includes('مصمم') || roleText.includes('design')) return 'fa-pen-ruler';
    if (roleText.includes('برمج') || roleText.includes('مطور') || roleText.includes('developer')) return 'fa-code';
    if (roleText.includes('تعليم') || roleText.includes('مدرس') || roleText.includes('teacher')) return 'fa-graduation-cap';
    return 'fa-comment';
}

if (reviewsGrid) {
    const savedReviews = JSON.parse(localStorage.getItem('siteReviews') || '[]');
    const filteredReviews = savedReviews.filter(review => String(review.name || '').trim() !== 'محمود');
    localStorage.setItem('siteReviews', JSON.stringify(filteredReviews));
    filteredReviews.forEach(review => reviewsGrid.appendChild(createReviewCard(review)));
    reviewCards = Array.from(reviewsGrid.querySelectorAll('.review-card'));
}

if (reviewCards.length > 1 && reviewsGrid) {
    let activeReview = 0;
    let reviewsPaused = false;

    const showReview = (nextIndex) => {
        reviewCards.forEach((card, index) => {
            const isActive = index === nextIndex;
            card.classList.toggle('is-active', isActive);
            card.classList.toggle('is-featured', isActive);
            card.setAttribute('aria-hidden', 'false');
        });
        document.querySelectorAll('.reviews-dots span').forEach((dot, index) => {
            dot.classList.toggle('active', index === nextIndex);
        });
        activeReview = nextIndex;
    };

    const rotateReviews = () => {
        if (!reviewsPaused) {
            showReview((activeReview + 1) % reviewCards.length);
        }
    };

    const pauseReviews = () => {
        reviewsPaused = true;
    };

    const resumeReviews = () => {
        reviewsPaused = false;
    };

    reviewDeleteHandler = (reviewId, card) => {
        card.remove();
        const savedReviews = JSON.parse(localStorage.getItem('siteReviews') || '[]');
        localStorage.setItem('siteReviews', JSON.stringify(savedReviews.filter(review => review.id !== reviewId)));
        if (reviewId.startsWith('db-') && siteSupabase) {
            siteSupabase.from('site_content').delete().eq('id', reviewId.replace('db-', '')).then(() => {});
        }
        reviewCards = Array.from(reviewsGrid.querySelectorAll('.review-card'));
        showReview(Math.min(activeReview, reviewCards.length - 1));
    };

    showReview(0);
    reviewsGrid.addEventListener('mouseenter', pauseReviews);
    reviewsGrid.addEventListener('mouseleave', resumeReviews);
    reviewsGrid.addEventListener('focusin', pauseReviews);
    reviewsGrid.addEventListener('focusout', resumeReviews);
    reviewsGrid.addEventListener('touchstart', pauseReviews, { passive: true });
    reviewsGrid.addEventListener('touchend', resumeReviews, { passive: true });
    window.setInterval(rotateReviews, 4500);

    reviewsAddButton?.addEventListener('click', () => {
        const isOpen = !reviewForm.hidden;
        reviewForm.hidden = isOpen;
        reviewsAddButton.innerHTML = isOpen
            ? 'أضف رأيك <i class="fas fa-arrow-left"></i>'
            : 'إغلاق <i class="fas fa-times"></i>';
        if (!isOpen) reviewForm.querySelector('input')?.focus();
        else {
            reviewForm.reset();
            resetRating();
        }
    });

    reviewForm?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(reviewForm);
        const review = {
            id: `review-${Date.now()}`,
            name: String(formData.get('reviewerName')).trim(),
            role: String(formData.get('reviewerRole')).trim(),
            text: String(formData.get('reviewText')).trim(),
            rating: Number(formData.get('reviewRating'))
        };
        if (!review.name || !review.role || !review.text) return;

        if (siteSupabase) {
            const { data } = await siteSupabase.from('site_content').insert({
                content_type: 'review', title: review.name, category: review.role,
                description: review.text, rating: review.rating, icon: getReviewIcon(review.role)
            }).select().single();
            if (data) review.id = `db-${data.id}`;
        }

        const card = createReviewCard(review);
        reviewsGrid.appendChild(card);
        reviewCards = Array.from(reviewsGrid.querySelectorAll('.review-card'));
        showReview(reviewCards.length - 1);
        const savedReviews = JSON.parse(localStorage.getItem('siteReviews') || '[]');
        savedReviews.push(review);
        localStorage.setItem('siteReviews', JSON.stringify(savedReviews));
        reviewForm.reset();
        resetRating();
        reviewForm.hidden = true;
        reviewsAddButton.innerHTML = 'أضف رأيك <i class="fas fa-arrow-left"></i>';
    });
}

// ============================================
// Counter Animation for Stats
// ============================================

const statItems = document.querySelectorAll('.stat-item h3');
let counterStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterStarted) {
            counterStarted = true;
            animateCounters();
        }
    });
}, { threshold: 0.5 });

document.querySelector('.stats') && counterObserver.observe(document.querySelector('.stats'));

function animateCounters() {
    statItems.forEach(item => {
        const finalValue = item.textContent;
        let currentValue = 0;
        const increment = finalValue.match(/\d+/) ? parseInt(finalValue.match(/\d+/)[0]) / 30 : 0;
        const suffix = finalValue.replace(/\d+/g, '');

        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= parseInt(finalValue.match(/\d+/)[0])) {
                item.textContent = finalValue;
                clearInterval(counter);
            } else {
                item.textContent = Math.floor(currentValue) + suffix;
            }
        }, 50);
    });
}

// ============================================
// Responsive Navigation Menu
// ============================================

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

console.log('✓ موقع محمود مصطفى تم تحميله بنجاح!');