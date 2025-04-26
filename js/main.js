/**
 * A Pleasure To Walk - Dog Walking Business Website
 * Main JavaScript File
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('A Pleasure To Walk website initialized');
    
    // Initialize all components
    initializeCarousel();
    initializeAnimations();
    
    // Set current year in footer copyright
    document.querySelector('.copyright').innerHTML = `© ${new Date().getFullYear()} A Pleasure To Walk. All rights reserved.`;
});

/**
 * Initialize the dog image carousel
 * Creates 10 carousel items with dog walking images
 */
function initializeCarousel() {
    const carouselInner = document.querySelector('#dogCarousel .carousel-inner');
    
    // Clear existing content
    carouselInner.innerHTML = '';
    
    // Image descriptions for alt text
    const imageDescriptions = [
        'Golden Retriever enjoying a walk in the park',
        'Professional dog walker with two dogs on leashes',
        'Happy Labrador running in an open field',
        'Small dog walking on a forest trail',
        'Dog walker and Border Collie crossing a bridge',
        'Beagle exploring a neighborhood path',
        'Group of dogs on a social walk together',
        'Husky enjoying an extended walk in nature',
        'Dog walker giving water to a thirsty dog',
        'Sunset walk with a happy dog and owner'
    ];
    
    // Create 10 carousel items
    for (let i = 1; i <= 10; i++) {
        const isActive = i === 1 ? 'active' : '';
        const item = document.createElement('div');
        item.className = `carousel-item ${isActive}`;
        
        // Check if the image exists, otherwise use a placeholder
        const imgPath = `images/carousel/dog${i}.jpg`;
        
        // Create image element with fallback to placeholder
        const imgElement = document.createElement('img');
        imgElement.className = 'carousel-image d-block w-100';
        imgElement.alt = imageDescriptions[i-1];
        imgElement.src = imgPath;
        
        // Add error handler to show placeholder if image doesn't load
        imgElement.onerror = function() {
            this.onerror = null; // Prevent infinite loop
            this.parentNode.innerHTML = `
                <div class="carousel-placeholder">
                    <i class="fas fa-dog"></i>
                    <p>Dog Image ${i}</p>
                </div>
            `;
        };
        
        item.appendChild(imgElement);
        carouselInner.appendChild(item);
    }
    
    console.log('Carousel initialized with dog walking images');
}

/**
 * Initialize animations for elements with the fade-in class
 * Uses Intersection Observer to trigger animations when elements come into view
 */
function initializeAnimations() {
    // Get all elements with the fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is in the viewport
            if (entry.isIntersecting) {
                // Add the visible class to trigger the animation
                entry.target.classList.add('visible');
                // Unobserve the element after it's animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // Use the viewport as the root
        threshold: 0.1, // Trigger when at least 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element comes into view
    });
    
    // Observe each fade-in element
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    console.log('Animations initialized for', fadeElements.length, 'elements');
}

/**
 * Utility function to format currency
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-NZ', {
        style: 'currency',
        currency: 'NZD',
        minimumFractionDigits: 2
    }).format(amount);
}

/**
 * Utility function to format dates
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('en-NZ', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

/**
 * Utility function to validate email addresses
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Utility function to validate phone numbers
 * @param {string} phone - The phone number to validate
 * @returns {boolean} Whether the phone number is valid
 */
function isValidPhone(phone) {
    // Validation for New Zealand phone numbers
    // Supports formats:
    // - Mobile: 02x xxx xxxx (10 digits starting with 02)
    // - Landline: 0x xxx xxxx (9 digits starting with 0)
    // - Extended numbers: up to 11 digits for special services
    // - International format: +64 xx xxx xxxx
    
    // Remove spaces, dashes, and parentheses
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    // Check for NZ mobile (02x)
    const mobileRegex = /^02\d{8,9}$/;
    
    // Check for NZ landline and other numbers (0x)
    const landlineRegex = /^0\d{8,10}$/;
    
    // Check for international format (+64)
    const intlRegex = /^\+64\d{8,10}$/;
    
    return mobileRegex.test(cleanPhone) || landlineRegex.test(cleanPhone) || intlRegex.test(cleanPhone);
}

/**
 * Utility function to show a notification message
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, info)
 * @param {number} duration - How long to show the notification in ms
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Check if notification container exists, create if not
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
        
        // Add styles for the notification container
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.top = '20px';
        notificationContainer.style.right = '20px';
        notificationContainer.style.zIndex = '1000';
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message;
    
    // Add styles for the notification
    notification.style.backgroundColor = type === 'success' ? '#4CAF50' : 
                                        type === 'error' ? '#F44336' : '#2196F3';
    notification.style.color = 'white';
    notification.style.padding = '12px 20px';
    notification.style.marginBottom = '10px';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease';
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after duration
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// Export utility functions for use in other modules
window.utils = {
    formatCurrency,
    formatDate,
    isValidEmail,
    isValidPhone,
    showNotification
};
