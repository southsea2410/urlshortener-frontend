import { create } from "zustand";

import {
  readAliasesFromLocalstorage,
  writeAliasesToLocalstorage,
} from "@/hooks/utils";
import { LocalStorageAliases } from "@/services/types";

type AliasActions = {
  setAliases: (aliases: string[]) => void;
  addAlias: (alias: string) => void;
};

const useAliasStore = create<AliasActions & LocalStorageAliases>((set) => ({
  aliases: readAliasesFromLocalstorage().aliases,

  setAliases(aliases) {
    set({ aliases });
    writeAliasesToLocalstorage({ aliases });
  },

  addAlias(alias) {
    set((state) => {
      const newAliases = [...state.aliases, alias];

      writeAliasesToLocalstorage({ aliases: newAliases });

      return { aliases: newAliases };
    });
  },
}));

export default useAliasStore;
