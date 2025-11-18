import React from 'react';

type Theme = 'light' | 'dark';

interface ThemeSwitcherProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M10 2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5A.75.75 0 0 1 10 2ZM15.5 4.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 1 .75-.75ZM18 10a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5A.75.75 0 0 1 18 10ZM15.5 15.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 1 .75-.75ZM10 18a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5A.75.75 0 0 1 10 18ZM4.5 15.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 1 .75-.75ZM2 10a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5A.75.75 0 0 1 2 10ZM4.5 4.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 1 .75-.75ZM10 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M7.455 2.104a.75.75 0 0 0-.965.527 8.5 8.5 0 0 0 9.9 9.9.75.75 0 0 0 .527-.965A7 7 0 0 1 10 4.5c0-1.34.46-2.57 1.234-3.513a.75.75 0 0 0-3.78-1.115Z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
};

export default ThemeSwitcher;
