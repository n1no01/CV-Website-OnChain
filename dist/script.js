const input = document.getElementById('terminal-input');
const output = document.getElementById('terminal-output');

let commandHistory = [];
let historyIndex = -1;

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value.trim().toLowerCase();
        if (cmd) {
            commandHistory.push(input.value.trim());
            historyIndex = commandHistory.length;
        }
        processCommand(cmd);
        input.value = '';
    } else if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        }
        e.preventDefault();
    } else if (e.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            input.value = '';
        }
        e.preventDefault();
    }
});

function processCommand(rawCmd) {
    const parts = rawCmd.split(' ');
    const cmd = parts[0];

    let response = "";

    switch(cmd) {
        case 'help':
            response = `Available commands:
  • about       - Quick intro about me
  • projects    - List of all projects with quick links
  • skills      - Overview of technical competencies
  • education   - University information
  • contact     - Direct communication channels
  • cv          - Direct link to official CV
  • clear       - Clears the terminal output`;
            break;

        case 'about':
            response = "I'm Nino Herenda, a software engineer and student from Sarajevo. Focused on building robust web applications, Web3 infrastructure, and custom SEO solutions.";
            break;

        case 'projects':
            response = `Featured Projects:
  1. AEO Audit Pro -> https://aeoaudit-pro.com/
  2. GeoLock -> https://terenska-evidencija.vercel.app/
  3. MindVault -> https://aucs2-4yaaa-aaaab-abqba-cai.icp0.io/
  4. GarfieldCoin -> https://jnyc6-7yaaa-aaaak-qunkq-cai.icp.net
  5. Elite Bounce Tracking -> https://elitebounce-w1w.caffeine.xyz/
  6. ICP Lucky Draw -> https://icp-lucky-draw-d8c.caffeine.xyz/`;
            break;

        case 'skills':
            response = `Technical Matrix:
  - Core: JavaScript, C++, C#, HTML/CSS, REST APIs, SQL, OOP
  - Web3: Internet Computer (ICP), Motoko, Smart Contracts
  - Growth: Technical SEO, Answer Engine Optimization (AEO)`;
            break;

        case 'education':
            response = "Faculty of Information Technologies (FIT) Mostar — 3rd year Software Engineering student.";
            break;

        case 'contact':
            response = "Email: ninogor@gmail.com | LinkedIn: https://linkedin.com/in/nino-herenda/ | GitHub: https://github.com/n1no01";
            break;

        case 'cv':
            response = "Access my curriculum vitae directly here: https://ninoherenda.com/Nino_Herenda_CV.pdf";
            break;

        case 'clear':
            output.innerHTML = "NinoOS v2.1.0 [Type 'help' to explore system commands]";
            return;

        case 'sudo':
            response = "Access denied: Administrative privileges not authorized for external user session.";
            break;

        case '':
            return;

        default:
            response = `Unknown command: '${rawCmd}'. Type 'help' to list available commands.`;
    }

    output.innerHTML += `<br><span style="color: #ffffff;">> ${rawCmd}</span><br>${formatLinks(escapeHtml(response))}`;
    output.scrollTop = output.scrollHeight;
}

// Sigurnosna HTML zaštita uz automatsko pretvaranje URL-ova u klikabilne linkove
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");
}

function formatLinks(htmlText) {
    const urlRegex = /(https?:\/\/[^\s<]+)/g;
    return htmlText.replace(urlRegex, (url) => {
        return `<a href="${url}" target="_blank" rel="noopener">${url} ↗</a>`;
    });
}