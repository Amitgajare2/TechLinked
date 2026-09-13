import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:5000";

async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;

  const upstreamUrl = `${API_URL}/api/${path.join("/")}`;

  // Get headers from browser request
  const authorization = req.headers.get("authorization");
  const cookie = req.headers.get("cookie");
  const contentType = req.headers.get("content-type");

  const headers = new Headers();

  // Forward Authorization header
  if (authorization) {
    headers.set("authorization", authorization);
  }

  // Forward cookies
  if (cookie) {
    headers.set("cookie", cookie);
  }

  // Forward Content-Type
  if (contentType) {
    headers.set("content-type", contentType);
  }

  const upstreamRes = await fetch(upstreamUrl, {
    method: req.method,
    headers,
    body:
      req.method !== "GET" && req.method !== "HEAD"
        ? await req.arrayBuffer()
        : undefined,
  });

  const body = await upstreamRes.arrayBuffer();

  const responseHeaders = new Headers();

  const responseContentType =
    upstreamRes.headers.get("content-type");

  if (responseContentType) {
    responseHeaders.set(
      "content-type",
      responseContentType
    );
  }

  // Forward Set-Cookie
  const setCookie =
    upstreamRes.headers.get("set-cookie");

  if (setCookie) {
    responseHeaders.append("set-cookie", setCookie);
  }

  return new NextResponse(body, {
    status: upstreamRes.status,
    headers: responseHeaders,
  });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;