import { User } from "@/types/user";
import { cookies } from "next/headers";
import { nextServer } from "./api";
import { FetchNotesResponse, Note, NoteTag } from "@/types/note";

export async function fetchNotes(
  page: number,
  perPage: number,
  search?: string,
  tag?: NoteTag): Promise<FetchNotesResponse> {
  const cookieStore = cookies();  
  const res = await nextServer.get<FetchNotesResponse>(
        "/notes", {
        params: {
            page,
            perPage,
            search,
            ...(tag ? { tag }:{}),
        },
        headers: {
            Cookie: cookieStore.toString()
        }
    });
    return res.data;
}

export async function fetchNoteById(noteId:string):Promise<Note> {
  const cookieStore = cookies();   
  const res = await nextServer.get<Note>(
        `/notes/${noteId}`, {
        headers: {
            Cookie: cookieStore.toString()
        },
    }
    );

    return res.data;
}

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/auth/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data.data;
};
    
export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  
    return res.data;
};

