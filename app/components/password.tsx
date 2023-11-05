"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Database } from "app/lib/database.types";
import Loading from "app/loading";
type Schema = z.infer<typeof schema>;
const schema = z
  .object({
    password: z
      .string()
      .min(6, { message: "パスワードは6文字以上で入力してください。" }),
    confirmation: z
      .string()
      .min(6, { message: "パスワードは6文字以上で入力してください。" }),
  })
  .refine((data) => data.password === data.confirmation, {
    message: "パスワードが一致しません。",
    path: ["confirmation"],
  });

const Password = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { password: "", confirmation: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) {
        setMessage("エラーが発生しました。" + error.message);
        return;
      }
      reset();
      setMessage("パスワードは正常に更新されました。");
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
      <div className="text-center font-bold text-xl mb-10">パスワード変更</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 新しいパスワード */}
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">新しいパスワード</div>
          <div>
            <input
              type="password"
              className="border border-sky-400 rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-600 focus:border-2"
              placeholder="新しいパスワード"
              id="password"
              {...register("password", { required: true })}
            />
            <div className="my-3 text-center text-sm text-red-500">
              {errors.password?.message}
            </div>
          </div>
        </div>
        {/* 確認用パスワード */}
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">確認用パスワード</div>
          <input
            type="password"
            className="border border-sky-400 rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-600 focus:border-2"
            placeholder="確認用パスワード"
            id="confirmation"
            {...register("confirmation", { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.confirmation?.message}
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
        {/* メッセージ */}
        {message && (
          <div className="my-5 text-sm text-center text-red-500">{message}</div>
        )}
      </form>
    </div>
  );
};

export default Password;
