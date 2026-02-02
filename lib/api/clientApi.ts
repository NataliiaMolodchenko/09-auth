import { User } from "@/types/user";
import { nextServer } from "./api"
import { CreateNotePayload, FetchNotesResponse, Note, NoteTag } from "@/types/note";

export async function fetchNotes(
    page: number,
    perPage: number,
    search?: string,
    tag?: NoteTag
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

export async function fetchNoteById(noteId:string):Promise<Note> {
    const res = await nextServer.get<Note>(`/notes/${noteId}`);
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

export const register = async (data: { email: string, password: string }) => {
    const res = await nextServer.post<User>("/auth/register", data);
    return res.data;
};

export const login = async (data: { email: string, password: string }) => {
    const res = await nextServer.post<User>("/auth/login", data);
    return res.data;
};

export const logout = async () => {
    await nextServer.post("/auth/logout");
};

export const checkSession = async () => {
    const res = await nextServer.get<User | null>("/auth/session");
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