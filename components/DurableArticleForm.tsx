import React, { useState, useEffect } from 'react';
import type { DurableArticle } from '../types';

interface DurableArticleFormProps {
  onSubmit: (article: DurableArticle) => void;
  onCancel: () => void;
  initialData?: DurableArticle | null;
}

const ThaiMonths = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const generateYears = () => {
  const currentBuddhistYear = new Date().getFullYear() + 543;
  const startYear = currentBuddhistYear + 1 - 10; // 2568 - 10 = 2558
  const years = [];
  for (let i = startYear; i <= currentBuddhistYear + 10; i++) {
    years.push(i.toString());
  }
  return years.reverse();
};

const DurableArticleForm: React.FC<DurableArticleFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState<DurableArticle>(
    initialData || {
      id: '',
      category: '',
      name: '',
      acquisitionDate: { day: '1', month: ThaiMonths[0], year: (new Date().getFullYear() + 544).toString() },
      articleId: '',
      brandModel: '',
      registrationNumber: '',
      pricePerUnit: '',
      acquisitionMethod: '',
      acquisitionDocNumber: '',
      location: '',
      disbursementProof: '',
      changeLog: '',
      changeDocNumber: '',
      remarks: '',
      images: [],
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('date-')) {
        const field = name.split('-')[1];
        setFormData(prev => ({
            ...prev,
            acquisitionDate: { ...prev.acquisitionDate, [field]: value }
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            [name]: name === 'pricePerUnit' ? (value === '' ? '' : parseFloat(value)) : value
        }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (formData.images.length + e.target.files.length > 3) {
        alert('สามารถอัปโหลดรูปภาพได้สูงสุด 3 รูป');
        return;
      }

      // FIX: Add explicit type `File` to the `file` parameter in the forEach callback.
      // This helps TypeScript correctly infer the type of `file` as `File` (which is a `Blob`),
      // resolving the error about passing 'unknown' to a function expecting 'Blob'.
      Array.from(e.target.files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, reader.result as string],
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: initialData ? initialData.id : crypto.randomUUID(),
    });
  };

  const years = generateYears();
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  
  const inputStyles = "mt-1 block w-full border border-slate-300 dark:border-slate-600 rounded-md shadow-sm p-2 bg-white dark:bg-slate-700 focus:ring-blue-500 focus:border-blue-500";


  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-slate-700 dark:text-slate-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Form Fields */}
        <div><label className="block text-sm font-medium">ประเภทครุภัณฑ์</label><input type="text" name="category" value={formData.category} onChange={handleChange} className={inputStyles} required /></div>
        <div><label className="block text-sm font-medium">ชื่อชนิดครุภัณฑ์</label><input type="text" name="name" value={formData.name} onChange={handleChange} className={inputStyles} required /></div>
      </div>
      <div>
        <label className="block text-sm font-medium">วัน/เดือน/ปี ที่ได้มา</label>
        <div className="grid grid-cols-3 gap-2 mt-1">
            <select name="date-day" value={formData.acquisitionDate.day} onChange={handleChange} className={inputStyles}>{days.map(d => <option key={d} value={d}>{d}</option>)}</select>
            <select name="date-month" value={formData.acquisitionDate.month} onChange={handleChange} className={inputStyles}>{ThaiMonths.map(m => <option key={m} value={m}>{m}</option>)}</select>
            <select name="date-year" value={formData.acquisitionDate.year} onChange={handleChange} className={inputStyles}>{years.map(y => <option key={y} value={y}>{y}</option>)}</select>
        </div>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium">เลขที่รหัสครุภัณฑ์</label><input type="text" name="articleId" value={formData.articleId} onChange={handleChange} className={inputStyles} /></div>
            <div><label className="block text-sm font-medium">ยี่ห้อ, ชนิด</label><input type="text" name="brandModel" value={formData.brandModel} onChange={handleChange} className={inputStyles} /></div>
            <div><label className="block text-sm font-medium">หมายเลขทะเบียน</label><input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} className={inputStyles} /></div>
            <div><label className="block text-sm font-medium">ราคาต่อหน่วย (บาท)</label><input type="number" name="pricePerUnit" value={formData.pricePerUnit} onChange={handleChange} className={inputStyles} /></div>
            <div><label className="block text-sm font-medium">วิธีการได้มา</label><input type="text" name="acquisitionMethod" value={formData.acquisitionMethod} onChange={handleChange} className={inputStyles} /></div>
            <div><label className="block text-sm font-medium">เลขที่เอกสาร (การได้มา)</label><input type="text" name="acquisitionDocNumber" value={formData.acquisitionDocNumber} onChange={handleChange} className={inputStyles} /></div>
            <div><label className="block text-sm font-medium">จุดที่ตั้ง</label><input type="text" name="location" value={formData.location} onChange={handleChange} className={inputStyles} /></div>
            <div><label className="block text-sm font-medium">หลักฐานการจ่าย</label><input type="text" name="disbursementProof" value={formData.disbursementProof} onChange={handleChange} className={inputStyles} /></div>
            <div><label className="block text-sm font-medium">รายการเปลี่ยนแปลง</label><input type="text" name="changeLog" value={formData.changeLog} onChange={handleChange} className={inputStyles} /></div>
            <div><label className="block text-sm font-medium">เลขที่เอกสาร (การเปลี่ยนแปลง)</label><input type="text" name="changeDocNumber" value={formData.changeDocNumber} onChange={handleChange} className={inputStyles} /></div>
        </div>
        <div>
            <label className="block text-sm font-medium">หมายเหตุ</label>
            <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows={3} className={inputStyles} />
        </div>
        
        {/* Image Upload */}
        <div>
            <label className="block text-sm font-medium">อัปโหลดภาพถ่าย (สูงสุด 3 รูป)</label>
            <div className="mt-2 flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-10 h-10 mb-3 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h5l2 3h6a2 2 0 012 2v8a2 2 0 01-2 2H7z"></path></svg>
                        <p className="mb-2 text-sm text-slate-500 dark:text-slate-400"><span className="font-semibold">คลิกเพื่ออัปโหลด</span> หรือลากไฟล์มาวาง</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">JPEG, PNG, GIF</p>
                    </div>
                    <input type="file" multiple accept="image/jpeg,image/png,image/gif" onChange={handleImageChange} className="hidden" disabled={formData.images.length >= 3}/>
                </label>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                        <img src={image} alt={`preview ${index}`} className="w-full h-32 object-cover rounded-lg" />
                        <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 leading-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4"><path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" /></svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-100 dark:hover:bg-slate-500 transition duration-200">
          ยกเลิก
        </button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow">
          {initialData ? 'บันทึกการเปลี่ยนแปลง' : 'เพิ่มรายการ'}
        </button>
      </div>
    </form>
  );
};

export default DurableArticleForm;