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