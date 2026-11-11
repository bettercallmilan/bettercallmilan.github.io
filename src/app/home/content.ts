import { IconName } from '../ui/icon.component';

export const projects = [
  { name: 'Purbank', note: 'Group project: Secure E-Banking', url: 'https://purbank.ch' },
  { name: 'EOTIR', note: 'Immersive text-based adventure game', url: 'https://bettercallmilan.github.io/EOTIR/' },
  { name: 'lens', note: 'A site showcasing my photography', url: 'https://bettercallmilan.github.io/lens/' },
];

export const skills: { icon: IconName; title: string; items: string }[] = [
  { icon: 'server', title: 'back end', items: 'C#, .NET, ASP.NET Web API' },
  { icon: 'layout', title: 'front end', items: 'Angular, Fluent UI, JavaScript, HTML, CSS' },
  { icon: 'terminal', title: 'scripting & data', items: 'Python, SQL, PowerShell, databases' },
  { icon: 'branch', title: 'tools', items: 'Git, GitHub, GitLab, VS Code' },
  { icon: 'cloud', title: 'infrastructure', items: 'AWS, TCP/IP' },
  { icon: 'check', title: 'practice', items: 'Debugging, code coverage, UX, Scrum' },
];

export const contacts: { icon: IconName; label: string; url: string }[] = [
  { icon: 'mail', label: 'Email', url: 'mailto:jankovic.milan@proton.me' },
  { icon: 'github', label: 'GitHub', url: 'https://github.com/bettercallmilan' },
  { icon: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/milan--jankovic/' },
  { icon: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/milan.sag/' },
  { icon: 'matrix', label: 'Matrix', url: 'https://matrix.to/#/@milan:hilfikers.com' },
];
