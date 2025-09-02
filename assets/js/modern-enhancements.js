// ===== 现代化JavaScript增强 =====

document.addEventListener('DOMContentLoaded', function () {

    // 创建滚动指示器
    createScrollIndicator();

    // 添加平滑滚动
    enableSmoothScrolling();

    // 添加卡片动画
    enableCardAnimations();

    // 添加搜索增强
    enhanceSearch();

    // 添加导航增强
    enhanceNavigation();

    // 添加性能优化
    optimizePerformance();

    // 添加无障碍支持
    enhanceAccessibility();
});

// 创建滚动指示器
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        indicator.style.width = scrolled + '%';
    });
}

// 启用平滑滚动
function enableSmoothScrolling() {
    // 为所有内部链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 启用卡片动画
function enableCardAnimations() {
    const cards = document.querySelectorAll('.url-card');

    // 使用Intersection Observer来触发动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// 增强搜索功能
function enhanceSearch() {
    const searchInput = document.getElementById('search-text');
    if (!searchInput) return;

    // 添加搜索建议
    searchInput.addEventListener('input', debounce(function () {
        const query = this.value.trim();
        if (query.length > 1) {
            showSearchSuggestions(query);
        } else {
            hideSearchSuggestions();
        }
    }, 300));

    // 添加键盘导航
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            hideSearchSuggestions();
            this.blur();
        }
    });
}

// 显示搜索建议
function showSearchSuggestions(query) {
    // 这里可以添加实际的搜索建议逻辑
    const suggestions = [
        'Telegram频道',
        '科技资讯',
        '影视音乐',
        '壁纸美图',
        '游戏专区'
    ].filter(item => item.toLowerCase().includes(query.toLowerCase()));

    // 创建建议列表
    let suggestionBox = document.getElementById('search-suggestions');
    if (!suggestionBox) {
        suggestionBox = document.createElement('div');
        suggestionBox.id = 'search-suggestions';
        suggestionBox.className = 'search-suggestions';
        document.getElementById('search').appendChild(suggestionBox);
    }

    suggestionBox.innerHTML = suggestions.map(suggestion =>
        `<div class="suggestion-item">${suggestion}</div>`
    ).join('');

    suggestionBox.style.display = 'block';
}

// 隐藏搜索建议
function hideSearchSuggestions() {
    const suggestionBox = document.getElementById('search-suggestions');
    if (suggestionBox) {
        suggestionBox.style.display = 'none';
    }
}

// 增强导航
function enhanceNavigation() {
    // 添加导航高亮
    const currentPath = window.location.pathname;
    document.querySelectorAll('.navbar-nav a, .sidebar-menu-inner a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // 添加移动端导航优化
    if (window.innerWidth <= 768) {
        const sidebarToggle = document.getElementById('sidebar-switch');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', function () {
                document.body.classList.toggle('sidebar-open');
            });
        }
        // 添加遮罩点击关闭功能
        if (!document.getElementById('sidebar-mask')) {
            const mask = document.createElement('div');
            mask.id = 'sidebar-mask';
            mask.style.position = 'fixed';
            mask.style.top = '0';
            mask.style.left = '0';
            mask.style.right = '0';
            mask.style.bottom = '0';
            mask.style.background = 'rgba(0,0,0,0.5)';
            mask.style.zIndex = '1080';
            mask.style.display = 'none';
            document.body.appendChild(mask);
            mask.addEventListener('click', function () {
                document.body.classList.remove('sidebar-open');
                // 强制立即隐藏遮罩，防止 observer 延迟
                mask.style.display = 'none';
            });
        }
        // observer 只根据 sidebar-open 控制遮罩显示
        const observer = new MutationObserver(() => {
            const mask = document.getElementById('sidebar-mask');
            if (document.body.classList.contains('sidebar-open')) {
                if (mask) mask.style.display = 'block';
            } else {
                if (mask) mask.style.display = 'none';
            }
        });
        observer.observe(document.body, {attributes: true, attributeFilter: ['class']});
    }
}

// 性能优化
function optimizePerformance() {
    // 图片懒加载增强
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // 防抖函数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 节流滚动事件
    let ticking = false;

    function updateOnScroll() {
        // 滚动相关的更新逻辑
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
}

// 无障碍支持
function enhanceAccessibility() {
    // 添加键盘导航支持
    document.addEventListener('keydown', function (e) {
        // Ctrl/Cmd + K 聚焦搜索框
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('search-text');
            if (searchInput) {
                searchInput.focus();
            }
        }

        // ESC 关闭模态框
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                const closeBtn = modal.querySelector('.close, [data-dismiss="modal"]');
                if (closeBtn) closeBtn.click();
            });
        }
    });

    // 添加焦点管理
    document.addEventListener('focusin', function (e) {
        if (e.target.matches('a, button, input, textarea, select')) {
            e.target.classList.add('focused');
        }
    });

    document.addEventListener('focusout', function (e) {
        if (e.target.matches('a, button, input, textarea, select')) {
            e.target.classList.remove('focused');
        }
    });

    // 添加跳过链接
    const skipLink = document.createElement('a');
    skipLink.href = '#content';
    skipLink.textContent = '跳到主要内容';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
}


// 添加工具提示增强
function enhanceTooltips() {
    const tooltipElements = document.querySelectorAll('[data-toggle="tooltip"]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            const tooltip = document.createElement('div');
            tooltip.className = 'enhanced-tooltip';
            tooltip.textContent = this.getAttribute('data-original-title') || this.title;
            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';

            setTimeout(() => tooltip.classList.add('show'), 10);
        });

        element.addEventListener('mouseleave', function () {
            const tooltip = document.querySelector('.enhanced-tooltip');
            if (tooltip) {
                tooltip.classList.remove('show');
                setTimeout(() => tooltip.remove(), 200);
            }
        });
    });
}

// 添加错误处理
window.addEventListener('error', function (e) {
    console.error('页面错误:', e.error);
    // 可以在这里添加错误报告逻辑
});

// 添加页面可见性API支持
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        document.title = '页面已隐藏 - ' + document.title;
    } else {
        document.title = document.title.replace('页面已隐藏 - ', '');
    }
});

// 导出函数供全局使用
window.ModernEnhancements = {
    createScrollIndicator,
    enableSmoothScrolling,
    enableCardAnimations,
    enhanceSearch,
    enhanceNavigation,
    optimizePerformance,
    enhanceAccessibility,
    enhanceTooltips
}; 