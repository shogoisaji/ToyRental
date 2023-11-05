import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Password from "app/components/password";
import { Database } from "app/lib/database.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const PasswordPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return <Password />;
};

export default PasswordPage;
