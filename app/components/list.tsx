"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database, Json } from "app/lib/database.types";
import useStore from "store";
import { ListCard } from "app/components/list-card";

type Toy = {
  created_at: string;
  description: string | null;
  id: string;
  images: Json | null;
  is_rented: boolean;
  price: number;
  product_name: string;
};

const List = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [toysList, setToysList] = useState<Toy[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useStore();

  useEffect(() => {
    getToys();
  }, []);

  const getToys = async () => {
    const { data: toys, error } = await supabase
      .from("toys")
      .select("*")
      .order("id", { ascending: false });
    if (error) {
      setMessage(error.message);
    } else {
      setToysList(toys);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 justify-center">
      {toysList.map((toy) => (
        <ListCard toy={toy} key={toy.id} />
      ))}
    </div>
  );
};
export default List;
