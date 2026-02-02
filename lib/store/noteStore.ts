import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NoteTag } from "@/types/note";

type Draft = {
  title: string;
  content: string;
  tag: NoteTag;
};

const initialDraft: Draft = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteStore = {
  draft: Draft;
  setDraft: (note: Draft) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: "note-draft" }
  )
);
