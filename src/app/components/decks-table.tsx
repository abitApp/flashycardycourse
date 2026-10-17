"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Deck = {
  id: string;
  name: string;
  language: string;
  cards: number;
  status: "new" | "learning" | "mastered";
};

const decks: Deck[] = [
  { id: "1", name: "Spanish basics", language: "Spanish", cards: 24, status: "learning" },
  { id: "2", name: "German verbs", language: "German", cards: 58, status: "new" },
  { id: "3", name: "French food", language: "French", cards: 31, status: "mastered" },
  { id: "4", name: "Italian travel", language: "Italian", cards: 42, status: "learning" },
  { id: "5", name: "Japanese kana", language: "Japanese", cards: 92, status: "new" },
  { id: "6", name: "English idioms", language: "English", cards: 17, status: "mastered" },
  { id: "7", name: "Turkish greetings", language: "Turkish", cards: 12, status: "learning" },
  { id: "8", name: "Portuguese numbers", language: "Portuguese", cards: 20, status: "new" },
];

const statusVariant = {
  new: "outline",
  learning: "secondary",
  mastered: "default",
} as const;

const columns: ColumnDef<Deck>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "language",
    header: "Language",
  },
  {
    accessorKey: "cards",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Cards
        <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return <Badge variant={statusVariant[status]}>{status}</Badge>;
    },
  },
];

export function DecksTable() {
  return (
    <DataTable
      columns={columns}
      data={decks}
      filterColumn="name"
      filterPlaceholder="Search decks..."
    />
  );
}
