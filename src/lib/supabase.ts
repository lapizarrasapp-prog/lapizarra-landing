import { createClient } from "@supabase/supabase-js";

export function createServerSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase no configurado. Copia .env.local.example a .env.local y llena SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

export type Suscriptor = {
  id?: string;
  nombre: string;
  email: string;
  telefono?: string;
  fecha_registro?: string;
  tipo_plan?: "gratis" | "premium";
  estado_pago?: "activo" | "cancelado" | "pendiente";
  telegram_enviado?: boolean;
  stripe_customer_id?: string;
};
