import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export async function middleware(request: NextRequest) {
  const toLogin = (q = "") => NextResponse.redirect(new URL("/login" + q, request.url));
  if (!URL_ || !KEY) return toLogin("?setup=1");

  let response = NextResponse.next({ request });
  const supabase = createServerClient(URL_, KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data } = await supabase.auth.getUser();
  const email = data.user?.email?.toLowerCase();
  const admin = process.env.ADMIN_EMAIL?.toLowerCase();
  if (!email || !admin || email !== admin) return toLogin();
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
