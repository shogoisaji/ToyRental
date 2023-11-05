"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Database } from "app/lib/database.types";
import Loading from "app/loading";
type Schema = z.infer<typeof schema>;

const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
});

const Email = ({ email }: { email: string }) => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const { error: updateUserError } = await supabase.auth.updateUser(
        { email: data.email },
        { emailRedirectTo: `${location.origin}/auth/login` }
      );

      if (updateUserError) {
        setMessage("エラーが発生しました。" + updateUserError.message);
        return;
      }

      setMessage("確認用のURLを記載したメールを送信しました。");

      // logout
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        setMessage("エラーが発生しました。" + signOutError.message);
        return;
      }

      router.push("/auth/login");
    } catch (error) {
      setMessage("エラーが発生しました。" + error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div>
      <div className="text-center font-bold text-xl mb-10">
        メールアドレスの変更
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 現在のメースアドレス */}
        <div className="mb-5">
          <div className="text-center mb-1 font-bold">現在のメールアドレス</div>
          <div className="text-center">{email}</div>
        </div>
        {/* 新しいメールアドレス */}
        <div className="mb-5">
          <div className="text-center mb-1 font-bold">新しいメールアドレス</div>
          <input
            className="border border-sky-400 rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-600 focus:border-2"
            type="email"
            {...register("email", { required: true })}
          />

          <div className="my-3 text-center text-sm text-red-500">
            {errors.email?.message}
          </div>
        </div>
        {/* 変更ボタン */}
        <div className="mb-5">
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="font-bold hover:brightness-95 w-full founded-full px-3 py-2 bg-sky-500 text-white rounded-md"
            >
              変更
            </button>
          )}
        </div>
      </form>
      {message && (
        <div className="my-5 text-sm text-center text-red-500">{message}</div>
      )}
    </div>
  );
};

export default Email;
