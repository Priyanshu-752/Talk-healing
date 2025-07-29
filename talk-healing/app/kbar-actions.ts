export const actions = [
  {
    id: 'home',
    name: 'Go to Home',
    shortcut: ['h'],
    keywords: 'homepage start main',
    perform: () => window.location.href = '/',
  },
  {
    id: 'profile',
    name: 'Go to Profile',
    shortcut: ['p'],
    keywords: 'user account profile',
    perform: () => window.location.href = '/profile',
  },
  {
    id: 'logout',
    name: 'Logout',
    shortcut: ['l'],
    keywords: 'signout',
    perform: () => alert('Logging out...'),
  },
];
