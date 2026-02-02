import type { Metadata } from "next";
import NotesClient from "./Notes.client";
import type { NoteTag } from "@/types/note";

type Props = {
  params: {
    slug?: string[];
  };
};

export async function generateMetadata(
  { params }: { params: { slug: string[] } }
): Promise<Metadata> {
  const filter = params.slug?.[0] ?? "all";

  return {
    title: `Notes — ${filter} | NoteHub`,
    description: `Notes filtered by ${filter}`,
    openGraph: {
      title: `Notes — ${filter}`,
      description: `Notes filtered by ${filter}`,
      url: `https://08-zustand-x2b8.vercel.app/notes/filter/${filter}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}

export default function FilterNotesPage({ params }: Props) {
  const rawTag = params.slug?.[0];

  const tag =
    rawTag && rawTag !== "all"
      ? (rawTag as NoteTag)
      : undefined;

  return <NotesClient tag={tag} />;
};