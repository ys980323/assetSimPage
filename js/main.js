document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニューの実装
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // メニュー外クリックで閉じる
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
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
            
            card.style.transform = `translateY(-5px) perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
            card.style.backgroundPosition = `${x/10}px ${y/10}px`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'translateY(0)';
            card.style.backgroundPosition = 'center';
        });
    });
    
    // スクロールアニメーション
    const fadeElements = document.querySelectorAll('.feature-card, .highlight-item, .model-section, .section-title, .app-card');
    
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
    
    fadeElements.forEach(element => {
        element.classList.add('fade-element');
        fadeObserver.observe(element);
    });
    
    // パララックス効果
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // ヘッダーのパララックス
        const header = document.querySelector('.header');
        if (header) {
            header.style.backgroundPosition = `50% ${scrollY * 0.5}px`;
        }
        
        // その他のパララックス要素
        const parallaxElements = document.querySelectorAll('.model-explanation, .features, .highlights');
        parallaxElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top + scrollY;
            const offset = (scrollY - elementPosition) * 0.1;
            element.style.backgroundPosition = `50% ${offset}px`;
        });
    });
});
