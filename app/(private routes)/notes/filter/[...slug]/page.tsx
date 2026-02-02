import type { Metadata } from "next";
import NotesClient from "./Notes.client";
import type { NoteTag } from "@/types/note";

// type Props = {
//   params: {
//     slug?: string[];
//   };
// };

export async function generateMetadata(
  { params }: {
    params: { slug: string[] } | Promise<{ slug: string[] }>;
  }): Promise<Metadata> {
  const resolvedParams = await params;
  const filter = resolvedParams.slug?.[0] ?? "all";

  return {
    title: `Notes — ${filter} | NoteHub`,
    description: `Notes filtered by ${filter}`,
    openGraph: {
      title: `Notes — ${filter}`,
      description: `Notes filtered by ${filter}`,
      url: `https://09-auth-one-orcin.vercel.app/notes/filter/${filter}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}

export default async function FilterNotesPage({ params }: {params: { slug: string[] } | Promise<{ slug: string[] }>;}){
  const resolvedParams = await params;
  const rawTag = resolvedParams.slug?.[0];

  const tag =
    rawTag && rawTag !== "all"
      ? (rawTag as NoteTag)
      : undefined;

  return <NotesClient tag={tag} />;
};