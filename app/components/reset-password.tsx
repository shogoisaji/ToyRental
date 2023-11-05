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

const ResetPassword = () => {
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
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${location.origin}/auth/reset-password/confirm`,
      });

      if (error) {
        setMessage("エラーが発生しました。" + error.message);
        return;
      }
      setMessage("パスワードリセットに必要なメールを送信しました。");
    } catch (error) {
      setMessage("エラーが発生しました。" + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="max-w-[400px] mx-auto">
      <div className="text-center font-bold text-xl mb-10">
        パスワードを忘れた場合
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* メールアドレス */}
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">メールアドレス</div>
          <input
            type="email"
            className="border border-sky-400 rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-600 focus:border-2"
            placeholder="メールアドレス"
            id="email"
            {...register("email", { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.email?.message}
          </div>
        </div>
        {/* 送信ボタン */}
        <div className="mb-5">
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="bg-sky-500 text-white w-full p-2 rounded-md focus:outline-none hover:bg-sky-600"
            >
              送信
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

export default ResetPassword;
