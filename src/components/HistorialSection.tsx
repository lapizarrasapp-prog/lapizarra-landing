import { Badge } from "@/components/ui/badge";
import { createServerSupabase } from "@/lib/supabase";

type PickRow = {
  id: string;
  fecha: string;
  pick: string;
  tipo: "La Tiza" | "La Yunta" | "El Tridente";
  odds: string | null;
  resultado: "WIN" | "LOSS";
  unidades: string | null;
};

const tipoBadgeClass: Record<PickRow["tipo"], string> = {
  "La Tiza":     "bg-muted text-muted-foreground border-white/10",
  "La Yunta":    "bg-primary/10 text-primary border-primary/20",
  "El Tridente": "bg-amber-900/40 text-amber-300 border-amber-700/30",
};

const MESES = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

function formatFecha(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const label = `${MESES[month - 1]} ${day}`;
  return year !== new Date().getFullYear() ? `${label} ${year}` : label;
}

async function getPicks(): Promise<PickRow[]> {
  try {
    const supabase = createServerSupabase();
    const { data, error } = await supabase
      .from("picks")
      .select("id, fecha, pick, tipo, odds, resultado")
      .eq("aprobado", true)
      .neq("resultado", "PENDING")
      .order("fecha", { ascending: false })
      .limit(10);
    if (error || !data) return [];
    return data as PickRow[];
  } catch {
    return [];
  }
}

export default async function HistorialSection() {
  const historial = await getPicks();

  const wins   = historial.filter((p) => p.resultado === "WIN").length;
  const losses = historial.filter((p) => p.resultado === "LOSS").length;
  const pct    = historial.length > 0 ? Math.round((wins / historial.length) * 100) : 0;

  return (
    <section id="pick-del-dia" className="py-20 lg:py-28 bg-card/30 border-y border-white/10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/25 text-xs font-semibold tracking-widest uppercase">
              Historial
            </Badge>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground">
              Últimos picks.
            </h2>
          </div>

          {historial.length > 0 && (
            <div className="flex items-center gap-6 shrink-0">
              <div className="text-center">
                <span className="font-heading text-4xl font-bold text-emerald-400 block tabular-nums">
                  {wins}-{losses}
                </span>
                <span className="text-xs text-muted-foreground">Récord</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <span className="font-heading text-4xl font-bold text-primary block tabular-nums">
                  {pct}%
                </span>
                <span className="text-xs text-muted-foreground">Efectividad</span>
              </div>
            </div>
          )}
        </div>

        {historial.length === 0 ? (
          <div className="bg-card border border-white/10 rounded-2xl px-8 py-16 text-center">
            <p className="font-heading text-2xl font-bold text-foreground mb-2">
              Historial en construcción
            </p>
            <p className="text-muted-foreground text-sm">
              Picks reales próximamente — sin datos falsos, solo resultados reales.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-card border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    <th className="px-5 py-3 text-xs font-semibold tracking-widest uppercase text-muted-foreground">Fecha</th>
                    <th className="px-5 py-3 text-xs font-semibold tracking-widest uppercase text-muted-foreground">Pick</th>
                    <th className="px-5 py-3 text-xs font-semibold tracking-widest uppercase text-muted-foreground">Tipo</th>
                    <th className="px-5 py-3 text-xs font-semibold tracking-widest uppercase text-muted-foreground text-right">Odds</th>
                    <th className="px-5 py-3 text-xs font-semibold tracking-widest uppercase text-muted-foreground text-right">Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  {historial.map((pick) => (
                    <tr
                      key={pick.id}
                      className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors"
                    >
                      <td className="px-5 py-3.5 text-muted-foreground tabular-nums whitespace-nowrap">
                        {formatFecha(pick.fecha)}
                      </td>
                      <td className="px-5 py-3.5 font-medium text-foreground/90">
                        {pick.pick}
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge className={`text-xs font-medium ${tipoBadgeClass[pick.tipo]}`}>
                          {pick.tipo}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-right text-muted-foreground tabular-nums">
                        {pick.odds ?? "—"}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Badge
                          className={
                            pick.resultado === "WIN"
                              ? "bg-emerald-900/50 text-emerald-400 border-emerald-700/30 font-bold text-xs"
                              : "bg-red-900/40 text-red-400 border-red-700/30 font-bold text-xs"
                          }
                        >
                          {pick.resultado}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden grid grid-cols-1 gap-3">
              {historial.map((pick) => (
                <div
                  key={pick.id}
                  className="bg-card border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`text-xs font-medium ${tipoBadgeClass[pick.tipo]}`}>
                        {pick.tipo}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{formatFecha(pick.fecha)}</span>
                      {pick.odds && (
                        <span className="text-xs text-muted-foreground tabular-nums">{pick.odds}</span>
                      )}
                    </div>
                    <p className="font-medium text-sm text-foreground/90 truncate">{pick.pick}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge
                      className={
                        pick.resultado === "WIN"
                          ? "bg-emerald-900/50 text-emerald-400 border-emerald-700/30 font-bold text-xs"
                          : "bg-red-900/40 text-red-400 border-red-700/30 font-bold text-xs"
                      }
                    >
                      {pick.resultado}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
