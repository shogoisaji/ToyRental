import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Register from "app/components/register";
import { Database } from "app/lib/database.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return <Register />;
};

export default RegisterPage;
