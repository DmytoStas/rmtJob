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
