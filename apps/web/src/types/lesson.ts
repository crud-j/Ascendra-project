export interface ExerciseCode {
  html: string;
  css: string;
}

export interface LessonExercise {
  instructions: string;
  startCode: ExerciseCode;
  solution: ExerciseCode;
  hints: string[];
  successMessage: string;
  /** CSS selector expected in user's HTML, or string that must appear in HTML/CSS */
  checks?: { type: "html-contains" | "css-contains" | "selector-exists"; value: string }[];
}

export interface LessonData {
  slug: string;
  title: string;
  /** Markdown-formatted teaching content shown in the instructions panel */
  explanation: string;
  exercise?: LessonExercise;
}
