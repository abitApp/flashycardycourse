import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { db } from "@/db";
import { decks } from "@/db/schema";
import { createDeck } from "./actions";

async function DeckList() {
  const { userId } = await auth.protect();

  const userDecks = await db
    .select()
    .from(decks)
    .where(eq(decks.userId, userId))
    .orderBy(desc(decks.createdAt));

  if (userDecks.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        You don&apos;t have any decks yet.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {userDecks.map((deck) => (
        <li key={deck.id}>
          <Card>
            <CardHeader>
              <CardTitle>{deck.title}</CardTitle>
              {deck.description && (
                <CardDescription>{deck.description}</CardDescription>
              )}
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export default function DecksPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 p-6">
      <h1 className="text-2xl font-semibold">Your decks</h1>

      <form action={createDeck} className="flex flex-col gap-3 sm:flex-row">
        <Input name="title" placeholder="Deck title" required />
        <Input name="description" placeholder="Description (optional)" />
        <Button type="submit">Create deck</Button>
      </form>

      <Suspense
        fallback={<p className="text-muted-foreground text-sm">Loading…</p>}
      >
        <DeckList />
      </Suspense>
    </main>
  );
}
