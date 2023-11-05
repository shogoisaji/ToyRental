import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "app/lib/database.types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // get URL
  const requestUrl = new URL(request.url);

  // get code
  const code = requestUrl.searchParams.get("code");

  if (code) {
    // create instance
    const supabase = createRouteHandlerClient<Database>({ cookies });

    // get session token
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(requestUrl.origin);
}
