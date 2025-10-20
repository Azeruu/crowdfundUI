import { useMemo } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

import { useWallet } from "~/hooks/use-wallet";
import { useNativeBalance } from "~/hooks/use-native-balance";

// Truncate a stellar address for display (e.g. GA... tail)
function truncateAddress(addr: string, head = 4, tail = 4) {
  if (addr.length <= head + tail) return addr;
  return `${addr.slice(0, head)}…${addr.slice(-tail)}`;
}

export function ConnectWallet() {
  const { address, isConnected, connect, disconnect, loading } = useWallet();
  const { balance } = useNativeBalance(address);

  const displayAddress = useMemo(
    () => (isConnected ? truncateAddress(address) : "-"),
    [isConnected, address]
  );

  return (
    <div className="flex items-center gap-3 text-blue-500">
      {!isConnected ? (
        <Button
          onClick={() => void connect()}
          variant="outline"
          size="sm"
          aria-label="Connect Wallet"
          disabled={loading}
        >
          {loading ? "Connecting…" : "Connect Wallet"}
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" aria-label="Wallet menu">
              {displayAddress}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-56">
            <DropdownMenuItem disabled className="flex flex-row items-center justify-between">
              <span>{balance === "-" ? "-" : balance}</span>
              <span>XLM</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                void disconnect();
              }}
              variant="destructive"
            >
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
