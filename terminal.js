document.addEventListener('DOMContentLoaded', function() {
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
    
function initInteractiveTerminal() {
        const terminalContent = document.querySelector('.terminal-content');
        
        const commandResponses = {
            'help': 'Available commands: help, ls, cat, clear, whoami, date, echo, exit',
            'ls': 'cv.pdf\nprojects.txt\nskills.json\neducation.md',
            'cat': 'Usage: cat [filename] - Please specify a file to display',
            'cat cv.pdf': 'Error: Binary file cannot be displayed in terminal',
            'cat projects.txt': 'Household Manager\nPortfolio Website\nDiscord Bot\nPhotography Website',
            'cat skills.json': '{\n  "languages": ["C#", "Python", "JavaScript", "HTML", "CSS"],\n  "frameworks": ["ASP.NET Web-API"],\n  "tools": ["Git", "GitHub", "GitLab", "VS Code"]\n}',
            'cat education.md': '# Education\n\n- Berufsfachschule BBB Baden (2023-2027)\n- Kantonsschule Baden (2023-2027)\n- Bezirksschule Brugg (2020-2023)',
            'whoami': '@bettercallmilan',
            'clear': 'CLEAR',
            'exit': 'Redirecting to portfolio...'
        };
        
        terminalContent.innerHTML = `<div class="terminal-line">Welcome to Milan's Terminal. Type 'help' for available commands.</div>`;
        addNewCommandLine();
        
        let commandHistory = [];
        let historyIndex = -1;
        let currentInput = '';
        
        terminalContent.addEventListener('click', function() {
            const inputField = document.querySelector('.terminal-input');
            if (inputField) {
                inputField.focus();
            }
        });
        
        setTimeout(() => {
            const initialCommand = 'help';
            simulateTyping(initialCommand, function() {
                executeCommand(initialCommand);
            });
        }, 500);
        
        function simulateTyping(text, callback) {
            const inputField = document.querySelector('.terminal-input');
            if (!inputField) return;
            
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    inputField.value += text[i];
                    i++;
                } else {
                    clearInterval(typeInterval);
                    if (callback) callback();
                }
            }, 100);
        }
        
        function addNewCommandLine() {
            const line = document.createElement('div');
            line.className = 'terminal-line command-line';
            line.innerHTML = `<span class="prompt">$ </span><input type="text" class="terminal-input" autocomplete="off" spellcheck="false">`;
            terminalContent.appendChild(line);
            
            const inputField = line.querySelector('.terminal-input');
            inputField.focus();
            
            inputField.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const command = inputField.value.trim();
                    inputField.disabled = true;
                    executeCommand(command);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    navigateHistory('up');
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    navigateHistory('down');
                }
            });
            
            terminalContent.scrollTop = terminalContent.scrollHeight;
            inputField.focus();
        }
        
        function navigateHistory(direction) {
            const inputField = document.querySelector('.terminal-input:not([disabled])');
            if (!inputField || commandHistory.length === 0) return;
            
            if (direction === 'up' && historyIndex < commandHistory.length - 1) {
                historyIndex++;
            } else if (direction === 'down' && historyIndex >= 0) {
                historyIndex--;
            }
            
            if (historyIndex >= 0 && historyIndex < commandHistory.length) {
                inputField.value = commandHistory[commandHistory.length - 1 - historyIndex];
            } else {
                inputField.value = '';
            }
        }
        
        function executeCommand(command) {
            if (command) {
                commandHistory.push(command);
            }
            historyIndex = -1;
            
            const cmdParts = command.trim().split(' ');
            const baseCmd = cmdParts[0].toLowerCase();
            const args = cmdParts.slice(1).join(' ');
            
            let response = '';
            if (command === '') {
            } else if (baseCmd === 'cat' && args) {
                const fullCmd = `${baseCmd} ${args}`;
                response = commandResponses[fullCmd] || `Error: File '${args}' not found`;
            } else if (baseCmd === 'date') {
                const now = new Date();
                response = now.toISOString().replace('T', ' ').substring(0, 19);
            } else if (baseCmd === 'echo') {
                response = args;
            } else if (commandResponses[baseCmd]) {
                response = commandResponses[baseCmd];
            } else {
                response = `Command not found: ${command}. Type 'help' for available commands.`;
            }
            
            if (baseCmd === 'clear') {
                terminalContent.innerHTML = '';
            } else if (response && baseCmd !== 'exit') {
                const responseLines = response.split('\n');
                for (const line of responseLines) {
                    const responseLine = document.createElement('div');
                    responseLine.className = 'terminal-line';
                    responseLine.textContent = line;
                    terminalContent.appendChild(responseLine);
                }
            }
            
            if (baseCmd === 'exit') {
                const exitLine = document.createElement('div');
                exitLine.className = 'terminal-line';
                exitLine.textContent = 'Redirecting to portfolio...';
                terminalContent.appendChild(exitLine);
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
                return;
            }
            
            addNewCommandLine();
        }
    }
    
    updateTimestamp();
    initInteractiveTerminal();
});