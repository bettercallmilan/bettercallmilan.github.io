function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        themeIcon.textContent = '🌙';
    } else {
        body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    }
}

// Function to update timestamp with current CET time (UTC+1)
function updateTimestamp() {
    const timestampElement = document.getElementById('timestamp');
    
    function formatDateCET(date) {
        // Get UTC time and add 1 hour for CET
        const utcDate = new Date(date);
        const cetDate = new Date(utcDate.getTime() + (60 * 60 * 1000));
        
        const year = cetDate.getUTCFullYear();
        const month = String(cetDate.getUTCMonth() + 1).padStart(2, '0');
        const day = String(cetDate.getUTCDate()).padStart(2, '0');
        const hours = String(cetDate.getUTCHours()).padStart(2, '0');
        const minutes = String(cetDate.getUTCMinutes()).padStart(2, '0');
        const seconds = String(cetDate.getUTCSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} CET`;
    }
    
    // Update timestamp immediately
    timestampElement.textContent = formatDateCET(new Date());
    
    // Update timestamp every second
    setInterval(() => {
        timestampElement.textContent = formatDateCET(new Date());
    }, 1000);
}

// Run timestamp update when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateTimestamp();
});