import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  let body: { nombre?: string; email?: string; telefono?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const { nombre, email, telefono } = body;

  if (!nombre?.trim() || !email?.trim()) {
    return NextResponse.json(
      { error: "Nombre y email son requeridos" },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "El formato del email no es válido" },
      { status: 400 }
    );
  }

  let supabase;
  try {
    supabase = createServerSupabase();
  } catch {
    // Supabase not configured — in dev mode, simulate success
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️  Supabase no configurado. Simulando registro exitoso en desarrollo.");
      return NextResponse.json({ success: true, dev: true });
    }
    return NextResponse.json(
      { error: "Configuración del servidor incompleta" },
      { status: 500 }
    );
  }

  const { error } = await supabase.from("suscriptores").insert({
    nombre: nombre.trim(),
    email: email.trim().toLowerCase(),
    telefono: telefono?.trim() || null,
    tipo_plan: "gratis",
    estado_pago: "activo",
  });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Este email ya está registrado. ¡Ya eres parte de la comunidad!" },
        { status: 409 }
      );
    }
    console.error("Supabase insert error:", error);
    return NextResponse.json(
      { error: "No pudimos guardar tu registro. Intenta de nuevo." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
