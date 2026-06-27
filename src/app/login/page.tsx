"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Loader2, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";
import Link from "next/link";

/**
 * LoginPage — Wrapper con Suspense boundary.
 *
 * Next.js 16 requiere que useSearchParams() esté envuelto en <Suspense>
 * para que la página pueda prerenderse estáticamente durante el build.
 * Sin este boundary, el build de Vercel falla con:
 *   "useSearchParams() should be wrapped in a suspense boundary"
 *
 * El componente interno LoginFormContent es el que realmente usa
 * useSearchParams; el default export solo provee el Suspense wrapper.
 */
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginFormContent />
    </Suspense>
  );
}

/** Fallback mientras carga el boundary (estático, sin hooks). */
function LoginFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-dark p-4">
      <div className="flex items-center gap-3 text-white">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm">Cargando acceso...</span>
      </div>
    </div>
  );
}

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const hasError = searchParams.has("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    hasError ? "Credenciales inválidas. Inténtalo de nuevo." : null,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("Error inesperado. Inténtalo de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-dark p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(176, 176, 176, 0.15), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-md bg-background text-primary font-display font-bold flex items-center justify-center shadow-amc-xl">
              AMC
            </div>
          </Link>
          <h1 className="font-display font-bold text-2xl text-white">Panel Administrativo</h1>
          <p className="text-sm text-slate-300 mt-1">AMC Soluciones Perú</p>
        </div>

        {/* Form card */}
        <div className="glass-card rounded-2xl p-8 shadow-amc-xl">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-white">Acceso seguro</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <Label htmlFor="email" className="text-slate-200">
                Email corporativo
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="admin@amcsolucionesperu.com"
                className="mt-1.5 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/15"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-200">
                Contraseña
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  placeholder="••••••••"
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/15 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-error/15 border border-error/40 text-error-foreground text-error px-3 py-2 rounded-md flex items-start gap-2 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-white text-primary hover:bg-slate-100 py-3 text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Ingresando...
                </>
              ) : (
                <>
                  Iniciar sesión
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Demo creds */}
          <div className="mt-6 pt-6 border-t border-white/10 text-xs text-slate-400">
            <p className="font-semibold text-slate-300 mb-2">Credenciales demo:</p>
            <p><span className="text-slate-300">SUPER_ADMIN:</span> admin@amcsolucionesperu.com</p>
            <p><span className="text-slate-300">Password:</span> AdminAMC2026!</p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            ← Volver al sitio público
          </Link>
        </div>
      </div>
    </div>
  );
}
