/**
 * Lesson player layout.
 * Cancels the parent layout's p-6 padding so the IDE fills the full viewport.
 */
export default function LessonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="-m-6 flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden">
      {children}
    </div>
  );
}
