"use client";

import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import HistorialSection from "@/components/HistorialSection";
import RegistroForm from "@/components/RegistroForm";
import { RegistroModalTrigger } from "@/components/RegistroModal";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  MessageCircle,
  Pencil,
  BookOpen,
  Layers,
  Quote,
} from "lucide-react";

/* ─────────────────────────────────── Stats ── */
function StatsStrip() {
  const stats = [
    { value: "100+", label: "Suscriptores activos" },
    { value: "100%", label: "Tasa de aciertos" },
    { value: "Diario", label: "Picks publicados" },
    { value: "Desde 2026", label: "En la pizarra" },
  ];

  return (
    <section className="border-y border-white/10 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-heading text-3xl font-bold text-primary tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Pick types ── */
function PickTypesSection() {
  const picks = [
    {
      Icon: Pencil,
      badge: "Pick simple",
      name: "La Tiza",
      description:
        "Un juego, un análisis. El pick más limpio de La Pizarra. Cuando Tony lo ve claro, sale La Tiza.",
      detail: "1 juego · Análisis completo · Recomendado para empezar",
    },
    {
      Icon: BookOpen,
      badge: "Pick doble",
      name: "La Yunta",
      description:
        "Dos juegos que van de la mano. Cuando los números apuntan al mismo lado en dos partidos distintos.",
      detail: "2 juegos · Correlacionados · Mayor rendimiento potencial",
    },
    {
      Icon: Layers,
      badge: "Pick triple",
      name: "El Tridente",
      description:
        "Tres picks en un paquete para las noches grandes de béisbol. Alto riesgo, alto reward.",
      detail: "3 juegos · Noche de deporte grande · Exclusivo premium",
    },
  ];

  return (
    <section id="picks" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <Badge className="mb-4 bg-primary/15 text-primary border-primary/25 text-xs font-semibold tracking-widest uppercase">
            Los picks
          </Badge>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Tres formatos. Un solo análisis.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            Cada pick tiene nombre porque cada uno tiene un propósito distinto.
            No es lo mismo ir al grano que ir a las noches grandes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {picks.map((pick) => (
            <div
              key={pick.name}
              className="bg-card border border-white/10 rounded-2xl p-7 flex flex-col gap-4 hover:border-primary/30 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <pick.Icon className="h-5 w-5 text-primary" />
                </div>
                <Badge className="text-xs bg-primary/10 text-primary border-primary/20 font-semibold uppercase tracking-wider">
                  {pick.badge}
                </Badge>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  {pick.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {pick.description}
                </p>
              </div>

              <Separator className="bg-white/10" />

              <p className="text-xs text-muted-foreground">{pick.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────── Pricing ── */
async function handleCheckout(plan: "weekly" | "monthly") {
  try {
    console.log("Iniciando checkout:", plan)
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan })
    })
    console.log("Respuesta status:", res.status)
    const data = await res.json()
    console.log("Data recibida:", data)
    if (data.url) {
      window.location.href = data.url
    } else {
      alert("Error: " + JSON.stringify(data))
    }
  } catch (err) {
    alert("Error de conexión: " + err)
  }
}

function PricingSection() {
  const freeFeatures = [
    "Picks básicos en Telegram",
    "Resultados del día",
    "Acceso a la comunidad",
  ];
  const premiumFeatures = [
    "La Tiza + La Yunta + El Tridente",
    "Análisis completo de cada pick",
    "Razonamiento detrás de cada juego",
    "Historial de picks con resultados",
    "Acceso prioritario antes del partido",
  ];

  return (
    <section id="precios" className="py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge className="mb-4 bg-primary/15 text-primary border-primary/25 text-xs font-semibold tracking-widest uppercase">
            Planes
          </Badge>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Elige tu nivel.
          </h2>
          <p className="text-muted-foreground text-lg">
            Empieza gratis. Sube cuando veas por qué el premium vale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Free card */}
          <div className="bg-card border border-white/10 rounded-2xl p-8 flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                Canal gratis
              </p>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-5xl font-bold text-foreground">
                  $0
                </span>
              </div>
              <p className="text-muted-foreground text-sm mt-2">
                Telegram, sin tarjeta
              </p>
            </div>

            <Separator className="bg-white/10" />

            <ul className="space-y-3 flex-1">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-foreground/80">
                  <Check className="h-4 w-4 text-muted-foreground shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <RegistroModalTrigger className="inline-flex items-center justify-center rounded-lg border border-white/20 text-foreground font-semibold px-6 py-3 text-sm hover:border-primary/50 hover:text-primary active:scale-[0.98] transition-all duration-150 w-full">
              <MessageCircle className="mr-2 h-4 w-4" />
              Únete gratis
            </RegistroModalTrigger>
          </div>

          {/* Premium card */}
          <div className="bg-card border-2 border-primary/50 rounded-2xl p-8 flex flex-col gap-6 relative shadow-lg shadow-primary/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground border-0 px-4 py-1 text-xs font-bold tracking-wider uppercase shadow-md">
                Más popular
              </Badge>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
                Premium
              </p>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-heading text-5xl font-bold text-foreground">
                  $15
                </span>
                <span className="text-muted-foreground text-sm">/semana</span>
                <span className="text-xs text-muted-foreground">· o $50/mes</span>
              </div>
              <p className="text-muted-foreground text-sm mt-2">
                Cancela cuando quieras
              </p>
            </div>

            <Separator className="bg-primary/20" />

            <ul className="space-y-3 flex-1">
              {premiumFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-foreground/90">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => handleCheckout("weekly")}
                className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold px-6 py-3 text-sm hover:bg-primary/90 active:scale-[0.98] transition-all duration-150"
              >
                Suscribirse — $15 / semana
              </button>
              <button
                type="button"
                onClick={() => handleCheckout("monthly")}
                className="inline-flex items-center justify-center rounded-lg border border-primary/40 text-primary font-semibold px-6 py-3 text-sm hover:bg-primary/10 active:scale-[0.98] transition-all duration-150"
              >
                Suscribirse — $50 / mes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── Testimonials ── */
function TestimonialsSection() {
  const testimonials = [
    {
      initials: "CM",
      name: "Carlos M.",
      location: "Monterrey, México",
      text: "Llevaba meses siguiendo picks random en Twitter. La diferencia con La Pizarra es el análisis — entiendes por qué, no solo qué.",
    },
    {
      initials: "RV",
      name: "Rodrigo V.",
      location: "Miami, FL",
      text: "La Yunta del martes me cambió la semana. Y lo que más me gustó fue leer el razonamiento detrás. Tiene sentido.",
    },
    {
      initials: "MT",
      name: "Manny T.",
      location: "Houston, TX",
      text: "Empecé con el canal gratis y me pasé al premium en una semana. La diferencia en la calidad del análisis es clara.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-card/30 border-y border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <Badge className="mb-4 bg-primary/15 text-primary border-primary/25 text-xs font-semibold tracking-widest uppercase">
            Lo que dicen
          </Badge>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground">
            De la comunidad.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-card border border-white/10 rounded-2xl p-7 flex flex-col gap-4"
            >
              <Quote className="h-6 w-6 text-primary/40" aria-hidden="true" />

              <p className="text-foreground/85 leading-relaxed text-sm flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div
                  className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-heading font-bold text-sm shrink-0"
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          * Testimonios de ejemplo — reemplaza con los reales cuando los tengas.
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────── CTA final ── */
function CTASection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-4xl lg:text-6xl font-bold text-foreground mb-5 leading-tight">
          ¿Listo para entrar{" "}
          <span className="text-primary">a la pizarra?</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          Únete al canal gratis. Si quieres más, el premium está a $15 la
          semana. Sin compromisos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <RegistroModalTrigger className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold px-8 py-4 text-base hover:bg-primary/90 active:scale-[0.98] transition-all duration-150 cursor-pointer">
            <MessageCircle className="mr-2 h-5 w-5" />
            Empieza gratis
          </RegistroModalTrigger>
          <a
            href="#precios"
            className="inline-flex items-center justify-center rounded-lg border border-white/20 text-foreground font-semibold px-8 py-4 text-base hover:border-primary/50 hover:text-primary active:scale-[0.98] transition-all duration-150"
          >
            Ver planes premium
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Disclaimer ── */
function DisclaimerSection() {
  return (
    <section style={{ backgroundColor: "#0d1f16" }} className="py-6">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs text-center" style={{ color: "rgba(240, 237, 230, 0.6)" }}>
          Todo el contenido es análisis deportivo con fines de entretenimiento. No somos asesores de apuestas. El autor no es responsable de pérdidas económicas. Apuesta responsablemente. Los resultados pasados no garantizan resultados futuros.
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────── Footer ── */
function FooterSection() {
  return (
    <footer className="border-t border-white/10 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="font-heading text-xl font-bold tracking-widest text-foreground block mb-2">
              LA PIZARRA
            </span>
            <p className="text-sm text-muted-foreground max-w-xs">
              Análisis deportivo para latinos. Picks diarios con análisis a
              fondo.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/lapizarraapp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram de La Pizarra"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              @lapizarraapp
            </a>
          </div>
        </div>

        <Separator className="bg-white/10 my-8" />

        <p className="text-xs text-muted-foreground text-center sm:text-left">
          © 2026 La Pizarra. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

/* ─────────────────────────── Page entry ── */
export default function Page() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <StatsStrip />
        <PickTypesSection />
        <HistorialSection />
        <RegistroForm />
        <PricingSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <DisclaimerSection />
      <FooterSection />
    </>
  );
}
