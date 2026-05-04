"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { MessageCircle, CheckCircle, Loader, X } from "lucide-react";

/* ─── Context ─── */
type RegistroModalCtx = { openModal: () => void };
const RegistroModalContext = createContext<RegistroModalCtx>({
  openModal: () => {},
});
export const useRegistroModal = () => useContext(RegistroModalContext);

/* ─── Trigger button (for use inside server components) ─── */
export function RegistroModalTrigger({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { openModal } = useRegistroModal();
  return (
    <div
      role="button"
      tabIndex={0}
      className={className}
      onClick={openModal}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal();
        }
      }}
    >
      {children}
    </div>
  );
}

/* ─── Provider + Modal ─── */
type FormState = "idle" | "loading" | "success" | "error";

export function RegistroModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });

  const openModal = () => {
    setState("idle");
    setErrorMsg("");
    setForm({ nombre: "", email: "", telefono: "" });
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

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
      setTimeout(() => {
        window.open("https://t.me/lapizarraapp", "_blank");
        closeModal();
      }, 1400);
    } catch {
      setErrorMsg("No pudimos conectar con el servidor. Revisa tu conexión.");
      setState("error");
    }
  };

  return (
    <RegistroModalContext.Provider value={{ openModal }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-card border border-white/10 rounded-2xl w-full max-w-md p-8 relative shadow-2xl">
            <button
              onClick={closeModal}
              aria-label="Cerrar"
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {state === "success" ? (
              <div className="text-center py-6">
                <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                  ¡Ya estás dentro!
                </h2>
                <p className="text-muted-foreground text-sm">
                  Redirigiendo al canal de Telegram…
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-1">
                    Entra al canal gratis.
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Sin spam. Solo los picks y el análisis.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  noValidate
                >
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="modal-nombre"
                      className="text-sm font-semibold text-foreground/80"
                    >
                      Nombre{" "}
                      <span className="text-primary" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="modal-nombre"
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

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="modal-email"
                      className="text-sm font-semibold text-foreground/80"
                    >
                      Correo electrónico{" "}
                      <span className="text-primary" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="modal-email"
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

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="modal-telefono"
                      className="text-sm font-semibold text-foreground/80"
                    >
                      Teléfono{" "}
                      <span className="text-muted-foreground font-normal text-xs">
                        (opcional)
                      </span>
                    </label>
                    <input
                      id="modal-telefono"
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
                    className="mt-1 inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold px-6 py-3.5 text-base hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150"
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
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </RegistroModalContext.Provider>
  );
}
