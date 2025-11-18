import React, { useState, useCallback, useEffect } from 'react';
import { DurableArticle } from './types';
import DurableArticleTable from './components/DurableArticleTable';
import DurableArticleForm from './components/DurableArticleForm';
import Modal from './components/Modal';
import PrintPreview from './components/PrintPreview';
import DurableArticleDetail from './components/DurableArticleDetail';
import Pagination from './components/Pagination';
import ThemeSwitcher from './components/ThemeSwitcher';

const initialArticles: DurableArticle[] = [
  {
    id: 'c1b9a7d3-f8a7-4b7e-9e4a-7b3c1a2d4f5e',
    category: 'ครุภัณฑ์สำนักงาน',
    name: 'โต๊ะทำงาน',
    acquisitionDate: { day: '15', month: 'มกราคม', year: '2567' },
    articleId: '7440-001-0001',
    brandModel: 'Steelcase/Series 1',
    registrationNumber: 'กทม.1234',
    pricePerUnit: 5500,
    acquisitionMethod: 'จัดซื้อ',
    acquisitionDocNumber: 'DOC-001/2567',
    location: 'อาคาร 1 ชั้น 2 ห้อง 201',
    disbursementProof: 'เบิกจ่ายตามฎีกา',
    changeLog: 'ไม่มี',
    changeDocNumber: '-',
    remarks: 'สภาพดี',
    images: ['https://picsum.photos/400/300?random=1', 'https://picsum.photos/400/300?random=2'],
  },
  {
    id: 'e2c5b8d4-a9f8-4a6d-8b4e-9d2a1c3b5e6f',
    category: 'ครุภัณฑ์คอมพิวเตอร์',
    name: 'เครื่องคอมพิวเตอร์ All-in-One',
    acquisitionDate: { day: '20', month: 'กุมภาพันธ์', year: '2566' },
    articleId: '7440-005-0012',
    brandModel: 'Dell/OptiPlex 7400',
    registrationNumber: 'กทม.5678',
    pricePerUnit: 25000,
    acquisitionMethod: 'จัดจ้าง',
    acquisitionDocNumber: 'DOC-015/2566',
    location: 'อาคาร 2 ชั้น 3 ห้อง 305',
    disbursementProof: 'เบิกจ่ายตามฎีกา',
    changeLog: 'อัพเกรด RAM 16GB',
    changeDocNumber: 'CHG-001/2567',
    remarks: 'ใช้งานปกติ',
    images: ['https://picsum.photos/400/300?random=3'],
  },
];

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [articles, setArticles] = useState<DurableArticle[]>(initialArticles);
  const [editingArticle, setEditingArticle] = useState<DurableArticle | null>(null);
  const [viewingArticle, setViewingArticle] = useState<DurableArticle | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleAddNew = () => {
    setEditingArticle(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (article: DurableArticle) => {
    setEditingArticle(article);
    setIsFormModalOpen(true);
  };

  const handleView = (article: DurableArticle) => {
    setViewingArticle(article);
    setIsDetailModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) {
      const updatedArticles = articles.filter(article => article.id !== id);
      setArticles(updatedArticles);

      const newTotalPages = Math.ceil(updatedArticles.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      } else if (updatedArticles.length === 0) {
        setCurrentPage(1);
      }

      setSelectedIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleFormSubmit = (article: DurableArticle) => {
    if (editingArticle) {
      setArticles(articles.map(a => (a.id === article.id ? article : a)));
    } else {
       const newArticles = [...articles, article];
       setArticles(newArticles);
       const newTotalPages = Math.ceil(newArticles.length / itemsPerPage);
       setCurrentPage(newTotalPages);
    }
    setIsFormModalOpen(false);
    setEditingArticle(null);
  };
  
  const handlePrint = () => {
    if (selectedIds.size > 0) {
      setIsPrintModalOpen(true);
    } else {
      alert("กรุณาเลือกอย่างน้อยหนึ่งรายการเพื่อพิมพ์");
    }
  };

  const getSelectedArticles = useCallback(() => {
    return articles.filter(a => selectedIds.has(a.id));
  }, [articles, selectedIds]);

  const indexOfLastArticle = currentPage * itemsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };


  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200 bg-blue-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800 dark:text-blue-400">
            ระบบบันทึกข้อมูลทะเบียนครุภัณฑ์
          </h1>
          <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">รายการครุภัณฑ์ทั้งหมด</h2>
            <div className="flex gap-2">
              <button
                onClick={handleAddNew}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                  </svg>
                <span>เพิ่มรายการ</span>
              </button>
              <button
                onClick={handlePrint}
                disabled={selectedIds.size === 0}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 shadow disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.066.74.18 1.085.337a.75.75 0 0 1 .53 1.03-4.502 4.502 0 0 1-.295 4.342c-.297.433-.71.82-1.18 1.142A4.479 4.479 0 0 1 12.5 16h-5a4.479 4.479 0 0 1-2.975-1.139c-.47-.322-.883-.71-1.18-1.142a4.502 4.502 0 0 1-.295-4.342.75.75 0 0 1 .53-1.03c.346-.156.708-.27 1.085-.337V2.75Zm6.5 0h-5v3.25a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V2.75h-1.5v3.552c.553.12 1.074.34 1.558.63a3.001 3.001 0 0 1 7.384 0c.484-.29.996-.51 1.558-.63V2.75h-1.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V2.75Z" clipRule="evenodd" />
                    <path d="M4.5 10.25a.75.75 0 0 0 0 1.5h11a.75.75 0 0 0 0-1.5h-11Z" />
                </svg>
                <span>พิมพ์รายงาน PDF</span>
              </button>
            </div>
          </div>

          <DurableArticleTable
            articles={currentArticles}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
           />
        </div>
      </main>
      
      {isFormModalOpen && (
        <Modal
          title={editingArticle ? 'แก้ไขข้อมูลครุภัณฑ์' : 'เพิ่มข้อมูลครุภัณฑ์'}
          onClose={() => setIsFormModalOpen(false)}
        >
          <DurableArticleForm
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormModalOpen(false)}
            initialData={editingArticle}
          />
        </Modal>
      )}

      {isPrintModalOpen && (
        <Modal
          title="ตัวอย่างก่อนพิมพ์รายงาน"
          onClose={() => setIsPrintModalOpen(false)}
          size="4xl"
        >
          <PrintPreview 
            articles={getSelectedArticles()} 
            onClose={() => setIsPrintModalOpen(false)}
          />
        </Modal>
      )}

      {isDetailModalOpen && viewingArticle && (
        <Modal
          title="รายละเอียดครุภัณฑ์"
          onClose={() => setIsDetailModalOpen(false)}
          size="4xl"
        >
          <DurableArticleDetail article={viewingArticle} />
        </Modal>
      )}

    </div>
  );
};

export default App;