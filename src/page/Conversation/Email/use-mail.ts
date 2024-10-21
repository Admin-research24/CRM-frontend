import { atom, useAtom } from "jotai";
import { Email } from "../../../store/slices/email";

type Config = {
  selected: Email["_id"] | null;
};

const configAtom = atom<Config>({
  selected: null,
});

export function useMail() {
  return useAtom(configAtom);
}
