/**
 * Types representing the syllabus, sections, and study elements
 */

export interface SyllabusLesson {
  id: string;
  title: string;
  lessons: string;
  summary: string;
  quote?: string;
  author?: string;
  quizQuestion?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

export interface TextbookReference {
  chapterTitle: string;
  pages: string;
  practiceBook: string;
}

export interface HistoryChapter {
  id: string;
  romanId: string;
  title: string;
  sidebarTitle: string;
  category: string;
  tagline: string;
  focusText: string;
  detailsList: string[];
  textbookRef: TextbookReference;
  syllabusLessons: SyllabusLesson[];
  colorTheme: {
    primary: string;
    secondary: string;
    bgGlow: string;
  };
}
