import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Register() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      await register(name, email, password);
      navigate("/");
    } catch (err: any) {
      console.error("Register error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Registration failed. Please try again.",
      );
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-8 rounded-[32px] bg-white p-10 shadow-soft">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
          Create account
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">
          Start your TamilSpeak AI journey
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Create an account to save your progress, badges, and pronunciation
          sessions.
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-semibold text-slate-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            required
          />
        </div>
        {error ? (
          <div className="rounded-3xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </button>
      </form>
      <p className="text-sm text-slate-500">
        Already have an account?{" "}
        <a href="/login" className="font-semibold text-indigo-600">
          Sign in
        </a>
      </p>
    </div>
  );
}
