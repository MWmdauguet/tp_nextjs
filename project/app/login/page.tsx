"use client";

import { useActionState } from "react";
import { loginForm } from "../action/login";

type FormState = {
  error: string;
  success: string;
};

const initialState: FormState = { error: "", success: "" };

export default function Login() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    loginForm,
    initialState
  );

  return (
    <form action={formAction}>
      <input name="email" placeholder="votre email" />
      <input name="password" placeholder="mot de passe" type="password" />

      <button type="submit" disabled={pending}>
        {pending ? "Connexion..." : "Se Connecter"}
      </button>

      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state.success && <p style={{ color: "green" }}>{state.success}</p>}
    </form>
  );
}