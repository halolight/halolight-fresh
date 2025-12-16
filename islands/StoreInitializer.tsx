import { useEffect } from "preact/hooks";
import { initAllStores } from "@/lib/stores.ts";

export default function StoreInitializer() {
  useEffect(() => {
    initAllStores();
  }, []);

  return null;
}
