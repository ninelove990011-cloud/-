import React from 'react';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
}

const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
};

const Modal: React.FC<ModalProps> = ({ title, onClose, children, size = '3xl' }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-10"
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full ${sizeClasses[size]} m-4 overflow-hidden flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700 bg-blue-50 dark:bg-slate-700/50">
          <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300">{title}</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
             </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto" style={{ maxHeight: '80vh' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;