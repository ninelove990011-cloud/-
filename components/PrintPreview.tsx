import React from 'react';
import type { DurableArticle } from '../types';

interface PrintPreviewProps {
  articles: DurableArticle[];
  onClose: () => void;
}

const PrintPreview: React.FC<PrintPreviewProps> = ({ articles, onClose }) => {
  const handlePrint = () => {
    const printContent = document.getElementById('print-area');
    const windowUrl = 'about:blank';
    const uniqueName = new Date().getTime();
    const windowName = 'Print' + uniqueName;
    
    const printWindow = window.open(windowUrl, windowName, 'left=50000,top=50000,width=0,height=0');

    if (printWindow && printContent) {
        const tailwindStyles = Array.from(document.head.getElementsByTagName('script')).find(s => s.src.includes('tailwindcss.com'));
        
        printWindow.document.write('<html><head><title>รายงานครุภัณฑ์</title>');
        if (tailwindStyles) {
            printWindow.document.write('<script src="https://cdn.tailwindcss.com"><\/script>');
        }
        printWindow.document.write('<style>@page { size: A4; margin: 20mm; } body { -webkit-print-color-adjust: exact; font-family: "Sarabun", sans-serif; }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500); // Wait for styles to load
    }
  };

  return (
    <div>
        <div id="print-area" className="prose max-w-none prose-sm">
            <h1 className="text-xl font-bold mb-4 text-center">รายงานทะเบียนครุภัณฑ์</h1>
            {articles.map((article, index) => (
                <div key={article.id} className="p-4 border rounded-lg mb-4 break-inside-avoid bg-white shadow-sm">
                    <h2 className="text-lg font-semibold text-blue-800 border-b pb-2 mb-2">
                        {index + 1}. {article.name} (รหัส: {article.articleId})
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                        <div><strong>ประเภท:</strong> {article.category}</div>
                        <div><strong>ยี่ห้อ/ชนิด:</strong> {article.brandModel}</div>
                        <div><strong>วันที่ได้มา:</strong> {article.acquisitionDate.day} {article.acquisitionDate.month} {article.acquisitionDate.year}</div>
                        <div><strong>ราคา:</strong> {article.pricePerUnit !== '' ? article.pricePerUnit.toLocaleString('th-TH') : '-'} บาท</div>
                        <div><strong>ที่ตั้ง:</strong> {article.location}</div>
                        <div><strong>เลขทะเบียน:</strong> {article.registrationNumber}</div>
                        <div className="col-span-full"><strong>วิธีการได้มา:</strong> {article.acquisitionMethod} (เอกสารเลขที่ {article.acquisitionDocNumber})</div>
                        <div className="col-span-full"><strong>รายการเปลี่ยนแปลง:</strong> {article.changeLog} (เอกสารเลขที่ {article.changeDocNumber})</div>
                    </div>
                     {article.images.length > 0 && (
                        <div className="mt-4">
                            <h3 className="font-semibold mb-2">รูปภาพประกอบ:</h3>
                            <div className="flex gap-4">
                                {article.images.map((img, i) => (
                                    <img key={i} src={img} alt={`Image ${i+1}`} className="w-32 h-32 object-cover border rounded"/>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
        <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button onClick={onClose} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-100 dark:hover:bg-slate-500">
                ปิด
            </button>
            <button onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.066.74.18 1.085.337a.75.75 0 0 1 .53 1.03-4.502 4.502 0 0 1-.295 4.342c-.297.433-.71.82-1.18 1.142A4.479 4.479 0 0 1 12.5 16h-5a4.479 4.479 0 0 1-2.975-1.139c-.47-.322-.883-.71-1.18-1.142a4.502 4.502 0 0 1-.295-4.342.75.75 0 0 1 .53-1.03c.346-.156.708-.27 1.085-.337V2.75Zm6.5 0h-5v3.25a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V2.75h-1.5v3.552c.553.12 1.074.34 1.558.63a3.001 3.001 0 0 1 7.384 0c.484-.29.996-.51 1.558-.63V2.75h-1.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V2.75Z" clipRule="evenodd" />
                    <path d="M4.5 10.25a.75.75 0 0 0 0 1.5h11a.75.75 0 0 0 0-1.5h-11Z" />
                </svg>
                <span>พิมพ์</span>
            </button>
        </div>
    </div>
  );
};

export default PrintPreview;