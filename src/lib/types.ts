export type JobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  data: string;
  relevanceScore: number;
  daysAgo: number;
};

export type TChildren = {
  children: React.ReactNode;
};

export type ExtendedJobItem = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  location: string;
  salary: string;
  coverImgURL: string;
  companyURL: string;
};

export type PageDirection = "next" | "previos";

export type SortBy = "relevant" | "recent";
