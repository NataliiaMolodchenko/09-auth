import { Metadata } from "next";
import css from "./Home.module.css"

export const metadata: Metadata = {
    title: "404 - Page not found | NoteHub",
    description: "This page does not exist in NoteHub",
    openGraph: {
        title: "404 - Page not found",
        description: "This page does not exist in NoteHub",
        url: "https://09-auth-one-orcin.vercel.app/404",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            }
        ]
    }
};
    
const NotFound = () => {
    return (
        <main className={css.container}>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </main>
    );
};

export default NotFound;