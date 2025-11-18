import React from 'react';
import type { DurableArticle } from '../types';

interface DurableArticleDetailProps {
  article: DurableArticle;
}

const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
    <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</dt>
    <dd className="mt-1 text-sm text-slate-900 dark:text-slate-100 sm:mt-0 sm:col-span-2">{value || '-'}</dd>
  </div>
);


const DurableArticleDetail: React.FC<DurableArticleDetailProps> = ({ article }) => {
  return (
    <div className="text-slate-700 dark:text-slate-200">
      <div>
        <dl>
            <DetailRow label="ประเภทครุภัณฑ์" value={article.category} />
            <DetailRow label="ชื่อชนิดครุภัณฑ์" value={article.name} />
            <DetailRow label="วัน/เดือน/ปี ที่ได้มา" value={`${article.acquisitionDate.day} ${article.acquisitionDate.month} ${article.acquisitionDate.year}`} />
            <DetailRow label="เลขที่รหัสครุภัณฑ์" value={article.articleId} />
            <DetailRow label="ยี่ห้อ, ชนิด" value={article.brandModel} />
            <DetailRow label="หมายเลขทะเบียน" value={article.registrationNumber} />
            <DetailRow label="ราคาต่อหน่วย (บาท)" value={article.pricePerUnit !== '' ? article.pricePerUnit.toLocaleString('th-TH', { minimumFractionDigits: 2 }) : '-'} />
            <DetailRow label="วิธีการได้มา" value={article.acquisitionMethod} />
            <DetailRow label="เลขที่เอกสาร (การได้มา)" value={article.acquisitionDocNumber} />
            <DetailRow label="จุดที่ตั้ง" value={article.location} />
            <DetailRow label="หลักฐานการจ่าย" value={article.disbursementProof} />
            <DetailRow label="รายการเปลี่ยนแปลง" value={article.changeLog} />
            <DetailRow label="เลขที่เอกสาร (การเปลี่ยนแปลง)" value={article.changeDocNumber} />
            <DetailRow label="หมายเหตุ" value={<p className="whitespace-pre-wrap">{article.remarks}</p>} />
        </dl>
      </div>

      {article.images.length > 0 && (
        <div className="mt-6">
          <h3 className="text-base font-medium text-slate-900 dark:text-slate-100 mb-2">รูปภาพประกอบ</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {article.images.map((image, index) => (
              <div key={index} className="relative">
                <a href={image} target="_blank" rel="noopener noreferrer">
                    <img src={image} alt={`preview ${index}`} className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DurableArticleDetail;