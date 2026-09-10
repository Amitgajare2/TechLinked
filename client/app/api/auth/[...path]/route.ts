/**
 * Proxy route for /api/auth/* → Express server
 *
 * Next.js rewrites silently drop Set-Cookie headers from upstream responses,
 * so the refreshToken cookie never reaches the browser.
 * A Route Handler properly forwards all response headers including Set-Cookie.
 */

import { NextRequest, NextResponse } from "next/server"

const API_URL = process.env.API_URL || "http://localhost:5000"

async function handler(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const upstreamUrl = `${API_URL}/api/auth/${path.join("/")}`

  // Forward the request to Express, including cookies from the browser
  const upstreamRes = await fetch(upstreamUrl, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      // Forward the cookie header so the refresh token reaches Express
      ...(req.headers.get("cookie") ? { cookie: req.headers.get("cookie")! } : {}),
    },
    body: req.method !== "GET" && req.method !== "HEAD"
      ? await req.text()
      : undefined,
  })

  const body = await upstreamRes.text()

  const res = new NextResponse(body, {
    status: upstreamRes.status,
    headers: { "Content-Type": "application/json" },
  })

  // Forward ALL Set-Cookie headers back to the browser
  upstreamRes.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      res.headers.append("set-cookie", value)
    }
  })

  return res
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler
