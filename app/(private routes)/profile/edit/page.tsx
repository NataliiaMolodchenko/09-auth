'use client';

import { useAuthStore } from "@/lib/store/authStore";
import css from "./EditProfilePage.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateMe } from "@/lib/api/clientApi";
import Image from "next/image";

function EditProfilePage(){
    const { user, setUser } = useAuthStore();
    const [username, setUsername] = useState(user?.username ?? "");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updated = await updateMe({ username });
        setUser(updated);
        router.push("/profile");
    };

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>
                    Edit Profile
                </h1>

                {user && (
                    <Image
                        src={user.avatar}
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                    />
                )}

                <form
                    className={css.profileInfo}
                    onSubmit={handleSubmit}
                >
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">
                            Username:
                        </label>
                        <input
                            id="username"
                            type="text"
                            className={css.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <p>Email: {user?.email}</p>

                    <div className={css.actions}>
                        <button
                            type="submit"
                            className={css.saveButton}>
                            Save
                        </button>
                        <button
                            type="button"
                            className={css.cancelButton}
                            onClick={() => router.push("/profile")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default EditProfilePage;
