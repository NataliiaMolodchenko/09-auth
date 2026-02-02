'use client';

import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api/clientApi";
import { useNoteStore } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";
import { NoteTag } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const { mutate } = useMutation({
    mutationFn: () => createNote(draft),
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.back();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        value={draft.title}
        onChange={(e) =>
          setDraft({ ...draft, title: e.target.value })
        }
        placeholder="Title"
        required
      />

      <textarea
        className={css.textarea}
        value={draft.content}
        onChange={(e) =>
          setDraft({ ...draft, content: e.target.value })
        }
        required 
      />

      <select
        value={draft.tag}
        onChange={(e) =>
          setDraft({ ...draft, tag: e.target.value as NoteTag })
        }
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>

      <div className={css.actions}>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
        <button type="submit">
          Create note
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
