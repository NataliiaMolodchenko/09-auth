import { User } from "@/types/user";
import { nextServer } from "./api"
import { CreateNotePayload, FetchNotesResponse, Note, NoteTag } from "@/types/note";
interface LoginPayload {
  email: string;
  password: string;
}

export async function fetchNotes(
    page: number, 
    perPage: number,
    search?: string,
    tag?: NoteTag,
): Promise<FetchNotesResponse> {
    const res = await nextServer.get<FetchNotesResponse>(
        "/notes", {
        params: {
            page,
            perPage,
            search,
            tag,
        },
    });
    return res.data;
}

export async function fetchNoteById(id:string):Promise<Note> {
    const res = await nextServer.get<Note>(`/notes/${id}`);
    return res.data;
}

export async function createNote(payload:CreateNotePayload):Promise<Note> {
    const res = await nextServer.post<Note>("/notes", payload);
    return res.data;
}

export async function deleteNote(noteId:string):Promise<Note> {
    const res = await nextServer.delete<{note: Note}>(`/notes/${noteId}`);
    return res.data.note;
};

export const register = async (payload: LoginPayload): Promise<User> => {
    const res = await nextServer.post<User>("/auth/register", payload);
    return res.data;
};

export const login = async (payload: LoginPayload): Promise<User> => {
    const res = await nextServer.post<User>("/auth/login", payload);
    return res.data;
};

export const logout = async () => {
    await nextServer.post("/auth/logout");
};

export const checkSession = async () => {
    const res = await nextServer.get<User>("/auth/session");
    return res.data;
};

export const getMe = async () => {
    const res = await nextServer.get<User>("/users/me");
    return res.data;
};

export const updateMe = async (data: { username: string }) => {
    const res = await nextServer.patch<User>("/users/me", data);
    return res.data;
};