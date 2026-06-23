import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, MessageSquare, Coins, Star } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 px-4 py-16">
      <section className="text-center">
        <h1 className="text-5xl font-bold tracking-tight">Ascendra</h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Learn. Build. Contribute. Earn. Transform from learner to builder to mentor.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/register"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Get started free
          </Link>
          <Link
            href="/login"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
          >
            Sign in
          </Link>
        </div>
      </section>

      <section className="grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <BookOpen className="h-8 w-8 text-blue-500" />
            <CardTitle className="text-base">Learn</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Free courses, quests, and project workspaces. Earn XP as you go.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <MessageSquare className="h-8 w-8 text-green-500" />
            <CardTitle className="text-base">Contribute</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Answer questions, review projects, publish articles. Build Reputation.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Star className="h-8 w-8 text-purple-500" />
            <CardTitle className="text-base">Earn Reputation</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Reputation is never bought. Earn it by giving back to the community.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Coins className="h-8 w-8 text-amber-500" />
            <CardTitle className="text-base">Earn Skill Coins</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Validated contributions mint Skill Coins — real value for real help.
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
