import { useRecoilValue } from "recoil";
import { balanceAtom } from "../atoms/balances";
export const useBalances  = () => {
    const value = useRecoilValue(balanceAtom)
    return value
}