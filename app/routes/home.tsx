import { Card } from "~/components/card";
import type { Route } from "./+types/home";
import { TextRotate } from "~/components/text-rotate";
import { Donut, Heart, Star, TrendingUp, Calendar, Target, PartyPopper } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useWallet } from "~/hooks/use-wallet";
import { useNativeBalance } from "~/hooks/use-native-balance";
import { useSubmitTransaction } from "~/hooks/use-submit-transaction";
import * as Crowdfund from "packages/CC3CBCAAYVNQQMBGDBTA7A7EIIMTLIWRW6S5STVE4TE2ETMWZ3RDZTRC";
import { signTransaction } from "~/config/wallet.client";
import { useState, useMemo, useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Learning Stellar - Donation Campaign" },
    {
      name: "description",
      content: "Support Stellar blockchain learning journey",
    },
  ];
}

export default function Home() {
  const RPC_URL = "https://soroban-testnet.stellar.org:443";
  const { address, isConnected } = useWallet();
  const { balance, refetch: refetchBalance } = useNativeBalance(address);

  const [amount, setAmount] = useState<string>("");
  const [total, setTotal] = useState(0);
  const [previousTotal, setPreviousTotal] = useState(0);
  const [goalAmount, setGoalAmount] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [isGoalReached, setIsGoalReached] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [donorCount, setDonorCount] = useState(0);

  const contract = useMemo(() => {
    if (!isConnected || address === "-") return null;

    return new Crowdfund.Client({
      ...Crowdfund.networks.testnet,
      rpcUrl: RPC_URL,
      signTransaction,
      publicKey: address,
    });
  }, [isConnected, address]);

  const { submit, isSubmitting } = useSubmitTransaction({
    rpcUrl: RPC_URL,
    networkPassphrase: Crowdfund.networks.testnet.networkPassphrase,
    onSuccess: handleOnSuccess,
    onError: (error) => {
      console.error("Donation failed", error);
    },
  });

  async function handleOnSuccess() {
    if (contract) {
      setPreviousTotal(total);
      const totalTx = await contract.get_total_raised();
      const updated = BigInt(totalTx.result as any);
      setTotal(Number(updated));
    }
    await refetchBalance();
    setAmount("");
  }

  async function handleSubmit() {
    if (!isConnected || !contract) return;
    if (!amount.trim()) return;

    try {
      const xlmAmount = parseFloat(amount.trim());
      const stroopsAmount = Math.floor(xlmAmount * 10_000_000);

      const tx = (await contract.donate({
        donor: address,
        amount: BigInt(stroopsAmount),
      })) as any;

      await submit(tx);
    } catch (e) {
      console.error("Failed to create donation transaction", e);
    }
  }

  useEffect(() => {
    if (!contract) return;

    (async () => {
      try {
        const tx = await contract.get_total_raised();
        const total = Number(BigInt(tx.result));
        setTotal(total);
      } catch (err) {
        setTotal(0);
      }
    })();
  }, [contract]);

  useEffect(() => {
    if (!contract) return;

    (async () => {
      try {
        const goal = await contract.get_goal();
        const totalGoal = Number(BigInt(goal.result));
        setGoalAmount(totalGoal);
      } catch (err) {
        setGoalAmount(0);
      }
    })();
  }, [contract]);

  useEffect(() => {
    if (!contract) return;

    (async () => {
      try {
        const dl = await contract.get_deadline();
        const deadline = Number(BigInt(dl.result));
        setDeadline(deadline);
      } catch (err) {
        setGoalAmount(0);
      }
    })();
  }, [contract]);

  useEffect(() => {
    if (!contract) return;

    (async () => {
      try {
        const goalReachedTx = await contract.is_goal_reached();
        setIsGoalReached(goalReachedTx.result as boolean);

        const endedTx = await contract.is_ended();
        setIsEnded(endedTx.result as boolean);

        const progressTx = await contract.get_progress_percentage();
        setProgressPercentage(Number(BigInt(progressTx.result)));
      } catch (err) {
        console.error("Error fetching campaign status:", err);
      }
    })();
  }, [contract, total]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#c9a8ff]/10 dark:bg-[#c9a8ff]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-[#7dd3f0]/10 dark:bg-[#7dd3f0]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pt-5">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
            <Star className="w-6 h-6 text-[#ffd480] dark:text-[#ffd480]" />
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-slate-200">Learning</span>
              <span className="text-[#7dd3f0] ml-3 dark:text-[#7dd3f0]">
                Stellar
              </span>
            </h1>
            <Star className="w-6 h-6 text-[#ffd480] dark:text-[#ffd480]" />
          </div>
          <p className="text-slate-400 dark:text-slate-400">
            Dapps CrowdFunding Di Jaringan Stellar
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Main Card */}
          <div className="backdrop-blur-xl bg-slate-800/40 dark:bg-slate-800/40 border border-[#c9a8ff]/20 dark:border-[#c9a8ff]/20 rounded-2xl p-8 mb-8 shadow-2xl hover:border-[#c9a8ff]/40 dark:hover:border-[#c9a8ff]/40 transition-all duration-300 h-full">
            {/* Donation Header */}
            <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-[#ff9ec5]/10 to-[#c9a8ff]/10 dark:from-[#ff9ec5]/10 dark:to-[#c9a8ff]/10 rounded-xl border border-[#ff9ec5]/20 dark:border-[#ff9ec5]/20">
              <Heart className="w-5 h-5 text-[#ff9ec5] dark:text-[#ff9ec5]" />
              <div>
                <p className="text-sm text-slate-400 dark:text-slate-400">
                  Donate
                </p>
                <p className="text-2xl font-bold text-[#ff9ec5] dark:text-[#ff9ec5]">
                  {balance === "-" ? "-" : balance} XLM
                </p>
              </div>
            </div>

            {/* Progress Section */}
            <div className="mb-8 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#7dd3f0] dark:text-[#7dd3f0]" />
                  <span className="text-sm text-slate-300 dark:text-slate-300">
                    Target
                  </span>
                </div>
                <span className="text-lg font-semibold text-[#7dd3f0] dark:text-[#7dd3f0]">
                  {(goalAmount / 10_000_000).toFixed(2)} XLM
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-3 bg-slate-700/50 dark:bg-slate-700/50 rounded-full overflow-hidden border border-[#c9a8ff]/20 dark:border-[#c9a8ff]/20">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#7dd3f0] via-[#c9a8ff] to-[#ff9ec5] dark:from-[#7dd3f0] dark:via-[#c9a8ff] dark:to-[#ff9ec5] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-400">
                Progress: {progressPercentage}%
              </p>
            </div>

            {/* Deadline */}
            <div className="flex items-center gap-2 mb-8 p-3 bg-[#ffd480]/5 dark:bg-[#ffd480]/5 rounded-lg border border-[#ffd480]/20 dark:border-[#ffd480]/20">
              <Calendar className="w-4 h-4 text-[#ffd480] dark:text-[#ffd480]" />
              <p className="text-sm text-slate-300 dark:text-slate-300">
                Deadline:{" "}
                <span className="text-[#ffd480] dark:text-[#ffd480] font-semibold">
                  {deadline === 0
                    ? "N/A"
                    : new Date(deadline * 1000).toLocaleString()}
                </span>
              </p>
            </div>

            {/* Status Badges */}
            <div className="flex gap-3 mb-8 flex-wrap">
              <div
                className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                  isGoalReached
                    ? "bg-[#a8d5ba]/20 dark:bg-[#a8d5ba]/20 border-[#a8d5ba]/30 dark:border-[#a8d5ba]/30"
                    : "bg-red-500/20 dark:bg-red-500/20 border-red-400/30 dark:border-red-400/30"
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    isGoalReached
                      ? "text-[#a8d5ba] dark:text-[#a8d5ba]"
                      : "text-red-300 dark:text-red-300"
                  }`}
                >
                  {isGoalReached ? "Target Tercapai" : "Target Belum Tercapai"}
                </span>
              </div>
              <div
                className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                  isEnded
                    ? "bg-red-500/20 dark:bg-red-500/20 border-red-400/30 dark:border-red-400/30"
                    : "bg-[#a8d5ba]/20 dark:bg-[#a8d5ba]/20 border-[#a8d5ba]/30 dark:border-[#a8d5ba]/30"
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    isEnded
                      ? "text-red-300 dark:text-red-300"
                      : "text-[#a8d5ba] dark:text-[#a8d5ba]"
                  }`}
                >
                  {isEnded ? "Kampanye Berakhir" : "Kampanye Aktif"}
                </span>
              </div>
            </div>

            {/* Token Display */}
            <div className="flex flex-row justify-between items-center mb-8 p-3 bg-slate-700/30 dark:bg-slate-700/30 rounded-lg border border-[#7dd3f0]/20 dark:border-[#7dd3f0]/20">
              <div className="flex flex-row items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7dd3f0] to-[#c9a8ff] flex items-center justify-center">
                  <Donut className="w-5 h-5 text-slate-950" />
                </div>
                <p className="text-slate-300 dark:text-slate-300 font-medium">
                  XLM
                </p>
              </div>
              <p className="text-slate-300 dark:text-slate-300 font-semibold">
                {!isConnected && <span>Connect wallet</span>}
                {isConnected && balance === "-" && <span>-</span>}
                {isConnected && balance !== "-" && (
                  <>
                    <span>{balance}</span>
                    <span> XLM</span>
                  </>
                )}
              </p>
            </div>

            {/* Amount Input */}
            <div className="space-y-4 mb-8">
              <div className="relative">
                <Input
                  type="text"
                  inputMode="decimal"
                  placeholder="Masukkan jumlah XLM"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-slate-700/50 dark:bg-slate-700/50 border border-[#c9a8ff]/30 dark:border-[#c9a8ff]/30 rounded-lg text-slate-100 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-500 focus:border-[#7dd3f0] dark:focus:border-[#7dd3f0] focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-[#7dd3f0]/20 dark:focus:ring-[#7dd3f0]/20"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7dd3f0] dark:text-[#7dd3f0] font-semibold">
                  XLM
                </span>
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-3 gap-2">
                {[10, 25, 50].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val.toString())}
                    className="px-3 py-2 bg-[#c9a8ff]/20 dark:bg-[#c9a8ff]/20 border border-[#c9a8ff]/40 dark:border-[#c9a8ff]/40 rounded-lg text-sm font-medium text-[#c9a8ff] dark:text-[#c9a8ff] hover:bg-[#c9a8ff]/30 dark:hover:bg-[#c9a8ff]/30 hover:border-[#c9a8ff]/60 dark:hover:border-[#c9a8ff]/60 transition-all duration-300"
                  >
                    {val} XLM
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!isConnected || isSubmitting || !amount.trim()}
              className="w-full py-3 bg-gradient-to-r from-[#7dd3f0] to-[#c9a8ff] dark:from-[#7dd3f0] dark:to-[#c9a8ff] rounded-lg font-semibold text-slate-950 dark:text-slate-950 hover:shadow-lg hover:shadow-[#7dd3f0]/50 dark:hover:shadow-[#7dd3f0]/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Heart className="inline-block w-4 h-4 mr-2" />
              {isSubmitting ? "Donating..." : "Donate Sekarang"}
            </Button>
          </div>

          <div className="flex flex-col ">
            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-800/30 dark:bg-slate-800/30 border border-[#7dd3f0]/20 dark:border-[#7dd3f0]/20 rounded-lg p-4 text-center hover:border-[#7dd3f0]/40 dark:hover:border-[#7dd3f0]/40 transition-all duration-300">
                <TrendingUp className="w-5 h-5 text-[#7dd3f0] dark:text-[#7dd3f0] mx-auto mb-2" />
                <p className="text-sm text-slate-400 dark:text-slate-400">
                  Donatur
                </p>
                <p className="text-xl font-bold text-[#7dd3f0] dark:text-[#7dd3f0]">
                  120+
                </p>
              </div>
              <div className="bg-slate-800/30 dark:bg-slate-800/30 border border-[#ff9ec5]/20 dark:border-[#ff9ec5]/20 rounded-lg p-4 text-center hover:border-[#ff9ec5]/40 dark:hover:border-[#ff9ec5]/40 transition-all duration-300">
                <Star className="w-5 h-5 text-[#ff9ec5] dark:text-[#ff9ec5] mx-auto mb-2" />
                <p className="text-sm text-slate-400 dark:text-slate-400">
                  Rating
                </p>
                <p className="text-xl font-bold text-[#ff9ec5] dark:text-[#ff9ec5]">
                  4.9/5
                </p>
              </div>
              <div className="bg-slate-800/30 dark:bg-slate-800/30 border border-[#ffd480]/20 dark:border-[#ffd480]/20 rounded-lg p-4 text-center hover:border-[#ffd480]/40 dark:hover:border-[#ffd480]/40 transition-all duration-300">
                <Heart className="w-5 h-5 text-[#ffd480] dark:text-[#ffd480] mx-auto mb-2" />
                <p className="text-sm text-slate-400 dark:text-slate-400">
                  Total Terdonasi
                </p>
                <p className="text-xl font-bold text-[#ffd480] dark:text-[#ffd480]">
                  {(total / 10_000_000).toFixed(2)} XLM
                </p>
              </div>
            </div>

            {/* Total Donations Display */}
            <div className="flex flex-col items-center gap-2 p-6 bg-slate-800/20 dark:bg-slate-800/20 border border-[#c9a8ff]/20 dark:border-[#c9a8ff]/20 rounded-lg mb-7">
              <p className="text-slate-400 dark:text-slate-400">
                Total Donations
              </p>
              <p className="text-3xl font-bold text-[#7dd3f0] dark:text-[#7dd3f0]">
                {(total / 10_000_000).toFixed(2)} XLM
              </p>
              {previousTotal > 0 && previousTotal !== total && (
                <p className="text-sm text-[#a8d5ba] dark:text-[#a8d5ba]">
                  +{((total - previousTotal) / 10_000_000).toFixed(7)} XLM added
                </p>
              )}
            </div>

            {/* Thanks session */}
            <div className="flex flex-col justify-center items-center gap-2 p-6 bg-slate-800/20 dark:bg-slate-800/20 border border-[#c9a8ff]/20 dark:border-[#c9a8ff]/20 rounded-lg h-full">
              <h1 className="text-2xl font-bold text-[#ff9ec5] dark:text-[#ff9ec5]">
                <Heart className="inline-block w-5 h-5 mr-2" />
                Thank You For Donating
                <Heart className="inline-block w-5 h-5 ml-2" />
              </h1>
              <PartyPopper className="w-12 h-12 text-[#ff9ec5] dark:text-[#ff9ec5] mx-auto mb-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
