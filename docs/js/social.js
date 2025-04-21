/**
 * A Pleasure To Walk - Dog Walking Business Website
 * Social Media Integration
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Social media integration initialized');
    
    // Initialize social sharing functionality
    initializeSocialSharing();
    
    // Set up social media feed if available
    setupSocialFeed();
});

/**
 * Initialize social sharing functionality
 * Adds click handlers to social sharing buttons
 */
function initializeSocialSharing() {
    // Get all social sharing buttons
    const shareButtons = document.querySelectorAll('.social-share-btn');
    
    // Add click event listener to each button
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get sharing data from data attributes
            const platform = this.getAttribute('data-platform');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            const description = encodeURIComponent(this.getAttribute('data-description') || 'Check out A Pleasure To Walk Dog Walking Services!');
            
            // Create sharing URL based on platform
            let shareUrl = '';
            
            switch (platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${description}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${description}`;
                    break;
                case 'pinterest':
                    const image = encodeURIComponent(this.getAttribute('data-image') || '');
                    shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${description}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${title}&body=${description}%0A%0A${url}`;
                    break;
                default:
                    console.error('Unknown sharing platform:', platform);
                    return;
            }
            
            // Open sharing dialog
            if (platform !== 'email') {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            } else {
                window.location.href = shareUrl;
            }
            
            // Log sharing event
            console.log(`Content shared on ${platform}`);
        });
    });
    
    // Add social sharing buttons to testimonials if they don't exist
    addSocialSharingToTestimonials();
}

/**
 * Add social sharing buttons to testimonials
 */
function addSocialSharingToTestimonials() {
    // Get all testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // Add sharing buttons to each testimonial
    testimonialCards.forEach((card, index) => {
        // Check if sharing buttons already exist
        if (card.querySelector('.social-share-buttons')) {
            return;
        }
        
        // Get testimonial content
        const content = card.querySelector('.testimonial-content').textContent.trim();
        const author = card.querySelector('.testimonial-author').textContent.trim();
        
        // Create sharing buttons container
        const shareContainer = document.createElement('div');
        shareContainer.className = 'social-share-buttons mt-3';
        
        // Add sharing buttons
        shareContainer.innerHTML = `
            <p class="share-text small">Share this testimonial:</p>
            <div class="share-buttons">
                <button class="social-share-btn btn btn-sm" data-platform="facebook" data-description="${content} - ${author}">
                    <i class="fab fa-facebook-f"></i>
                </button>
                <button class="social-share-btn btn btn-sm" data-platform="twitter" data-description="${content} - ${author}">
                    <i class="fab fa-twitter"></i>
                </button>
                <button class="social-share-btn btn btn-sm" data-platform="email" data-description="${content} - ${author}">
                    <i class="fas fa-envelope"></i>
                </button>
            </div>
        `;
        
        // Add styles to the buttons
        const buttons = shareContainer.querySelectorAll('.social-share-btn');
        buttons.forEach(button => {
            button.style.width = '30px';
            button.style.height = '30px';
            button.style.borderRadius = '50%';
            button.style.padding = '0';
            button.style.margin = '0 5px';
            button.style.display = 'inline-flex';
            button.style.justifyContent = 'center';
            button.style.alignItems = 'center';
            button.style.backgroundColor = '#f5f5f5';
            button.style.border = 'none';
            button.style.color = '#333';
            button.style.transition = 'background-color 0.3s ease';
        });
        
        // Add hover effect
        buttons.forEach(button => {
            button.addEventListener('mouseover', function() {
                this.style.backgroundColor = '#4CAF50';
                this.style.color = 'white';
            });
            
            button.addEventListener('mouseout', function() {
                this.style.backgroundColor = '#f5f5f5';
                this.style.color = '#333';
            });
        });
        
        // Add to testimonial card
        card.appendChild(shareContainer);
    });
}

/**
 * Set up social media feed
 * In a real implementation, this would fetch and display social media posts
 */
function setupSocialFeed() {
    // Get the social feed container
    const socialFeedContainer = document.getElementById('social-feed');
    
    // If the container doesn't exist, return
    if (!socialFeedContainer) {
        return;
    }
    
    // In a real implementation, this would fetch social media posts from an API
    // For this demo, we'll just add some placeholder content
    
    // Sample social media posts
    const samplePosts = [
        {
            platform: 'instagram',
            content: 'Beautiful day for a walk with these happy pups! 🐕 #DogWalking #APleasureToWalk',
            image: 'images/carousel/dog1.jpg', // dog1.jpg is lowercase
            date: '2 days ago'
        },
        {
            platform: 'facebook',
            content: 'Meet our newest group walk member, Bella the Beagle! She\'s already made friends with everyone in the pack.',
            image: 'images/carousel/dog2.JPG', // Using uppercase JPG extension
            date: '1 week ago'
        },
        {
            platform: 'instagram',
            content: 'Exploring new trails today with our adventure-loving dogs! 🌲 #DogAdventures #HappyDogs',
            image: 'images/carousel/dog3.JPG', // Using uppercase JPG extension
            date: '2 weeks ago'
        }
    ];
    
    // Create HTML for each post
    let postsHTML = '';
    
    samplePosts.forEach(post => {
        postsHTML += `
            <div class="social-post ${post.platform}-post">
                <div class="social-post-header">
                    <i class="fab fa-${post.platform}"></i>
                    <span class="post-date">${post.date}</span>
                </div>
                <div class="social-post-content">
                    <p>${post.content}</p>
                </div>
                <div class="social-post-image">
                    <img src="${post.image}" alt="Social media post image" class="img-fluid rounded">
                </div>
            </div>
        `;
    });
    
    // Add posts to the container
    socialFeedContainer.innerHTML = postsHTML;
    
    // Add styles to the posts
    const posts = socialFeedContainer.querySelectorAll('.social-post');
    posts.forEach(post => {
        post.style.marginBottom = '20px';
        post.style.padding = '15px';
        post.style.borderRadius = '10px';
        post.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        post.style.backgroundColor = 'white';
    });
    
    // Add styles to post headers
    const headers = socialFeedContainer.querySelectorAll('.social-post-header');
    headers.forEach(header => {
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.marginBottom = '10px';
        header.style.color = '#666';
    });
    
    // Add styles to post content
    const contents = socialFeedContainer.querySelectorAll('.social-post-content');
    contents.forEach(content => {
        content.style.marginBottom = '10px';
    });
    
    // Add styles to post images
    const images = socialFeedContainer.querySelectorAll('.social-post-image img');
    images.forEach(image => {
        image.style.width = '100%';
        image.style.height = 'auto';
        image.style.borderRadius = '5px';
    });
    
    // Add platform-specific styles
    const instagramPosts = socialFeedContainer.querySelectorAll('.instagram-post');
    instagramPosts.forEach(post => {
        post.style.borderLeft = '3px solid #E1306C';
    });
    
    const facebookPosts = socialFeedContainer.querySelectorAll('.facebook-post');
    facebookPosts.forEach(post => {
        post.style.borderLeft = '3px solid #4267B2';
    });
}

/**
 * Update social media links with actual profiles
 * @param {Object} profiles - Object containing social media profile URLs
 */
function updateSocialMediaLinks(profiles) {
    // Get all social media links
    const socialLinks = document.querySelectorAll('.social-icon');
    
    // Update each link with the corresponding profile URL
    socialLinks.forEach(link => {
        // Get the platform from the icon class
        const iconElement = link.querySelector('i');
        if (!iconElement) return;
        
        const iconClass = Array.from(iconElement.classList).find(cls => cls.startsWith('fa-'));
        if (!iconClass) return;
        
        const platform = iconClass.replace('fa-', '');
        
        // Update the link href if a profile URL is provided
        if (profiles[platform]) {
            link.href = profiles[platform];
        }
    });
}

// Example usage:
// updateSocialMediaLinks({
//     'facebook-f': 'https://facebook.com/apleasuretowalk',
//     'instagram': 'https://instagram.com/apleasuretowalk',
//     'twitter': 'https://twitter.com/apleasuretowalk'
// });
