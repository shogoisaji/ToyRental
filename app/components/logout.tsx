"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "app/lib/database.types";
import Loading from "app/loading";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Logout = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      //logout
      const { error } = await supabase.auth.signOut();

      // error check
      if (error) {
        setMessage("エラーが発生しました。" + error.message);
        return;
      }

      router.push("/");
    } catch (error) {
      setMessage("エラーが発生しました。" + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div>
      <div className="text-center mb-5">ログアウトしますか？</div>
      {/* ログアウトボタン */}
      <form onSubmit={onSubmit}>
        <div className="mb-5">
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="font-bold bg-red-500 hover:brightness-95 w-full rounded-full p-2"
            >
              ログアウト
            </button>
          )}
        </div>
      </form>
      {message && (
        <div className="my-5 text-center text-red-500">{message}</div>
      )}
    </div>
  );
};

export default Logout;
