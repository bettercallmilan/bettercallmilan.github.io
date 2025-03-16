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

function updateTimestamp() {
    const timestampElement = document.getElementById('timestamp');
    
    function formatDateCET(date) {
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
    
    timestampElement.textContent = formatDateCET(new Date());
    
    setInterval(() => {
        timestampElement.textContent = formatDateCET(new Date());
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    updateTimestamp();
});