import React from 'react';
import type { DurableArticle } from '../types';

interface DurableArticleTableProps {
  articles: DurableArticle[];
  onEdit: (article: DurableArticle) => void;
  onDelete: (id: string) => void;
  onView: (article: DurableArticle) => void;
  selectedIds: Set<string>;
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const DurableArticleTable: React.FC<DurableArticleTableProps> = ({
  articles,
  onEdit,
  onDelete,
  onView,
  selectedIds,
  setSelectedIds,
}) => {
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPageIds = articles.map(a => a.id);
    if (e.target.checked) {
      setSelectedIds(prev => new Set([...prev, ...currentPageIds]));
    } else {
      setSelectedIds(prev => {
        const newSet = new Set(prev);
        currentPageIds.forEach(id => newSet.delete(id));
        return newSet;
      });
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  
  const isPageFullySelected = articles.length > 0 && articles.every(a => selectedIds.has(a.id));

  if (articles.length === 0) {
    return <div className="text-center py-10 text-slate-500 dark:text-slate-400">ไม่พบข้อมูลครุภัณฑ์</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-blue-50 dark:bg-slate-700/50">
          <tr>
            <th className="px-4 py-3 text-center w-12">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                onChange={handleSelectAll}
                checked={isPageFullySelected}
                aria-label="Select all items on this page"
              />
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">ชื่อชนิดครุภัณฑ์</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">รหัสครุภัณฑ์</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">ที่ตั้ง</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">ราคา (บาท)</th>
            <th className="px-4 py-3 text-center text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">จัดการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {articles.map((article) => (
            <tr
              key={article.id}
              className="hover:bg-blue-50/50 dark:hover:bg-slate-700/50 transition duration-150 cursor-pointer"
              onClick={() => onView(article)}
            >
              <td className="px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                  checked={selectedIds.has(article.id)}
                  onChange={() => handleSelectOne(article.id)}
                  aria-label={`Select ${article.name}`}
                />
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="font-medium text-slate-900 dark:text-slate-100">{article.name}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{article.category}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{article.articleId}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{article.location}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400 text-right">
                {article.pricePerUnit !== '' ? article.pricePerUnit.toLocaleString('th-TH', { minimumFractionDigits: 2 }) : '-'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => onEdit(article)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    aria-label={`Edit ${article.name}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.885L17.5 5.5a2.121 2.121 0 0 0-3-3L3.58 13.42a4 4 0 0 0-.885 1.343Z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(article.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400"
                    aria-label={`Delete ${article.name}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.58.22-2.365.468a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193v-.443A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DurableArticleTable;