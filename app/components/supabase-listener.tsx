"use server";

// import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navigation from "./navigation";
import { Database } from "app/lib/database.types";

const SupabaseListener = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  // get session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // get user
  let user = null;

  if (session) {
    const userId = session.user.id;
    const { data: currentUser } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    user = currentUser;

    // if change email
    if (currentUser && currentUser.email !== session.user.email) {
      const { data: updatedUser } = await supabase
        .from("profiles")
        .update({
          email: session.user.email,
        })
        .match({ id: session.user.id })
        .select("*")
        .single();

      user = updatedUser;
    }
  }

  return <Navigation session={session} user={user} />;
};

export default SupabaseListener;
