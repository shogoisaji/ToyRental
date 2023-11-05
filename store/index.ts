import { Database } from "app/lib/database.types";
import { create } from "zustand";
type ProfileType = Database["public"]["Tables"]["profiles"]["Row"];

type StateType = {
  user: ProfileType;
  setUser: (payload: ProfileType) => void;
};

const useStore = create<StateType>((set) => ({
  user: {
    id: "",
    name: "",
    email: "",
    avatar_url: "",
    is_admin: false,
  },
  setUser: (payload) => {
    set({ user: payload });
  },
}));

export default useStore;
