import { NavLink } from "react-router";
import { ConnectWallet } from "./connect-wallet";

export function Header() {
  return (
    <div className="flex flex-row items-center justify-between mb-10 mt-8 px-[50px]">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight flex items-center">
        <NavLink to="/" className="hover:underline">
          Stella<span className="text-[#7dd3f0]">Rise</span>.
        </NavLink>
      </h2>
      <ConnectWallet />
    </div>
  );
}