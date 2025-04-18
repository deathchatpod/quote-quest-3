import { QuoteSearchForm } from "@/components/quotes/search";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="container py-12 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Quote Quest</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Search for famous quotes, sayings, and phrases from history's greatest
          minds. Find inspiration by keyword, author, or quote length.
        </p>
      </div>

      <div className="mb-12">
        <QuoteSearchForm />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Search by Keywords</h3>
            <p className="text-muted-foreground">
              Find quotes containing specific words or phrases that resonate
              with you.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Filter by Author</h3>
            <p className="text-muted-foreground">
              Discover wisdom from your favorite philosophers, leaders, and
              thinkers.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Choose Quote Length</h3>
            <p className="text-muted-foreground">
              Find the perfect quote for any occasion - from brief sayings to
              profound passages.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
