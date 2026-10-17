"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { decks } from "@/db/schema";

export async function createDeck(formData: FormData) {
  const { userId } = await auth.protect();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title) return;

  await db.insert(decks).values({
    userId,
    title,
    description: description || null,
  });

  revalidatePath("/decks");
}
