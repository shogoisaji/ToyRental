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
  name: z.string().min(2, { message: "2文字以上で入力してください" }),
  email: z
    .string()
    .email({ message: "メールアドレスの形式で入力してください" }),
  password: z.string().min(6, { message: "6文字以上で入力してください" }),
});

const SignUp = () => {
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
    defaultValues: { name: "", email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    try {
      const { error: errorSignup } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
      if (errorSignup) {
        setMessage("エラーが発生しました。" + errorSignup.message);
        return;
      }

      // name update
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ name: data.name })
        .eq("email", data.email);

      // error check
      if (updateError) {
        setMessage("エラーが発生しました。" + updateError.message);
        return;
      }

      // reset form
      reset();
      setMessage(
        "本登録用のURLを記載したメールを送信しました。メール内のリンクをクリックしてください。"
      );

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
      <div className="text-center font-bold text-xl mb-10">サインアップ</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* name */}
        <div className="mb-5">
          <input
            type="text"
            className="border border-sky-400 rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-600 focus:border-2"
            placeholder="名前"
            id="name"
            {...register("name", { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.name?.message}
          </div>
        </div>
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
              サインアップ
            </button>
          )}
        </div>
      </form>
      {message && (
        <div className="my-5 text-center text-red-500">{message}</div>
      )}

      <div className="text-center text-sm mb-5">
        <Link href="/auth/login" className="text-gray-500 font-bold">
          ログインはこちら
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
