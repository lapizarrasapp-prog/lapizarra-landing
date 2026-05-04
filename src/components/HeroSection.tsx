"use client";

import { motion, useReducedMotion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRegistroModal } from "@/components/RegistroModal";

export default function HeroSection() {
  const prefersReduced = useReducedMotion();
  const { openModal } = useRegistroModal();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.1,
        delayChildren: prefersReduced ? 0 : 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_70%_-10%,oklch(0.30_0.08_152)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.20_0.06_152)_0%,transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.div variants={item}>
              <Badge className="mb-6 bg-primary/15 text-primary border-primary/25 px-3 py-1 text-xs font-semibold tracking-widest uppercase">
                Análisis deportivo · Telegram
              </Badge>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight text-foreground mb-6"
            >
              Antes del partido,{" "}
              <span className="text-primary">lee la pizarra.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl"
            >
              Tony estudia los números para que tú no tengas que hacerlo desde cero.
              Picks diarios con contexto real — béisbol, fútbol americano y más.
              Sin hype vacío, sin picks al aire.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={openModal}
                className={cn(buttonVariants({ size: "lg" }), "bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-12 px-7 text-base")}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Únete al canal gratis
              </button>
              <a
                href="#precios"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 px-7 text-base border-white/20 hover:border-primary/50 hover:text-primary")}
              >
                Ver planes premium
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex items-center gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <span className="text-primary font-heading font-bold text-lg">100+</span>
                <span>suscriptores</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-primary font-heading font-bold text-lg">100%</span>
                <span>tasa de aciertos</span>
              </div>
              <div className="w-px h-4 bg-border hidden sm:block" />
              <span className="hidden sm:block">Picks diarios</span>
            </motion.div>
          </motion.div>

          {/* Decorative blackboard — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: prefersReduced ? 0 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: prefersReduced ? 0 : 0.8,
              delay: prefersReduced ? 0 : 0.3,
              ease: "easeOut",
            }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="bg-card border border-white/10 rounded-2xl p-7 shadow-2xl shadow-black/50">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-2xl font-bold text-primary tracking-widest">
                      LA PIZARRA
                    </span>
                    <span className="text-xs text-muted-foreground font-medium tabular-nums">
                      HOY · 7:05 PM ET
                    </span>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                        La Yunta del día
                      </span>
                      <Badge className="text-xs bg-primary/15 text-primary border-primary/25 font-bold">
                        -110
                      </Badge>
                    </div>
                    <div className="font-heading text-2xl font-bold text-foreground leading-tight">
                      Cubs Over 4.5 + ARI/CHC Over 8.5
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ARI vs CHC · -110
                    </div>
                    <p className="text-sm text-foreground/75 leading-relaxed">
                      Cubs en casa con ventaja ofensiva clara. ARI usó el bullpen el día anterior. El total se fue a 12 carreras. ✅ WIN
                    </p>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="flex gap-4 text-center">
                    <div className="flex-1">
                      <div className="font-heading text-2xl font-bold text-primary tabular-nums">
                        100%
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Tasa de aciertos
                      </div>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div className="flex-1">
                      <div className="font-heading text-2xl font-bold text-foreground tabular-nums">
                        100+
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Suscriptores
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-bold shadow-lg font-heading tracking-wide">
                PREMIUM
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
