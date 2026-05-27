"use server";

import { cookies } from "next/headers";

type FormState = {
  error: string;
  success: string;
};

export async function loginForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Les champs email et mot de passe sont requis", success: "" };
  }

  const response = await fetch("http://127.0.0.1:3000/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    return { error: data.error, success: "" };
  }

  const cookieStore = await cookies();
    cookieStore.delete("session");
    cookieStore.set("session", JSON.stringify({ 
        user: {
            email: data.user.email,
            role: data.user.role,
        }

    }));

  return { error: "", success: "Connexion réussie !" };
}