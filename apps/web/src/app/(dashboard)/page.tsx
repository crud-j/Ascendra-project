export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back. Your learning journey continues here.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-4">
          <p className="text-sm font-medium text-muted-foreground">Courses in progress</p>
          <p className="mt-1 text-3xl font-bold">0</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm font-medium text-muted-foreground">Contributions this week</p>
          <p className="mt-1 text-3xl font-bold">0</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm font-medium text-muted-foreground">Skill Coin balance</p>
          <p className="mt-1 text-3xl font-bold">0 SC</p>
        </div>
      </div>
    </div>
  );
}
