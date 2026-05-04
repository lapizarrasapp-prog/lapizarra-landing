import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function GraciasPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#0d1f16" }}
    >
      <div className="text-center max-w-md">
        <CheckCircle
          className="mx-auto mb-6 h-16 w-16"
          style={{ color: "#d4af37" }}
        />

        <h1
          className="font-heading text-4xl sm:text-5xl font-bold mb-4 leading-tight"
          style={{ color: "#d4af37" }}
        >
          ¡Ya eres premium!
        </h1>

        <p className="text-lg mb-2" style={{ color: "#d4af37cc" }}>
          Tu suscripción está activa.
        </p>
        <p className="text-base mb-10" style={{ color: "#d4af3799" }}>
          Revisa tu correo para el recibo y accede al canal de Telegram para
          empezar a recibir los picks.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://t.me/lapizarraapp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg font-bold px-8 py-4 text-base transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: "#d4af37", color: "#0d1f16" }}
          >
            Ir al canal de Telegram
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg font-semibold px-8 py-4 text-base transition-all duration-150 hover:opacity-80 active:scale-[0.98]"
            style={{
              border: "1px solid #d4af3750",
              color: "#d4af37",
            }}
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
