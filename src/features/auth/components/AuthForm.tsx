import { useState } from "react";

export function AuthForm({
  onSignIn,
  onSignUp,
}: {
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string) => Promise<void>;
}) {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setBusy(true);
    try {
      if (mode === "signIn") {
        await onSignIn(email, password);
      } else {
        await onSignUp(email, password);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      className="mx-auto flex w-full max-w-sm flex-col gap-3 rounded-2xl border border-pink-200 bg-white/80 p-6 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <h2 className="text-center text-lg font-bold text-pink-700">
        {mode === "signIn" ? "Sign in" : "Create account"}
      </h2>
      <p className="text-center text-xs text-pink-400">
        Your tasks sync across all your devices
      </p>

      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        autoComplete="email"
        className="h-11 rounded-xl border border-pink-300 bg-white px-4 shadow-sm outline-none transition placeholder:text-pink-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
      />
      <input
        type="password"
        required
        minLength={6}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password (min. 6 characters)"
        autoComplete={mode === "signIn" ? "current-password" : "new-password"}
        className="h-11 rounded-xl border border-pink-300 bg-white px-4 shadow-sm outline-none transition placeholder:text-pink-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
      />

      {error && (
        <p className="rounded-lg bg-red-50 p-2 text-center text-xs font-medium text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="h-11 rounded-xl bg-pink-600 font-semibold text-white shadow-sm transition hover:bg-pink-700 active:scale-95 disabled:opacity-50"
      >
        {busy ? "Please wait…" : mode === "signIn" ? "Sign in" : "Sign up"}
      </button>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "signIn" ? "signUp" : "signIn");
          setError(null);
        }}
        className="text-center text-xs font-medium text-pink-500 hover:text-pink-700"
      >
        {mode === "signIn"
          ? "No account yet? Create one"
          : "Already have an account? Sign in"}
      </button>
    </form>
  );
}
