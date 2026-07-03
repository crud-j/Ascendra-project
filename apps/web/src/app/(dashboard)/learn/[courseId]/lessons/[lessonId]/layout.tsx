/**
 * Lesson player layout.
 *
 * Cancels the parent MainContent's p-6 padding so the IDE fills the full
 * available area. The sidebar margin shift is handled by MainContent reacting
 * to Zustand — no extra work needed here.
 */
export default function LessonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="-m-6 flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden">
      {children}
    </div>
  );
}
