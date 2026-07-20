import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/shared/store/store";
import { toggle } from "@/shared/store/saved.slice";
import type { Phone } from "@/shared/types";

// Local (offline) saved listings — no auth needed
export default function useSaved() {
  const dispatch = useDispatch();
  const items = useSelector((s: RootState) => s.saved.items);

  const savedIds = Object.keys(items);
  const savedList = Object.values(items) as Phone[];
  const isSaved = (id: string) => Boolean(items[id]);
  const toggleSave = (phone: Phone) => dispatch(toggle(phone));

  return { savedIds, savedList, isSaved, toggleSave };
}
