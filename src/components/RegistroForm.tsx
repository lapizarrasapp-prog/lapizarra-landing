"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, CheckCircle, Loader } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export default function RegistroForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Algo salió mal. Intenta de nuevo.");
        setState("error");
        return;
      }

      setState("success");
    } catch {
      setErrorMsg("No pudimos conectar con el servidor. Revisa tu conexión.");
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <section id="registro" className="py-20 lg:py-28">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card border border-emerald-700/40 rounded-2xl p-10">
            <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
              ¡Ya estás dentro!
            </h2>
            <p className="text-muted-foreground mb-8">
              Te guardamos en la lista. Entra al canal gratis de Telegram ahora
              para empezar a recibir los picks.
            </p>
            <a
              href="https://t.me/lapizarraapp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold px-8 py-4 text-base hover:bg-primary/90 active:scale-[0.98] transition-all duration-150"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Entrar al canal de Telegram
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="registro" className="py-20 lg:py-28">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-primary/15 text-primary border-primary/25 text-xs font-semibold tracking-widest uppercase">
            Canal gratis
          </Badge>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Entra a la comunidad.
          </h2>
          <p className="text-muted-foreground">
            Regístrate y te mandamos el link de Telegram directo. Sin spam,
            sin rollos.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-white/10 rounded-2xl p-8 flex flex-col gap-5"
          noValidate
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="nombre"
              className="text-sm font-semibold text-foreground/80"
            >
              Nombre <span className="text-primary" aria-hidden="true">*</span>
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              minLength={2}
              autoComplete="given-name"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
              disabled={state === "loading"}
              className="w-full rounded-lg border border-white/15 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 disabled:opacity-50 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-foreground/80"
            >
              Correo electrónico <span className="text-primary" aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="tu@correo.com"
              value={form.email}
              onChange={handleChange}
              disabled={state === "loading"}
              className="w-full rounded-lg border border-white/15 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 disabled:opacity-50 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="telefono"
              className="text-sm font-semibold text-foreground/80"
            >
              Teléfono{" "}
              <span className="text-muted-foreground font-normal text-xs">
                (opcional)
              </span>
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              autoComplete="tel"
              placeholder="+52 55 1234 5678"
              value={form.telefono}
              onChange={handleChange}
              disabled={state === "loading"}
              className="w-full rounded-lg border border-white/15 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 disabled:opacity-50 transition-colors"
            />
          </div>

          {state === "error" && errorMsg && (
            <p
              role="alert"
              className="text-sm text-red-400 bg-red-900/20 border border-red-700/30 rounded-lg px-4 py-3"
            >
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={state === "loading"}
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold px-6 py-3.5 text-base hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150"
          >
            {state === "loading" ? (
              <>
                <Loader className="mr-2 h-5 w-5 animate-spin" />
                Registrando...
              </>
            ) : (
              <>
                <MessageCircle className="mr-2 h-5 w-5" />
                Unirme al canal gratis
              </>
            )}
          </button>

          <p className="text-xs text-muted-foreground text-center">
            Sin spam. Solo los picks y el análisis.
          </p>
        </form>
      </div>
    </section>
  );
}
