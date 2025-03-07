document.addEventListener('DOMContentLoaded', function() {
    // Update timestamp
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
        
        if (timestampElement) {
            timestampElement.textContent = formatDateCET(new Date());
            
            setInterval(() => {
                timestampElement.textContent = formatDateCET(new Date());
            }, 1000);
        }
    }
    
    // Interactive Terminal
    function initInteractiveTerminal() {
        const terminalContent = document.querySelector('.terminal-content');
        
        // Define command responses
        const commandResponses = {
            'help': 'Available commands: help, ls, cat, status, clear, whoami, date, echo, exit',
            'ls': 'cv.pdf\nprojects.txt\nskills.json\nexperience.md\neducation.md',
            'cat': 'Usage: cat [filename] - Please specify a file to display',
            'cat cv.pdf': 'Error: Binary file cannot be displayed in terminal',
            'cat projects.txt': 'Portfolio Website\nWeather App\nTask Manager',
            'cat skills.json': '{\n  "languages": ["Python", "C#", "JavaScript", "HTML", "CSS"],\n  "frameworks": ["ASP.NET Web-API"],\n  "tools": ["Git", "GitHub", "GitLab", "VS Code"]\n}',
            'cat experience.md': '# Experience\n\n- Frontend Developer at TechCorp Inc. (2023-Present)\n- Web Developer Intern at Digital Solutions Ltd. (2022-2023)',
            'cat education.md': '# Education\n\n- Berufsfachschule BBB Baden (2023-2027)\n- Kantonsschule Baden (2023-2027)\n- Bezirksschule Brugg (2020-2023)',
            'status': 'CV Status: 75% complete\n- Education: Complete\n- Experience: In Progress\n- Skills: Complete\n- Projects: Complete',
            'whoami': '@bettercallmilan',
            'clear': 'CLEAR',
            'exit': 'Redirecting to portfolio...'
        };
        
        // Initialize terminal
        terminalContent.innerHTML = `<div class="terminal-line">Welcome to Milan's Terminal. Type 'help' for available commands.</div>`;
        addNewCommandLine();
        
        let commandHistory = [];
        let historyIndex = -1;
        let currentInput = '';
        
        // Focus on terminal when clicked
        terminalContent.addEventListener('click', function() {
            const inputField = document.querySelector('.terminal-input');
            if (inputField) {
                inputField.focus();
            }
        });
        
        // Simulate initial command
        setTimeout(() => {
            const initialCommand = 'status';
            simulateTyping(initialCommand, function() {
                executeCommand(initialCommand);
            });
        }, 1000);
        
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
            
            // Handle input events
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
            
            // Scroll to bottom
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
            // Add to history if not empty
            if (command) {
                commandHistory.push(command);
            }
            historyIndex = -1;
            
            // Process command
            const cmdParts = command.trim().split(' ');
            const baseCmd = cmdParts[0].toLowerCase();
            const args = cmdParts.slice(1).join(' ');
            
            // Find response
            let response = '';
            if (command === '') {
                // Empty command, no response
            } else if (baseCmd === 'cat' && args) {
                const fullCmd = `${baseCmd} ${args}`;
                response = commandResponses[fullCmd] || `Error: File '${args}' not found`;
            } else if (baseCmd === 'date') {
                const now = new Date();
                response = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
            } else if (baseCmd === 'echo') {
                response = args;
            } else if (commandResponses[baseCmd]) {
                response = commandResponses[baseCmd];
            } else {
                response = `Command not found: ${command}. Type 'help' for available commands.`;
            }
            
            // Handle special commands
            if (baseCmd === 'clear') {
                terminalContent.innerHTML = '';
            } else if (response && baseCmd !== 'exit') {
                // Display response
                const responseLines = response.split('\n');
                for (const line of responseLines) {
                    const responseLine = document.createElement('div');
                    responseLine.className = 'terminal-line';
                    responseLine.textContent = line;
                    terminalContent.appendChild(responseLine);
                }
            }
            
            // Handle exit command
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
            
            // Add new command line
            addNewCommandLine();
        }
    }
    
    // Initialize
    updateTimestamp();
    initInteractiveTerminal();
});