"use client";
import React, { useState } from "react";
import { Eye, EyeOff, CheckSquare } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await res.json();

      console.log("Login Success:", data);

      // Save JWT token
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      alert("Login Successful!");

      // Redirect
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#f8faff] p-4 overflow-hidden">
      <div className="w-full max-w-[460px] bg-white rounded-[32px] shadow-sm border border-slate-200/60 p-8 md:p-12 transition-all">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 mb-5">
            <CheckSquare className="text-white" size={28} />
          </div>

          <h1 className="text-2xl font-bold text-slate-800 mb-1">
            Welcome Back
          </h1>

          <p className="text-slate-400 text-sm">
            Sign in to your account to continue
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">
              Email
            </label>

            <input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full bg-[#f3f6f9] border-none rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 transition-all placeholder:text-slate-300"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-[#f3f6f9] border-none rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 transition-all placeholder:text-slate-300"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white font-bold rounded-xl shadow-md shadow-indigo-100 hover:opacity-95 transition-all active:scale-[0.98] mt-2"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center space-y-2">
          <button className="text-xs font-semibold text-indigo-500 hover:text-indigo-600">
            Forgot password?
          </button>

          <p className="text-xs text-slate-400">
            Don't have an account?{" "}
            <button className="text-indigo-500 font-bold hover:underline">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}