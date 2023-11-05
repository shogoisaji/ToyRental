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
  productName: z.string().max(20, "20文字以下で入力してください"),
  description: z.string().max(200, "200文字以下で入力してください"),
  price: z.string().transform(parseFloat),
});

const Register = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  // const [productID, setProductID] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [fileMessage, setFileMessage] = useState("");
  const { user } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    defaultValues: {
      // name: user.name ? user.name : "",
    },
    // check form
    resolver: zodResolver(schema),
  });

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

      // set Image
      setProductImage(files[0]);
    },
    []
  );

  // submit
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    setMessage("");

    if (!productImage && !productName && !description) {
      setMessage("未入力のデータがあります。");
      setLoading(false);
      return;
    }

    try {
      const productID = uuidv4();
      const currentDatetime = new Date().toISOString();

      // supabase upload
      const { data: storageData, error: storageError } = await supabase.storage
        .from("toys")
        .upload(`${productID}/${currentDatetime}`, productImage!);

      // error check
      if (storageError) {
        setMessage("エラーが発生しました。storage:" + storageError.message);
        return;
      }

      // get Image url
      const { data: urlData } = await supabase.storage
        .from("toys")
        .getPublicUrl(storageData.path);

      const newImageUrl = urlData.publicUrl;
      setImageUrl(newImageUrl);
      // Convert imageUrl to array json
      const imageUrlJson: string = JSON.stringify([newImageUrl]);

      // insert product
      const { error: updateError } = await supabase.from("toys").insert({
        id: productID,
        product_name: data.productName,
        images: imageUrlJson,
        description: data.description,
        price: data.price,
      });

      // error check
      if (updateError) {
        setMessage("エラーが発生しました。toys table:" + updateError.message);
        return;
      }

      setMessage("おもちゃを登録しました。");
      router.push("/");
    } catch (error) {
      setMessage("エラーが発生しました。" + error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div>
      <div className="text-center font-bold text-xl mb-10">おもちゃ登録</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 画像 */}
        <div className="mb-5">
          <div className="flex flex-col text-sm items-center justify-center mb-5">
            <div className="relative w-24 h-24 mb-5">
              {productImage ? (
                <Image
                  src={URL.createObjectURL(productImage)}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-full object-cover"
                  alt="Image"
                  priority={true}
                />
              ) : null}
            </div>
            <input type="file" onChange={onUploadImage} />
            {fileMessage && (
              <div className="text-center text-red-500 my-5">{fileMessage}</div>
            )}
          </div>
        </div>
        {/* 商品名 */}
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">商品名</div>
          <input
            type="text"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            id="productName"
            {...register("productName", { required: true })}
            required
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.productName && <>{errors.productName.message}</>}
          </div>
          {/* 料金 */}
          <div className="text-sm mb-1 font-bold">料金</div>
          <input
            type="number"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            placeholder="￥/ Day"
            id="price"
            {...register("price", { required: true })}
            required
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.price && <>{errors.price.message}</>}
          </div>
          {/* 説明 */}
          <div className="text-sm mb-1 font-bold">説明</div>
          <textarea
            rows={3}
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            id="description"
            {...register("description", { required: true })}
            required
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.description && <>{errors.description.message}</>}
          </div>

          {/* change button */}
          <div className="mb-5">
            {loading ? (
              <Loading />
            ) : (
              <button
                type="submit"
                className="bg-sky-500 text-white w-full mt-2 p-2 rounded-md focus:outline-none hover:bg-sky-600"
              >
                登録
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
export default Register;
