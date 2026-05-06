"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Shield, User, KeyRound } from "lucide-react";
import { createClient } from "@/lib/supabase";

export default function AuthPage() {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<"login" | "register" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // ── Reset Password ──
    if (mode === "reset") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess("Check your email for the password reset link.");
      }

      setLoading(false);
      return;
    }

    // ── Login ──
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      router.refresh();
      router.push("/dashboard");
      return;
    }

    // ── Register ──
    if (mode === "register") {
      if (!name.trim()) {
        setError("Please enter your full name.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        await supabase
          .from("profiles")
          .update({ full_name: name })
          .eq("id", data.user.id);
      }

      router.refresh();
      router.push("/dashboard");
      return;
    }

    setLoading(false);
  };

  const switchMode = (m: "login" | "register" | "reset") => {
    setMode(m);
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center px-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/" className="inline-flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-xl">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M6 4h6.5a5.5 5.5 0 0 1 0 16H6V4z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M6 4v16" stroke="white" strokeWidth="1.2" opacity="0.6" />
                  <path d="M9 9h3.5M9 12h3M9 15h3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
                </svg>
              </div>
              <div>
                <span className="text-3xl font-bold">DOCUVAT</span>
              </div>
            </Link>

            <h1 className="text-5xl font-bold leading-tight mb-6">
              {mode === "login" ? (
                <>
                  Welcome Back to
                  <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Your Business Hub
                  </span>
                </>
              ) : mode === "register" ? (
                <>
                  Create, Manage &
                  <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Grow Your Business
                  </span>
                </>
              ) : (
                <>
                  Reset Your
                  <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Password
                  </span>
                </>
              )}
            </h1>

            <p className="text-slate-300 text-lg mb-10 max-w-xl">
              Professional invoicing, quotations, and business documents — all in one platform.
            </p>

            <div className="space-y-5">
              {[
                "Unlimited invoices and quotations",
                "Secure cloud storage",
                "Professional PDF exports",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="rounded-full bg-cyan-500/20 p-2">
                    <Shield className="h-5 w-5 text-cyan-400" />
                  </div>
                  <span className="text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md"
          >
            <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl p-8">

              {/* Logo mini */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                  className="inline-flex mb-4"
                >
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-2xl shadow-blue-500/30">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M6 4h6.5a5.5 5.5 0 0 1 0 16H6V4z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
                      <path d="M6 4v16" stroke="white" strokeWidth="1.1" opacity="0.6" />
                      <path d="M9 9h3.5M9 12h3M9 15h3.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
                    </svg>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold">
                    {mode === "login" ? "Welcome Back" : mode === "register" ? "Create Account" : "Reset Password"}
                  </h2>
                  <p className="text-slate-300 mt-2">
                    {mode === "login" ? "Sign in to your DOCUVAT account" : mode === "register" ? "Start for free, no card needed" : "Enter your email to reset your password"}
                  </p>
                </motion.div>
              </div>

              {/* Toggle Login / Register */}
              {mode !== "reset" && (
                <div className="flex rounded-xl border border-white/10 p-1 mb-6">
                  <button
                    onClick={() => switchMode("login")}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                      mode === "login"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => switchMode("register")}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                      mode === "register"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Register
                  </button>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name — register only */}
                {mode === "register" && (
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 outline-none focus:border-cyan-400 text-white placeholder-slate-500"
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm text-slate-300">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 outline-none focus:border-cyan-400 text-white placeholder-slate-500"
                    />
                  </div>
                </div>

                {/* Password — not in reset mode */}
                {mode !== "reset" && (
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 outline-none focus:border-cyan-400 text-white placeholder-slate-500"
                      />
                    </div>

                    {/* Forgot Password — login only */}
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => switchMode("reset")}
                        className="mt-2 text-xs text-slate-400 hover:text-cyan-400 transition-colors float-right"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 clear-both">
                    {error}
                  </div>
                )}

                {/* Success */}
                {success && (
                  <div className="text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                    {success}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 font-semibold transition hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed clear-both"
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? "Please wait..." : mode === "login" ? "Sign In" : mode === "register" ? "Create Account" : "Send Reset Link"}
                    {!loading && (
                      mode === "reset"
                        ? <KeyRound className="h-5 w-5" />
                        : <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                    )}
                  </span>
                </button>

              </form>

              {/* Footer */}
              <div className="mt-6 text-center text-slate-300 text-sm">
                {mode === "login" && (
                  <span>
                    Don&apos;t have an account?{" "}
                    <button onClick={() => switchMode("register")} className="font-semibold text-cyan-400 hover:text-cyan-300">
                      Register free
                    </button>
                  </span>
                )}
                {mode === "register" && (
                  <span>
                    Already have an account?{" "}
                    <button onClick={() => switchMode("login")} className="font-semibold text-cyan-400 hover:text-cyan-300">
                      Sign In
                    </button>
                  </span>
                )}
                {mode === "reset" && (
                  <button onClick={() => switchMode("login")} className="font-semibold text-cyan-400 hover:text-cyan-300">
                    Back to Sign In
                  </button>
                )}
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}