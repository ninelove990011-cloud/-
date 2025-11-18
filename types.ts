
export interface DurableArticle {
  id: string;
  category: string;
  name: string;
  acquisitionDate: {
    day: string;
    month: string;
    year: string;
  };
  articleId: string;
  brandModel: string;
  registrationNumber: string;
  pricePerUnit: number | '';
  acquisitionMethod: string;
  acquisitionDocNumber: string;
  location: string;
  disbursementProof: string;
  changeLog: string;
  changeDocNumber: string;
  remarks: string;
  images: string[];
}
