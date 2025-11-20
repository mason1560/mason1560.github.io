// JavaScript for Mason Anderson's Website
// Add any interactive functionality here

// Function to handle image loading errors
function handleImageError(img) {
    const basePaths = ['../images/IMG_E0361[1]', '../images/IMG_E0361'];
    const formats = ['png', 'jpg', 'jpeg', 'webp', 'PNG', 'JPG', 'JPEG'];
    const currentSrc = img.src || '';
    
    // Extract current base path and format
    let currentBasePath = '';
    let currentFormat = '';
    
    if (currentSrc) {
        // Check which base path was used
        if (currentSrc.includes('[1]')) {
            currentBasePath = '../images/IMG_E0361[1]';
        } else {
            currentBasePath = '../images/IMG_E0361';
        }
        
        // Extract format
        const match = currentSrc.match(/\.(png|jpg|jpeg|webp|PNG|JPG|JPEG)$/i);
        if (match) {
            currentFormat = match[1];
        }
    }
    
    // Determine which base path to use
    let basePathIndex = basePaths.indexOf(currentBasePath);
    if (basePathIndex === -1) basePathIndex = 0;
    
    // Find current format index
    let formatIndex = formats.indexOf(currentFormat);
    if (formatIndex === -1) formatIndex = -1;
    
    // Try next format with current base path
    if (formatIndex < formats.length - 1) {
        img.src = basePaths[basePathIndex] + '.' + formats[formatIndex + 1];
    } else if (basePathIndex === 0) {
        // Try other base path
        img.src = basePaths[1] + '.png';
    } else {
        // All formats failed - keep placeholder visible
        const placeholder = document.getElementById('image-placeholder');
        if (placeholder) {
            placeholder.style.display = 'flex';
        }
        img.style.display = 'none';
    }
}

// Function to try loading image with different extensions (legacy name for compatibility)
function tryNextImageFormat(img) {
    handleImageError(img);
}

// Initialize profile photo on page load
document.addEventListener('DOMContentLoaded', function() {
    // Try to load profile photo
    const profilePhoto = document.getElementById('profile-photo');
    const placeholder = document.getElementById('image-placeholder');
    
    if (profilePhoto) {
        // When image loads successfully, hide placeholder
        profilePhoto.onload = function() {
            if (placeholder) {
                placeholder.style.display = 'none';
            }
            this.style.display = 'block';
        };
        
        // Start with PNG format (most likely after conversion)
        // Try the [1] version first since that's what Windows created
        profilePhoto.src = '../images/IMG_E0361[1].png';
    }
    
    // Add smooth scrolling to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add any other interactive features here
    console.log('Mason Anderson\'s website loaded successfully!');
});

