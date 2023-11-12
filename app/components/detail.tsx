"use client";

import {
  ArchiveBoxIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/24/outline";
import { Database, Json } from "app/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ProductInfo } from "app/components/productInfo";
import BackToProductButton from "app/components/backToProductButton";
import ProductImage from "app/components/productImage";
import { ProductForm } from "app/components/productForm";
// import { ProductForm } from "app/components/productForm";

type Toy = {
  created_at: string;
  description: string | null;
  id: string;
  images: Json | null;
  is_rented: boolean;
  price: number;
  product_name: string;
};

export const Detail = ({ id }: { id: string }) => {
  const supabase = createClientComponentClient<Database>();
  const [message, setMessage] = useState("");
  const [toy, setToy] = useState<Toy>();

  useEffect(() => {
    getToy();
  }, []);

  const getToy = async () => {
    const { data: toy, error } = await supabase
      .from("toys")
      .select()
      .match({ id: id })
      .single();
    if (error) {
      setMessage(error.message);
    } else {
      setToy(toy);
      console.log(id);
    }

    if (!toy) {
      notFound();
    }
  };

  const decodeImages = (): Array<string> | null => {
    if (toy!.images && typeof toy!.images === "string") {
      return JSON.parse(toy!.images);
    }
    return ["/no_image.png"];
  };

  return (
    <div className="flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
      {toy ? (
        <>
          <ProductImage
            images={toy!.images ? decodeImages()! : ["/no_image.png"]}
          />
          <div className="flex flex-col justify-between h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128">
            <BackToProductButton />
            <ProductInfo
              name={toy!.product_name}
              description={toy!.description ? toy!.description : ""}
              price={toy!.price}
            />

            <ProductForm
              id={toy!.product_name}
              name={toy!.product_name}
              images={toy!.images ? decodeImages()! : ["/no_image.png"]}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};
