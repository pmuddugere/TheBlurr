// ================================================================
// THE BLURR - PRODUCT DATA
// Comprehensive Product Catalog with Rich Metadata
// ================================================================

const products = [
    {
        id: 'PROD001',
        name: 'Lumière Diamond Cascade Necklace',
        category: 'Necklaces',
        collection: 'Lumière Collection',
        price: 124999,
        originalPrice: 149999,
        currency: '₹',
        rating: 5,
        reviews: 47,
        badges: ['New Arrival', 'Bestseller'],
        shortDescription: 'An exquisite cascade of diamonds set in pure silver, capturing light with every movement.',
        description: 'The Lumière Diamond Cascade Necklace represents the pinnacle of our craftsmanship. Featuring 42 IGI-certified diamonds totaling 3.2 carats, this masterpiece is meticulously handcrafted in 99.9% pure silver. Each diamond is carefully selected for its exceptional clarity and brilliance, creating a cascade effect that captures and reflects light from every angle. The adjustable chain ensures a perfect fit, while the secure clasp provides peace of mind. This investment piece comes with lifetime service and a certificate of authenticity.',
        images: ['product-1-main.jpg', 'product-1-alt1.jpg', 'product-1-alt2.jpg', 'product-1-alt3.jpg'],
        specifications: {
            metal: '99.9% Pure Silver',
            stones: 'IGI Certified Diamonds (3.2 ct)',
            length: '16-18 inches (adjustable)',
            weight: '24.5g',
            clasp: 'Lobster Clasp with Safety Chain'
        },
        availability: 'In Stock',
        sku: 'LUM-NCK-001',
        inStock: true,
        lowStock: false,
        limitedEdition: false
    },
    {
        id: 'PROD002',
        name: 'Éternité Solitaire Ring',
        category: 'Rings',
        collection: 'Bridal Collection',
        price: 89500,
        originalPrice: null,
        currency: '₹',
        rating: 5,
        reviews: 89,
        badges: ['Bestseller'],
        shortDescription: 'A timeless solitaire featuring a 1.5ct diamond in an elegant silver setting.',
        description: 'The Éternité Solitaire Ring embodies timeless elegance and sophistication. At its heart sits a stunning 1.5-carat IGI-certified diamond of exceptional clarity (VVS1) and color (D grade), elevated by six prongs in a cathedral setting. The band, crafted from hallmarked 99.9% pure silver, features delicate engraving and a comfort-fit interior. This ring is designed to be cherished for generations, symbolizing eternal love and commitment. Includes complimentary resizing within the first year and lifetime cleaning service.',
        images: ['product-2-main.jpg', 'product-2-alt1.jpg', 'product-2-alt2.jpg', 'product-2-alt3.jpg'],
        specifications: {
            metal: '99.9% Pure Silver',
            centerStone: 'IGI Certified Diamond 1.5ct (VVS1, D)',
            ringSize: '4-10 (Adjustable)',
            weight: '5.8g',
            setting: 'Six-Prong Cathedral Setting'
        },
        availability: 'In Stock',
        sku: 'ETE-RNG-002',
        inStock: true,
        lowStock: false,
        limitedEdition: false
    },
    {
        id: 'PROD003',
        name: 'Constellation Drop Earrings',
        category: 'Earrings',
        collection: 'Signature Collection',
        price: 64500,
        originalPrice: 75000,
        currency: '₹',
        rating: 5,
        reviews: 62,
        badges: ['New Arrival'],
        shortDescription: 'Celestial-inspired drop earrings with brilliant-cut diamonds.',
        description: 'Inspired by the night sky, these Constellation Drop Earrings feature a captivating arrangement of brilliant-cut diamonds that create a stellar display. Each earring showcases 18 diamonds (totaling 1.8 carats per pair) set in meticulously crafted pure silver. The drop design gracefully frames the face, while secure butterfly backs ensure comfortable all-day wear. The constellation pattern is unique to The Blurr, protected by design registration. Perfect for both special occasions and elevating everyday elegance.',
        images: ['product-3-main.jpg', 'product-3-alt1.jpg', 'product-3-alt2.jpg', 'product-3-alt3.jpg'],
        specifications: {
            metal: '99.9% Pure Silver',
            stones: 'IGI Certified Diamonds (1.8 ct total)',
            dropLength: '1.5 inches',
            weight: '6.2g (pair)',
            backing: 'Secure Butterfly Backs'
        },
        availability: 'In Stock',
        sku: 'CON-EAR-003',
        inStock: true,
        lowStock: true,
        limitedEdition: false
    },
    {
        id: 'PROD004',
        name: 'Heritage Bangle Collection',
        category: 'Bracelets',
        collection: 'Heritage Series',
        price: 98000,
        originalPrice: null,
        currency: '₹',
        rating: 5,
        reviews: 34,
        badges: ['Limited Edition'],
        shortDescription: 'A set of three intricate bangles showcasing traditional craftsmanship.',
        description: 'The Heritage Bangle Collection pays homage to centuries of jewelry-making artistry. This exquisite set of three bangles features hand-engraved motifs inspired by traditional patterns, each embedded with carefully selected diamonds. Crafted from 99.9% pure silver with rhodium plating for enhanced durability and shine, these bangles represent the perfect fusion of heritage and contemporary elegance. Each piece in this limited collection is individually numbered and comes with a certificate of authenticity. Only 50 sets available worldwide.',
        images: ['product-4-main.jpg', 'product-4-alt1.jpg', 'product-4-alt2.jpg', 'product-4-alt3.jpg'],
        specifications: {
            metal: '99.9% Pure Silver with Rhodium Plating',
            stones: 'IGI Certified Diamonds (2.4 ct total)',
            innerDiameter: '2.4-2.6 inches',
            weight: '45g (set of 3)',
            finish: 'High Polish with Oxidized Details'
        },
        availability: 'Limited Stock',
        sku: 'HER-BNG-004',
        inStock: true,
        lowStock: true,
        limitedEdition: true
    },
    {
        id: 'PROD005',
        name: 'Celestial Pendant',
        category: 'Necklaces',
        collection: 'Contemporary Classics',
        price: 45500,
        originalPrice: 52000,
        currency: '₹',
        rating: 4.5,
        reviews: 128,
        badges: ['Bestseller'],
        shortDescription: 'A delicate pendant featuring a star-burst diamond design.',
        description: 'The Celestial Pendant captures the essence of celestial beauty in miniature form. At its center, a brilliant-cut diamond (0.5ct) radiates outward through a star-burst design accented with smaller diamonds. The pendant hangs from an adjustable pure silver chain with micro-pavé diamond detailing. This versatile piece transitions seamlessly from day to evening, making it a wardrobe essential. The spring ring clasp ensures security, while the lightweight design provides all-day comfort.',
        images: ['product-5-main.jpg', 'product-5-alt1.jpg', 'product-5-alt2.jpg', 'product-5-alt3.jpg'],
        specifications: {
            metal: '99.9% Pure Silver',
            centerStone: 'IGI Certified Diamond 0.5ct',
            accentDiamonds: '16 diamonds (0.3ct total)',
            chainLength: '16-18 inches (adjustable)',
            weight: '4.2g'
        },
        availability: 'In Stock',
        sku: 'CEL-PND-005',
        inStock: true,
        lowStock: false,
        limitedEdition: false
    },
    {
        id: 'PROD006',
        name: 'Royal Statement Ring',
        category: 'Rings',
        collection: 'Signature Collection',
        price: 112000,
        originalPrice: null,
        currency: '₹',
        rating: 5,
        reviews: 41,
        badges: ['New Arrival'],
        shortDescription: 'Bold and brilliant - a statement ring fit for royalty.',
        description: 'Make an unforgettable impression with the Royal Statement Ring. This bold design features a 2-carat cushion-cut center diamond surrounded by a halo of smaller brilliant-cut diamonds, creating maximum sparkle and presence. The split-shank band, adorned with pavé diamonds, adds architectural interest and finger coverage. Crafted in premium 99.9% pure silver with reinforced construction for durability. This ring is for the woman who commands attention and appreciates extraordinary craftsmanship.',
        images: ['product-6-main.jpg', 'product-6-alt1.jpg', 'product-6-alt2.jpg', 'product-6-alt3.jpg'],
        specifications: {
            metal: '99.9% Pure Silver',
            centerStone: 'IGI Certified Diamond 2.0ct (Cushion Cut)',
            haloAndBand: '48 diamonds (1.2ct total)',
            ringSize: '4-10 (Adjustable)',
            weight: '8.5g'
        },
        availability: 'In Stock',
        sku: 'ROY-RNG-006',
        inStock: true,
        lowStock: true,
        limitedEdition: false
    },
    {
        id: 'PROD007',
        name: 'Grace Stud Earrings',
        category: 'Earrings',
        collection: 'Everyday Elegance',
        price: 38500,
        originalPrice: 42000,
        currency: '₹',
        rating: 5,
        reviews: 203,
        badges: ['Bestseller'],
        shortDescription: 'Classic diamond studs - a jewelry box essential.',
        description: 'Every woman needs a pair of perfect diamond studs, and the Grace Stud Earrings deliver timeless elegance. Each earring features a 0.5-carat round brilliant-cut diamond (1 carat total per pair) set in a four-prong martini setting crafted from 99.9% pure silver. The secure screw-back closure ensures your investment is protected. These versatile studs complement any outfit, from business attire to evening wear. IGI certification included with each pair.',
        images: ['product-7-main.jpg', 'product-7-alt1.jpg', 'product-7-alt2.jpg', 'product-7-alt3.jpg'],
        specifications: {
            metal: '99.9% Pure Silver',
            stones: 'IGI Certified Diamonds 1.0ct total (0.5ct each)',
            setting: 'Four-Prong Martini Setting',
            weight: '2.4g (pair)',
            backing: 'Secure Screw-Back Closure'
        },
        availability: 'In Stock',
        sku: 'GRC-STD-007',
        inStock: true,
        lowStock: false,
        limitedEdition: false
    },
    {
        id: 'PROD008',
        name: 'Infinity Tennis Bracelet',
        category: 'Bracelets',
        collection: 'Contemporary Classics',
        price: 156000,
        originalPrice: null,
        currency: '₹',
        rating: 5,
        reviews: 78,
        badges: ['Bestseller', 'Limited Edition'],
        shortDescription: 'An unbroken line of brilliance - the ultimate tennis bracelet.',
        description: 'The Infinity Tennis Bracelet represents the epitome of luxury and sophistication. Featuring an uninterrupted line of 58 perfectly matched round brilliant-cut diamonds (total 8.5 carats), each stone is hand-selected for uniformity and exceptional quality. Set in flexible 99.9% pure silver with a concealed clasp and safety catch, this bracelet wraps your wrist in continuous sparkle. The precision-engineered setting allows each diamond to capture maximum light while ensuring security. A true investment piece that never goes out of style.',
        images: ['product-8-main.jpg', 'product-8-alt1.jpg', 'product-8-alt2.jpg', 'product-8-alt3.jpg'],
        specifications: {
            metal: '99.9% Pure Silver',
            stones: 'IGI Certified Diamonds 8.5ct total (58 stones)',
            length: '7 inches (standard), custom sizing available',
            weight: '28.5g',
            clasp: 'Concealed Box Clasp with Double Safety'
        },
        availability: 'Limited Stock',
        sku: 'INF-TNS-008',
        inStock: true,
        lowStock: true,
        limitedEdition: true
    }
];

// Currency conversion rates (base: INR)
const currencyRates = {
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0095,
    INR: 1
};

// Currency symbols
const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹'
};

// Filter options with counts
const filterOptions = {
    priceRanges: [
        { label: 'Under ₹50,000', min: 0, max: 50000, count: 0 },
        { label: '₹50,000 - ₹75,000', min: 50000, max: 75000, count: 0 },
        { label: '₹75,000 - ₹100,000', min: 75000, max: 100000, count: 0 },
        { label: '₹100,000 - ₹150,000', min: 100000, max: 150000, count: 0 },
        { label: 'Above ₹150,000', min: 150000, max: Infinity, count: 0 }
    ],
    categories: [
        { value: 'Necklaces', label: 'Necklaces', count: 0 },
        { value: 'Rings', label: 'Rings', count: 0 },
        { value: 'Earrings', label: 'Earrings', count: 0 },
        { value: 'Bracelets', label: 'Bracelets', count: 0 }
    ],
    collections: [
        { value: 'Signature Collection', label: 'Signature Collection', count: 0 },
        { value: 'Bridal Collection', label: 'Bridal Collection', count: 0 },
        { value: 'Heritage Series', label: 'Heritage Series', count: 0 },
        { value: 'Contemporary Classics', label: 'Contemporary Classics', count: 0 },
        { value: 'Lumière Collection', label: 'Lumière Collection', count: 0 },
        { value: 'Everyday Elegance', label: 'Everyday Elegance', count: 0 }
    ],
    availability: [
        { value: 'In Stock', label: 'In Stock', count: 0 },
        { value: 'Limited Stock', label: 'Limited Stock', count: 0 }
    ]
};

// Calculate filter counts
function calculateFilterCounts() {
    // Reset counts
    filterOptions.priceRanges.forEach(range => range.count = 0);
    filterOptions.categories.forEach(cat => cat.count = 0);
    filterOptions.collections.forEach(col => col.count = 0);
    filterOptions.availability.forEach(avail => avail.count = 0);
    
    // Count products
    products.forEach(product => {
        // Price ranges
        filterOptions.priceRanges.forEach(range => {
            if (product.price >= range.min && product.price < range.max) {
                range.count++;
            }
        });
        
        // Categories
        const category = filterOptions.categories.find(cat => cat.value === product.category);
        if (category) category.count++;
        
        // Collections
        const collection = filterOptions.collections.find(col => col.value === product.collection);
        if (collection) collection.count++;
        
        // Availability
        const availability = filterOptions.availability.find(avail => avail.value === product.availability);
        if (availability) availability.count++;
    });
}

// Initialize filter counts
calculateFilterCounts();

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products, filterOptions, currencyRates, currencySymbols };
}