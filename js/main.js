document.addEventListener('DOMContentLoaded', function() {
    // ページ読み込み時のローディングエフェクト
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    const loader = document.createElement('div');
    loader.className = 'loader';
    loadingOverlay.appendChild(loader);
    document.body.appendChild(loadingOverlay);
    
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        setTimeout(() => {
            loadingOverlay.remove();
        }, 500);
    }, 800);

    // ハンバーガーメニューの実装
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        // document.body.classList.toggle('menu-open');
    });

    // メニュー外クリックで閉じる
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            // document.body.classList.remove('menu-open');
        }
    });
    
    // ナビゲーションリンクにホバーエフェクトを追加
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('hover-effect');
        });
        item.addEventListener('mouseleave', function() {
            this.classList.remove('hover-effect');
        });
    });

    // カードホバーエフェクトの強化
    const cards = document.querySelectorAll('.feature-card, .highlight-item, .model-section, .app-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            // 3D効果をより洗練したものに
            card.style.transform = `translateY(-5px) perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
            
            // 光の反射効果を追加
            const glareX = ((x / rect.width) * 100);
            const glareY = ((y / rect.height) * 100);
            card.style.backgroundImage = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)`;
            
            // アイコンに微妙な動きを追加
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = `translate(${moveX * 2}px, ${moveY * 2}px)`;
            }
            
            // カードオーバーレイの位置を更新
            const overlay = card.querySelector('.card-overlay');
            if (overlay) {
                overlay.style.setProperty('--x', `${x}px`);
                overlay.style.setProperty('--y', `${y}px`);
            }
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'translateY(0)';
            card.style.backgroundImage = 'none';
            
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'translate(0, 0)';
            }
        });
    });
    
    // スクロールアニメーション - 改良版
    const fadeElements = document.querySelectorAll('.feature-card, .highlight-item, .model-section, .section-title, .app-card, .feature-grid > *, .model-explanation > *, .promo-banner, .promo-content > *, .promo-image, .footer-content > *');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach((element, index) => {
        // 各要素に異なる遅延を追加して、連続的なアニメーション効果を作る
        element.style.transitionDelay = `${index * 0.1}s`;
        element.classList.add('fade-element');
        fadeObserver.observe(element);
    });
    
    // 追加: カードのホバー効果をタッチデバイスでも使えるように
    if ('ontouchstart' in window) {
        const cards = document.querySelectorAll('.feature-card, .model-section');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-hover');
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-hover');
                }, 500);
            });
        });
    }
    
    // セクションごとのアニメーション
    const sections = document.querySelectorAll('.features, .highlights, .calculation-model');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
    
    // パララックス効果 - 強化版
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // ヘッダーのパララックス
        const header = document.querySelector('.header');
        if (header) {
            header.style.backgroundPosition = `50% ${scrollY * 0.5}px`;
            
            // タイトルのパララックス効果
            const heroTitle = header.querySelector('h1');
            const heroSubtitle = header.querySelector('.subtitle');
            
            if (heroTitle) {
                heroTitle.style.transform = `translateY(${scrollY * 0.2}px)`;
            }
            
            if (heroSubtitle) {
                heroSubtitle.style.transform = `translateY(${scrollY * 0.1}px)`;
            }
        }
        
        // その他のパララックス要素
        const parallaxElements = document.querySelectorAll('.model-explanation, .features, .highlights');
        parallaxElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top + scrollY;
            const offset = (scrollY - elementPosition) * 0.1;
            element.style.backgroundPosition = `50% ${offset}px`;
        });
        
        // 背景のパララックス効果
        document.body.style.backgroundPosition = `50% ${scrollY * 0.05}px`;
    });
    
    // カラフルな動的背景効果
    const createParticleEffect = () => {
        const particles = document.createElement('div');
        particles.className = 'particles';
        document.body.appendChild(particles);
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // ランダムなサイズ、位置、色を設定
            const size = Math.random() * 15 + 5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 20;
            const duration = Math.random() * 40 + 20;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            // グラデーションカラーをアプリのテーマに合わせて調整
            const useAccent = Math.random() > 0.5;
            const hue1 = useAccent ? Math.random() * 60 + 10 : Math.random() * 60 + 200; // アクセントカラーか青系
            const hue2 = useAccent ? Math.random() * 60 + 30 : Math.random() * 60 + 260; // アクセントカラーか紫系
            particle.style.background = `linear-gradient(${Math.random() * 360}deg, hsla(${hue1}, 100%, 70%, 0.2), hsla(${hue2}, 100%, 70%, 0.1))`;
            
            particles.appendChild(particle);
        }
    };
    
    // 波紋エフェクト
    const createRippleEffect = (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        document.body.appendChild(ripple);
        
        const x = e.clientX;
        const y = e.clientY;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    };
    
    // ユーザー操作に合わせて波紋エフェクトを発生
    document.addEventListener('click', createRippleEffect);
    
    // パーティクルエフェクトを初期化
    createParticleEffect();
});

// ページ読み込み完了時にローディングアニメーションを追加
window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
    
    // App Storeダウンロードボタンのアニメーション
    const downloadButtons = document.querySelectorAll('.download-button, .app-download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // 特定のセクションに到達したら自動的にその要素を強調表示する
    const highlightOnScroll = () => {
        const sections = document.querySelectorAll('.model-section');
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            
            // ビューポートの中央に近づいたら強調
            if (rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3) {
                section.classList.add('highlight-active');
            } else {
                section.classList.remove('highlight-active');
            }
        });
    };
    
    // 装飾的な要素のアニメーション
    const animateDecoElements = () => {
        // セクション波形のアニメーション
        const sectionWaves = document.querySelectorAll('.section-wave svg path');
        sectionWaves.forEach(wave => {
            const originalD = wave.getAttribute('d');
            setInterval(() => {
                const newPoints = originalD.split(' ').map(point => {
                    if (point.match(/^[0-9]+\.[0-9]+$/)) {
                        const val = parseFloat(point);
                        return (val + (Math.random() * 10 - 5)).toFixed(1);
                    }
                    return point;
                }).join(' ');
                wave.setAttribute('d', newPoints);
            }, 5000);
        });
    };
    
    // 実行
    try {
        animateDecoElements();
    } catch (e) {
        console.log('デコレーション要素のアニメーションでエラーが発生しました:', e);
    }
    
    window.addEventListener('scroll', highlightOnScroll);
    highlightOnScroll(); // 初期表示時にも実行
});
