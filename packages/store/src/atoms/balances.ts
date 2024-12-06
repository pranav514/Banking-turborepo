import { atom } from "recoil";

export const balanceAtom = atom<number> ({
    key : "balances",
    default : 0,
})