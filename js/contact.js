/**
 * A Pleasure To Walk - Dog Walking Business Website
 * Contact Form Handling
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact form initialized');
    
    // Initialize contact form
    initializeContactForm();
});

/**
 * Initialize the contact form
 * Sets up event listeners and validation
 */
function initializeContactForm() {
    // Get form elements
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-contact');
    
    // Check if the form elements exist
    if (!contactForm || !submitButton) {
        console.error('Contact form elements not found');
        return;
    }
    
    // Add event listener for form inputs to enable/disable submit button
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('change', validateContactForm);
        input.addEventListener('input', validateContactForm);
    });
    
    // Add event listener for submit button
    submitButton.addEventListener('click', function() {
        // Validate the form one more time
        if (validateContactForm()) {
            // Submit the form (in a real implementation, this would send the data to a server)
            submitContactForm();
        }
    });
    
    console.log('Contact form event listeners initialized');
}

/**
 * Validate the contact form
 * @returns {boolean} Whether the form is valid
 */
function validateContactForm() {
    // Get form elements
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-contact');
    
    // Check if the form elements exist
    if (!contactForm || !submitButton) {
        return false;
    }
    
    // Get required inputs
    const requiredInputs = contactForm.querySelectorAll('[required]');
    
    // Check if all required fields are filled
    let isValid = true;
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
        }
    });
    
    // Additional validation for email
    const emailInput = document.getElementById('contact-email');
    if (emailInput && emailInput.value && !window.utils.isValidEmail(emailInput.value)) {
        isValid = false;
    }
    
    // Additional validation for phone (if provided)
    const phoneInput = document.getElementById('contact-phone');
    if (phoneInput && phoneInput.value && !window.utils.isValidPhone(phoneInput.value)) {
        isValid = false;
    }
    
    // Enable/disable the submit button based on validation
    if (submitButton) {
        submitButton.disabled = !isValid;
    }
    
    return isValid;
}

/**
 * Submit the contact form
 * In a real implementation, this would send the data to a server
 */
function submitContactForm() {
    // Get form values
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const phone = document.getElementById('contact-phone').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    
    // Create message object
    const contactMessage = {
        name,
        email,
        phone,
        subject,
        message,
        timestamp: new Date().toISOString()
    };
    
    // In a real implementation, we would send this data to a server
    // For this demo, we'll just log it and show a success message
    console.log('Contact form submitted:', contactMessage);
    
    // Show loading state
    const submitButton = document.getElementById('submit-contact');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
    }
    
    // Simulate server request with a delay
    setTimeout(function() {
        // Show success message
        showContactConfirmation();
        
        // Reset button state
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        }
    }, 1500);
}

/**
 * Show confirmation message after form submission
 */
function showContactConfirmation() {
    // Get the contact form container
    const formContainer = document.querySelector('.contact-form-container');
    
    // Check if the element exists
    if (!formContainer) {
        return;
    }
    
    // Store original content to restore later
    const originalContent = formContainer.innerHTML;
    
    // Replace with confirmation message
    formContainer.innerHTML = `
        <div class="text-center">
            <i class="fas fa-check-circle confirmation-icon"></i>
            <h3>Message Sent!</h3>
            <p class="lead">Thank you for contacting A Pleasure To Walk.</p>
            <p>We've received your message and will get back to you as soon as possible.</p>
            <button type="button" id="new-message" class="btn btn-primary mt-3">Send Another Message</button>
        </div>
    `;
    
    // Add event listener for new message button
    const newMessageButton = document.getElementById('new-message');
    if (newMessageButton) {
        newMessageButton.addEventListener('click', function() {
            // Restore original form
            formContainer.innerHTML = originalContent;
            
            // Reinitialize the form
            initializeContactForm();
        });
    }
    
    // Show notification
    window.utils.showNotification('Your message has been sent successfully!', 'success');
}
