// ================================================================
// THE BLURR - MAIN JAVASCRIPT
// Complete E-Commerce Functionality
// ================================================================

// ================================================================
// STATE MANAGEMENT
// ================================================================

const state = {
    cart: JSON.parse(localStorage.getItem('theBlurrCart')) || [],
    wishlist: JSON.parse(localStorage.getItem('theBlurrWishlist')) || [],
    currency: localStorage.getItem('theBlurrCurrency') || 'INR',
    currentFilters: {},
    currentSort: 'featured',
    displayedProducts: 8
};

// ================================================================
// INITIALIZATION
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Remove preload class to enable animations
    setTimeout(() => {
        document.body.classList.remove('preload');
    }, 100);
    
    // Initialize all components
    initializeHeader();
    initializeHeroCarousel();
    initializeAnnouncementBar();
    initializeCurrency();
    initializeSearch();
    initializeCart();
    initializeWishlist();
    initializeProducts();
    initializeModals();
    initializeScrollAnimations();
    initializeBackToTop();
    initializeForms();
    initializeMobileNav();
    
    // Update UI
    updateCartCount();
    updateWishlistCount();
    
    console.log('The Blurr initialized successfully');
}

// ================================================================
// HEADER FUNCTIONALITY
// ================================================================

function initializeHeader() {
    const header = document.getElementById('mainHeader');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ================================================================
// HERO CAROUSEL
// ================================================================

function initializeHeroCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    let autoPlayInterval;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Event listeners
    prevBtn?.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    nextBtn?.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });
    
    // Start auto-play
    startAutoPlay();
}

// ================================================================
// ANNOUNCEMENT BAR
// ================================================================

function initializeAnnouncementBar() {
    const slides = document.querySelectorAll('.announcement-slide');
    const prevBtn = document.querySelector('.announcement-prev');
    const nextBtn = document.querySelector('.announcement-next');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    prevBtn?.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn?.addEventListener('click', () => showSlide(currentSlide + 1));
    
    // Auto-rotate every 4 seconds
    setInterval(() => showSlide(currentSlide + 1), 4000);
}

// ================================================================
// CURRENCY SELECTOR
// ================================================================

function initializeCurrency() {
    const currencyBtn = document.getElementById('currencyBtn');
    const currencyDropdown = document.getElementById('currencyDropdown');
    const currencyOptions = document.querySelectorAll('.currency-option');
    
    if (!currencyBtn) return;
    
    // Toggle dropdown
    currencyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currencyDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        currencyDropdown.classList.remove('active');
    });
    
    // Handle currency selection
    currencyOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const currency = option.dataset.currency;
            state.currency = currency;
            localStorage.setItem('theBlurrCurrency', currency);
            document.querySelector('.current-currency').textContent = currency;
            currencyDropdown.classList.remove('active');
            updateProductPrices();
            showNotification(`Currency changed to ${currency}`);
        });
    });
    
    // Set initial currency
    document.querySelector('.current-currency').textContent = state.currency;
}

function convertPrice(priceINR, currency) {
    const rate = currencyRates[currency] || 1;
    return Math.round(priceINR * rate);
}

function formatPrice(price, currency) {
    const symbol = currencySymbols[currency] || '₹';
    return `${symbol}${price.toLocaleString()}`;
}

function updateProductPrices() {
    // Re-render products with new currency
    renderProducts();
}

// ================================================================
// SEARCH FUNCTIONALITY
// ================================================================

function initializeSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchBtn) return;
    
    // Open search
    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput.focus(), 300);
    });
    
    // Close search
    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });
    
    // Search input
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim().toLowerCase();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
}

function performSearch(query) {
    const results = products.filter(product => {
        return product.name.toLowerCase().includes(query) ||
               product.category.toLowerCase().includes(query) ||
               product.collection.toLowerCase().includes(query) ||
               product.description.toLowerCase().includes(query);
    });
    
    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div style="color: #fff; padding: 2rem 0;">
                <p>No results found for "${query}"</p>
            </div>
        `;
        return;
    }
    
    const html = `
        <div style="color: #fff;">
            <h4 style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem; color: rgba(255,255,255,0.7);">
                ${results.length} Result${results.length > 1 ? 's' : ''} Found
            </h4>
            <div style="display: grid; gap: 1rem;">
                ${results.slice(0, 5).map(product => `
                    <div style="display: flex; gap: 1rem; padding: 1rem; border: 1px solid rgba(255,255,255,0.2); cursor: pointer;" 
                         onclick="showQuickView('${product.id}')">
                        <div style="width: 80px; height: 100px; background: #f5f5f5;"></div>
                        <div style="flex: 1;">
                            <h5 style="margin-bottom: 0.5rem;">${product.name}</h5>
                            <p style="font-size: 0.875rem; color: rgba(255,255,255,0.7); margin-bottom: 0.5rem;">${product.category}</p>
                            <p style="font-weight: 600; color: #C9A961;">${formatPrice(convertPrice(product.price, state.currency), state.currency)}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            ${results.length > 5 ? `<p style="margin-top: 1rem; text-align: center; color: #C9A961;">+ ${results.length - 5} more results</p>` : ''}
        </div>
    `;
    
    searchResults.innerHTML = html;
}

// ================================================================
// PRODUCT DISPLAY
// ================================================================

function initializeProducts() {
    renderProducts();
    initializeSorting();
    initializeFiltering();
}

function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    let productsToDisplay = [...products];
    
    // Apply filters
    productsToDisplay = applyFilters(productsToDisplay);
    
    // Apply sorting
    productsToDisplay = applySorting(productsToDisplay);
    
    // Limit displayed products
    const displayProducts = productsToDisplay.slice(0, state.displayedProducts);
    
    productGrid.innerHTML = displayProducts.map(product => createProductCard(product)).join('');
    
    // Add event listeners
    attachProductEventListeners();
}

function createProductCard(product) {
    const isInWishlist = state.wishlist.includes(product.id);
    const price = convertPrice(product.price, state.currency);
    const originalPrice = product.originalPrice ? convertPrice(product.originalPrice, state.currency) : null;
    
    return `
        <div class="product-card animate-on-scroll scale-in" data-product-id="${product.id}">
            <div class="product-image-wrapper">
                <div class="product-image" style="background: linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%); display: flex; align-items: center; justify-content: center; color: #999;">
                    ${product.name}
                </div>
                <div class="product-image-secondary" style="background: linear-gradient(135deg, #e5e5e5 0%, #d5d5d5 100%); display: flex; align-items: center; justify-content: center; color: #999;">
                    ${product.name}
                </div>
                
                ${product.badges.length > 0 ? `
                    <div class="product-badges">
                        ${product.badges.map(badge => `
                            <span class="product-badge badge-${badge.toLowerCase().replace(' ', '-')}">${badge}</span>
                        `).join('')}
                    </div>
                ` : ''}
                
                <div class="product-actions">
                    <button class="product-action-btn wishlist-btn ${isInWishlist ? 'active' : ''}" data-product-id="${product.id}" aria-label="Add to wishlist">
                        <i class="fa${isInWishlist ? 's' : 'r'} fa-heart"></i>
                    </button>
                </div>
                
                <button class="quick-view-btn" data-product-id="${product.id}">Quick View</button>
            </div>
            
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    ${originalPrice ? `<span class="price-original">${formatPrice(originalPrice, state.currency)}</span>` : ''}
                    <span class="${originalPrice ? 'price-sale' : ''}">${formatPrice(price, state.currency)}</span>
                </div>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function attachProductEventListeners() {
    // Quick view buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = btn.dataset.productId;
            showQuickView(productId);
        });
    });
    
    // Wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = btn.dataset.productId;
            toggleWishlist(productId);
        });
    });
}

// ================================================================
// SORTING
// ================================================================

function initializeSorting() {
    const sortSelect = document.getElementById('sortSelect');
    
    sortSelect?.addEventListener('change', (e) => {
        state.currentSort = e.target.value;
        renderProducts();
        showNotification('Products sorted');
    });
}

function applySorting(products) {
    const sorted = [...products];
    
    switch (state.currentSort) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'newest':
            return sorted.reverse();
        case 'bestselling':
            return sorted.sort((a, b) => b.reviews - a.reviews);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        default:
            return sorted;
    }
}

// ================================================================
// FILTERING
// ================================================================

function initializeFiltering() {
    const filterBtn = document.getElementById('filterBtn');
    const filterModal = document.getElementById('filterModal');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const clearFiltersBtn = document.getElementById('clearFilters');
    
    filterBtn?.addEventListener('click', () => {
        openFilterModal();
    });
    
    applyFiltersBtn?.addEventListener('click', () => {
        applyFiltersFromModal();
        closeModal(filterModal);
    });
    
    clearFiltersBtn?.addEventListener('click', () => {
        state.currentFilters = {};
        renderProducts();
        updateActiveFilters();
        showNotification('Filters cleared');
    });
}

function openFilterModal() {
    const filterModal = document.getElementById('filterModal');
    const filterBody = document.getElementById('filterBody');
    
    filterBody.innerHTML = `
        <div class="filter-group">
            <h4 class="filter-group-title">Price Range</h4>
            <div class="filter-options">
                ${filterOptions.priceRanges.map((range, index) => `
                    <div class="filter-option">
                        <input type="checkbox" id="price-${index}" value="${range.label}" ${state.currentFilters.priceRange?.includes(range.label) ? 'checked' : ''}>
                        <label for="price-${index}">${range.label}</label>
                        <span class="filter-option-count">(${range.count})</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="filter-group">
            <h4 class="filter-group-title">Category</h4>
            <div class="filter-options">
                ${filterOptions.categories.map(cat => `
                    <div class="filter-option">
                        <input type="checkbox" id="cat-${cat.value}" value="${cat.value}" ${state.currentFilters.category?.includes(cat.value) ? 'checked' : ''}>
                        <label for="cat-${cat.value}">${cat.label}</label>
                        <span class="filter-option-count">(${cat.count})</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="filter-group">
            <h4 class="filter-group-title">Collection</h4>
            <div class="filter-options">
                ${filterOptions.collections.map(col => `
                    <div class="filter-option">
                        <input type="checkbox" id="col-${col.value}" value="${col.value}" ${state.currentFilters.collection?.includes(col.value) ? 'checked' : ''}>
                        <label for="col-${col.value}">${col.label}</label>
                        <span class="filter-option-count">(${col.count})</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    filterModal.classList.add('active');
}

function applyFiltersFromModal() {
    const priceRangeInputs = document.querySelectorAll('[id^="price-"]:checked');
    const categoryInputs = document.querySelectorAll('[id^="cat-"]:checked');
    const collectionInputs = document.querySelectorAll('[id^="col-"]:checked');
    
    state.currentFilters = {
        priceRange: Array.from(priceRangeInputs).map(input => input.value),
        category: Array.from(categoryInputs).map(input => input.value),
        collection: Array.from(collectionInputs).map(input => input.value)
    };
    
    renderProducts();
    updateActiveFilters();
    showNotification('Filters applied');
}

function applyFilters(products) {
    let filtered = [...products];
    
    // Price range filter
    if (state.currentFilters.priceRange?.length > 0) {
        filtered = filtered.filter(product => {
            return state.currentFilters.priceRange.some(rangeLabel => {
                const range = filterOptions.priceRanges.find(r => r.label === rangeLabel);
                return range && product.price >= range.min && product.price < range.max;
            });
        });
    }
    
    // Category filter
    if (state.currentFilters.category?.length > 0) {
        filtered = filtered.filter(product => 
            state.currentFilters.category.includes(product.category)
        );
    }
    
    // Collection filter
    if (state.currentFilters.collection?.length > 0) {
        filtered = filtered.filter(product => 
            state.currentFilters.collection.includes(product.collection)
        );
    }
    
    return filtered;
}

function updateActiveFilters() {
    const activeFiltersContainer = document.getElementById('activeFilters');
    if (!activeFiltersContainer) return;
    
    const allFilters = [
        ...(state.currentFilters.priceRange || []),
        ...(state.currentFilters.category || []),
        ...(state.currentFilters.collection || [])
    ];
    
    if (allFilters.length === 0) {
        activeFiltersContainer.innerHTML = '';
        return;
    }
    
    activeFiltersContainer.innerHTML = allFilters.map(filter => `
        <div class="filter-tag">
            <span>${filter}</span>
            <button onclick="removeFilter('${filter}')">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

function removeFilter(filterValue) {
    // Remove from all filter categories
    Object.keys(state.currentFilters).forEach(key => {
        if (Array.isArray(state.currentFilters[key])) {
            state.currentFilters[key] = state.currentFilters[key].filter(v => v !== filterValue);
            if (state.currentFilters[key].length === 0) {
                delete state.currentFilters[key];
            }
        }
    });
    
    renderProducts();
    updateActiveFilters();
}

// ================================================================
// QUICK VIEW MODAL
// ================================================================

function showQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('quickViewModal');
    const isInWishlist = state.wishlist.includes(productId);
    const price = convertPrice(product.price, state.currency);
    const originalPrice = product.originalPrice ? convertPrice(product.originalPrice, state.currency) : null;
    
    // Populate modal
    document.getElementById('quickViewName').textContent = product.name;
    document.getElementById('quickViewRating').innerHTML = `
        ${generateStars(product.rating)}
        <span class="rating-count">(${product.reviews} reviews)</span>
    `;
    document.getElementById('quickViewPrice').innerHTML = `
        ${originalPrice ? `<span class="price-original">${formatPrice(originalPrice, state.currency)}</span>` : ''}
        <span class="${originalPrice ? 'price-sale' : ''}">${formatPrice(price, state.currency)}</span>
    `;
    document.getElementById('quickViewDescription').textContent = product.shortDescription;
    document.getElementById('quickViewSKU').textContent = product.sku;
    document.getElementById('quickViewCategory').textContent = product.category;
    
    // Badges
    const badgesContainer = document.getElementById('quickViewBadges');
    badgesContainer.innerHTML = product.badges.map(badge => 
        `<span class="product-badge badge-${badge.toLowerCase().replace(' ', '-')}">${badge}</span>`
    ).join('');
    
    // Wishlist button
    const wishlistBtn = document.getElementById('quickViewWishlist');
    wishlistBtn.className = `btn-wishlist-large ${isInWishlist ? 'active' : ''}`;
    wishlistBtn.innerHTML = `<i class="fa${isInWishlist ? 's' : 'r'} fa-heart"></i>`;
    wishlistBtn.onclick = () => toggleWishlist(productId);
    
    // Add to cart button
    document.getElementById('quickViewAddCart').onclick = () => {
        addToCart(productId);
        closeModal(modal);
    };
    
    // Show modal
    modal.classList.add('active');
}

// ================================================================
// WISHLIST FUNCTIONALITY
// ================================================================

function initializeWishlist() {
    const wishlistBtn = document.getElementById('wishlistBtn');
    const wishlistSidebar = document.getElementById('wishlistSidebar');
    const wishlistClose = document.getElementById('wishlistClose');
    
    wishlistBtn?.addEventListener('click', () => {
        wishlistSidebar.classList.add('active');
        renderWishlist();
    });
    
    wishlistClose?.addEventListener('click', () => {
        wishlistSidebar.classList.remove('active');
    });
}

function toggleWishlist(productId) {
    const index = state.wishlist.indexOf(productId);
    
    if (index > -1) {
        state.wishlist.splice(index, 1);
        showNotification('Removed from wishlist');
    } else {
        state.wishlist.push(productId);
        showNotification('Added to wishlist');
    }
    
    localStorage.setItem('theBlurrWishlist', JSON.stringify(state.wishlist));
    updateWishlistCount();
    renderProducts();
    renderWishlist();
}

function updateWishlistCount() {
    const count = state.wishlist.length;
    document.getElementById('wishlistCount').textContent = count;
    document.getElementById('wishlistItemCount').textContent = count;
}

function renderWishlist() {
    const wishlistItems = document.getElementById('wishlistItems');
    const wishlistEmpty = document.getElementById('wishlistEmpty');
    
    if (state.wishlist.length === 0) {
        wishlistEmpty.style.display = 'block';
        wishlistItems.style.display = 'none';
        return;
    }
    
    wishlistEmpty.style.display = 'none';
    wishlistItems.style.display = 'block';
    
    const wishlistProducts = products.filter(p => state.wishlist.includes(p.id));
    
    wishlistItems.innerHTML = wishlistProducts.map(product => {
        const price = formatPrice(convertPrice(product.price, state.currency), state.currency);
        
        return `
            <div class="wishlist-item">
                <div class="wishlist-item-image" style="background: linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%);"></div>
                <div class="wishlist-item-details">
                    <h4 class="wishlist-item-name">${product.name}</h4>
                    <p class="wishlist-item-meta">${product.category}</p>
                    <p class="wishlist-item-price">${price}</p>
                    <button class="btn-primary btn-add-cart" onclick="addToCart('${product.id}'); document.getElementById('wishlistSidebar').classList.remove('active');">
                        Add to Cart
                    </button>
                    <button class="wishlist-item-remove" onclick="toggleWishlist('${product.id}')">
                        Remove
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ================================================================
// CART FUNCTIONALITY
// ================================================================

function initializeCart() {
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.getElementById('cartClose');
    const continueShoppingBtn = document.getElementById('continueShoppingBtn');
    
    cartBtn?.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        renderCart();
    });
    
    cartClose?.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });
    
    continueShoppingBtn?.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });
}

function addToCart(productId, quantity = 1) {
    const existingItem = state.cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        state.cart.push({ productId, quantity });
    }
    
    localStorage.setItem('theBlurrCart', JSON.stringify(state.cart));
    updateCartCount();
    renderCart();
    showNotification('Added to cart');
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.productId !== productId);
    localStorage.setItem('theBlurrCart', JSON.stringify(state.cart));
    updateCartCount();
    renderCart();
    showNotification('Removed from cart');
}

function updateCartQuantity(productId, newQuantity) {
    const item = state.cart.find(item => item.productId === productId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        localStorage.setItem('theBlurrCart', JSON.stringify(state.cart));
        renderCart();
    }
}

function updateCartCount() {
    const count = state.cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
    document.getElementById('cartItemCount').textContent = count;
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartFooter = document.getElementById('cartFooter');
    
    if (state.cart.length === 0) {
        cartEmpty.style.display = 'flex';
        cartItems.style.display = 'none';
        cartFooter.style.display = 'none';
        return;
    }
    
    cartEmpty.style.display = 'none';
    cartItems.style.display = 'block';
    cartFooter.style.display = 'block';
    
    let subtotal = 0;
    
    cartItems.innerHTML = state.cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return '';
        
        const price = convertPrice(product.price, state.currency);
        const itemTotal = price * item.quantity;
        subtotal += itemTotal;
        
        return `
            <div class="cart-item">
                <div class="cart-item-image" style="background: linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%);"></div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${product.name}</h4>
                    <p class="cart-item-meta">${product.category}</p>
                    <p class="cart-item-price">${formatPrice(price, state.currency)}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateCartQuantity('${product.id}', ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartQuantity('${product.id}', ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart('${product.id}')">
                        Remove
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('cartSubtotal').textContent = formatPrice(subtotal, state.currency);
}

// ================================================================
// MODALS
// ================================================================

function initializeModals() {
    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', () => {
            const modal = overlay.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                closeModal(modal);
            });
        }
    });
}

function closeModal(modal) {
    modal?.classList.remove('active');
}

// ================================================================
// SCROLL ANIMATIONS
// ================================================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ================================================================
// BACK TO TOP
// ================================================================

function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ================================================================
// FORMS
// ================================================================

function initializeForms() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Simulate subscription
        setTimeout(() => {
            showNotification('Thank you for subscribing!');
            newsletterForm.reset();
        }, 500);
    });
}

// ================================================================
// MOBILE NAVIGATION
// ================================================================

function initializeMobileNav() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.getElementById('mobileNavClose');
    
    mobileMenuToggle?.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });
    
    mobileNavClose?.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
    });
    
    // Submenu toggles
    document.querySelectorAll('.mobile-nav-expand').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const submenu = btn.nextElementSibling;
            submenu.classList.toggle('active');
            btn.querySelector('i').classList.toggle('fa-chevron-down');
            btn.querySelector('i').classList.toggle('fa-chevron-up');
        });
    });
}

// ================================================================
// NOTIFICATIONS
// ================================================================

function showNotification(message) {
    const toast = document.getElementById('notificationToast');
    const messageEl = document.getElementById('notificationMessage');
    
    messageEl.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ================================================================
// UTILITY FUNCTIONS
// ================================================================

// Make functions available globally
window.showQuickView = showQuickView;
window.toggleWishlist = toggleWishlist;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.removeFilter = removeFilter;