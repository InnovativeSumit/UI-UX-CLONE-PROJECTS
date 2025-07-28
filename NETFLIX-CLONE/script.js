document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('authModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeBtn = document.querySelector('.close-btn');
    const toggleFormLink = document.getElementById('toggle-form-link');
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const confirmPasswordGroup = document.getElementById('confirm-password-group');
    const authForm = document.getElementById('authForm');
    const toggleFormText = document.getElementById('toggle-form-text');
    
    let isSignUp = false;
    
    // Open modal
    openModalBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Toggle between sign in and sign up
    toggleFormLink.addEventListener('click', function() {
        isSignUp = !isSignUp;
        
        if (isSignUp) {
            formTitle.textContent = 'Sign Up';
            submitBtn.textContent = 'Sign Up';
            toggleFormText.innerHTML = 'Already have an account? <span id="toggle-form-link">Sign in now</span>.';
            confirmPasswordGroup.style.display = 'block';
        } else {
            formTitle.textContent = 'Sign In';
            submitBtn.textContent = 'Sign In';
            toggleFormText.innerHTML = 'New to Netflix? <span id="toggle-form-link">Sign up now</span>.';
            confirmPasswordGroup.style.display = 'none';
        }
        
        // Re-attach event listener to the new toggle link
        document.getElementById('toggle-form-link').addEventListener('click', arguments.callee);
    });
    
    // Form submission
    authForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (isSignUp) {
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // In a real app, you would send this to your backend
            console.log('Signing up with:', email, password);
            alert('Account created successfully! You can now sign in.');
            
            // Switch back to sign in after successful sign up
            isSignUp = false;
            formTitle.textContent = 'Sign In';
            submitBtn.textContent = 'Sign In';
            toggleFormText.innerHTML = 'New to Netflix? <span id="toggle-form-link">Sign up now</span>.';
            confirmPasswordGroup.style.display = 'none';
            
            // Clear form
            authForm.reset();
        } else {
            // In a real app, you would send this to your backend
            console.log('Signing in with:', email, password);
            alert('Signed in successfully!');
            
            // Close modal
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Change sign in button to user email
            openModalBtn.textContent = email;
        }
    });
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = '#000';
        } else {
            navbar.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});