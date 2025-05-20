function setThemeBySystemPreference() {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (prefersDarkMode) {
        body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    } else {
        body.classList.remove('dark-mode');
        themeIcon.textContent = '🌙';
    }
}

function listenForSystemThemeChanges() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', setThemeBySystemPreference);
}

document.addEventListener('DOMContentLoaded', function() {
    updateTimestamp();
    
    setThemeBySystemPreference();
    listenForSystemThemeChanges();
    
    const typingTextElement = document.getElementById('typing-text');
    if (typingTextElement) {
        typeWithUsername(typingTextElement);
    }
});

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
        const cetDate = new Date(utcDate.getTime() + (60 * 60 * 2000));
        
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

function typeWithUsername(element) {
    
    element.textContent = '';
    
    setTimeout(() => startTyping(), 500);
    
    function startTyping() {

        const initialText = "Hi, I'm @bettercallmilan";
        const finalText = "Hi, I'm Milan Jankovic";
        let i = 0;
        
        function typePhase1() {
            if (i < initialText.length) {
                element.textContent = initialText.substring(0, i + 1);
                i++;
                setTimeout(typePhase1, 70);
            } else {
                setTimeout(() => {
                    const deletePos = "Hi, I'm ".length;
                    backspace(initialText, deletePos);
                }, 1000);
            }
        }
        
        function backspace(text, targetPos) {
            if (i > targetPos) {
                element.textContent = text.substring(0, i - 1);
                i--;
                setTimeout(() => backspace(text, targetPos), 50);
            } else {
                setTimeout(() => {
                    typeFinalName(targetPos);
                }, 100);
            }
        }
        
        function typeFinalName(startPos) {
            const nameToType = finalText.substring(startPos);
            let j = 0;
            
            function typeName() {
                if (j < nameToType.length) {
                    element.textContent = finalText.substring(0, startPos) + nameToType.substring(0, j + 1);
                    j++;
                    setTimeout(typeName, 70);
                } else {
                    setTimeout(() => {
                        element.classList.add('typing-done');
                    }, 400);
                }
            }
            
            typeName();
        }
        
        typePhase1();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    updateTimestamp();
    
    const typingTextElement = document.getElementById('typing-text');
    typeWithUsername(typingTextElement);
    
});

document.addEventListener('DOMContentLoaded', function() {
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');
  
  mobileNavToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    this.classList.toggle('active');
    nav.classList.toggle('active');
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNavToggle.setAttribute('aria-expanded', 'false');
      mobileNavToggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });
  
  document.addEventListener('click', function(event) {
    if (nav.classList.contains('active') && 
        !nav.contains(event.target) && 
        !mobileNavToggle.contains(event.target)) {
      mobileNavToggle.setAttribute('aria-expanded', 'false');
      mobileNavToggle.classList.remove('active');
      nav.classList.remove('active');
    }
  });
});