import { NextResponse } from "next/server"
import { ADMIN_EMAIL, ADMIN_PASSWORD, createAdminSession } from "@/lib/admin-auth"

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  if (body.email !== ADMIN_EMAIL || body.password !== ADMIN_PASSWORD) return NextResponse.json({ error: "Email ou palavra-passe inválidos." }, { status: 401 })
  await createAdminSession()
  return NextResponse.json({ ok: true })
}
