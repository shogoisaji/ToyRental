"use client";

import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "store";
import { Database } from "app/lib/database.types";
import Loading from "app/loading";
type Schema = z.infer<typeof schema>;

const schema = z.object({
  name: z
    .string()
    .min(2, "2文字以上で入力してください")
    .max(20, "20文字以下で入力してください"),
});

const Profile = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState("/avatars/avatar1.png");
  const [fileMessage, setFileMessage] = useState("");
  const { user } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name ? user.name : "",
    },
    // check form
    resolver: zodResolver(schema),
  });

  // get user avatar
  useEffect(() => {
    if (user && user.avatar_url) {
      setAvatarUrl(user.avatar_url);
    }
  }, [user]);

  // image upload
  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      setFileMessage("");

      // no selected file
      if (!files || files.length === 0) {
        setFileMessage("ファイルが選択されていません");
        return;
      }

      const fileSize = files[0]?.size / 1024 / 1024;
      const fileType = files[0]?.type;

      // check file size 2MB
      if (fileSize > 2) {
        setFileMessage("画像サイズを2MB以下にしてください");
        return;
      }

      // check file type
      if (fileType !== "image/jpeg" && fileType !== "image/png") {
        setFileMessage("画像はjpgまたはpng形式である必要があります");
        return;
      }

      // set avatar
      setNewAvatar(files[0]);
    },
    []
  );

  // submit
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      let avatar_url = user.avatar_url;

      if (newAvatar) {
        // supabase upload
        const { data: storageData, error: storageError } =
          await supabase.storage
            .from("profile")
            .upload(`${user.id}/${uuidv4()}`, newAvatar);

        // error check
        if (storageError) {
          setMessage("エラーが発生しました。" + storageError.message);
          return;
        }

        if (avatar_url) {
          const fileName = avatar_url.split("/").slice(-1)[0];

          // delete old avatar
          await supabase.storage
            .from("profile")
            .remove([`${user.id}/${fileName}`]);
        }

        // get avatar url
        const { data: urlData } = await supabase.storage
          .from("profile")
          .getPublicUrl(storageData.path);

        avatar_url = urlData.publicUrl;
      }

      // profile update
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          name: data.name,
          avatar_url: avatar_url,
        })
        .eq("id", user.id);

      // error check
      if (updateError) {
        setMessage("エラーが発生しました。" + updateError.message);
        return;
      }

      setMessage("アカウントを更新しました。");
    } catch (error) {
      setMessage("エラーが発生しました。" + error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div>
      <div className="text-center font-bold text-xl mb-10">アカウント</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* アバター */}
        <div className="mb-5">
          <div className="flex flex-col text-sm items-center justify-center mb-5">
            <div className="relative w-24 h-24 mb-5">
              <Image
                src={avatarUrl}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-full object-cover"
                alt="avatar"
                priority={true}
              />
            </div>
            <input type="file" onChange={onUploadImage} />
            {fileMessage && (
              <div className="text-center text-red-500 my-5">{fileMessage}</div>
            )}
          </div>
        </div>
        {/* 名前 */}
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">名前</div>
          <input
            type="text"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            placeholder="名前"
            id="name"
            {...register("name", { required: true })}
            required
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.name && <>{errors.name.message}</>}
          </div>
          {/* change button */}
          <div className="mb-5">
            {loading ? (
              <Loading />
            ) : (
              <button
                type="submit"
                className="bg-sky-500 text-white w-full p-2 rounded-md focus:outline-none hover:bg-sky-600"
              >
                変更
              </button>
            )}
          </div>
        </div>
      </form>
      {message && (
        <div className="my-5 text-center text-red-500 mb-5">{message}</div>
      )}
    </div>
  );
};
export default Profile;
