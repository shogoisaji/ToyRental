"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Database } from "app/lib/database.types";
import Loading from "app/loading";
type Schema = z.infer<typeof schema>;

const schema = z.object({
  email: z
    .string()
    .email({ message: "メールアドレスの形式で入力してください" }),
  password: z.string().min(6, { message: "6文字以上で入力してください" }),
});

const Login = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        setMessage("エラーが発生しました。" + error.message);
        return;
      }
      router.push("/");
    } catch (error) {
      setMessage("エラーが発生しました。" + error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="max-w-[400px] mx-auto">
      <div className="text-center font-bold text-xl mb-10">ログイン</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* email */}
        <div className="mb-5">
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
        {/* password */}
        <div className="mb-5">
          <input
            type="password"
            className="border border-sky-400 rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-600 focus:border-2"
            placeholder="パスワード"
            id="password"
            {...register("password", { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.password?.message}
          </div>
        </div>
        {/* login button */}
        <div className="mb-5">
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="bg-sky-500 text-white w-full p-2 rounded-md focus:outline-none hover:bg-sky-600"
            >
              ログイン
            </button>
          )}
        </div>
      </form>
      {message && (
        <div className="my-5 text-center text-red-500">{message}</div>
      )}

      <div className="text-center text-sm mb-5">
        <Link href="/auth/reset-password" className="text-gray-500 font-bold">
          パスワードを忘れた方はこちら
        </Link>
      </div>

      <div className="text-center text-sm">
        <Link href="/auth/signup" className="text-gray-500 font-bold">
          アカウントを作成する
        </Link>
      </div>
    </div>
  );
};

export default Login;
