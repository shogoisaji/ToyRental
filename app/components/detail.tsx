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

  const decodeImages = (images: Json | null): Array<string> | null => {
    if (toy!.images && typeof toy!.images === "string") {
      return JSON.parse(toy!.images);
    }
    return ["/no_image.png"];
  };

  return (
    <div>
      {toy ? (
        <div className="shadow-xl shadow-black-900 max-w-sm rounded-xl bg-custom-blue5">
          <div
            className="rounded-t-xl overflow-hidden"
            style={{ width: "100%", height: "300px", position: "relative" }}
          >
            <Image
              src={toy.images ? decodeImages(toy.images)![0] : "/no_image.png"}
              alt={toy.product_name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col justify-between p-5">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                {toy.product_name}
              </h5>
              <p className="overflow-hidden h-20 mb-5 font-normal text-gray-300">
                {toy.description}
              </p>
            </div>
            <div className="flex justify-center items-center">
              {toy.is_rented ? (
                <ArchiveBoxXMarkIcon className="inline-block text-red-500 w-7 h-7 mr-3" />
              ) : (
                <ArchiveBoxIcon className="inline-block text-custom-blue7 w-7 h-7 mr-3" />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
