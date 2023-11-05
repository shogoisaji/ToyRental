"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Database } from "app/lib/database.types";
import useStore from "store";

type Toy = {
  created_at: string;
  id: number;
  image: string | null;
  name: string;
  description: string | null;
};

const Rental = () => {
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
    <div>
      {toysList.map((toys) => (
        <div key={toys.id}>
          <h2>{toys.name}</h2>
          <p>{toys.description}</p>
          <Image
            src={toys.image ? toys.image : "/avatars/avatar1.png"}
            alt={toys.name}
            width={100}
            height={100}
          />
        </div>
      ))}
    </div>
  );
};
export default Rental;
