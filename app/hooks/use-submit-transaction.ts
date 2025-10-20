import { useState } from "react";
import { TransactionBuilder, rpc } from "@stellar/stellar-sdk";
import { signTransaction } from "~/config/wallet.client";
import type { AssembledTransaction } from "@stellar/stellar-sdk/contract";

interface UseSubmitTransactionOptions {
  rpcUrl: string;
  networkPassphrase: string;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function useSubmitTransaction(options: UseSubmitTransactionOptions) {
  const [isSubmitting, setSubmitting] = useState(false);

  async function submit(tx: AssembledTransaction<any>) {
    setSubmitting(true);
    try {
      const builtTxXDR = tx.toXDR();
      const signedXDR = await signTransaction(builtTxXDR);

      // Submit transaction to the network
      const server = new rpc.Server(options.rpcUrl);
      const sentTx = await server.sendTransaction(
        TransactionBuilder.fromXDR(signedXDR.signedTxXdr, options.networkPassphrase)
      );

      // Wait for transaction confirmation with polling
      if (sentTx.status === "PENDING") {
        const txHash = sentTx.hash;
        let attempts = 0;
        const maxAttempts = 30; // 30 attempts × 2 seconds = 60 seconds total

        while (attempts < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          attempts++;

          try {
            const response = await fetch(`${options.rpcUrl}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "getTransaction",
                params: {
                  hash: txHash,
                },
              }),
            });

            const data = await response.json();

            if (data.error) {
              if (data.error.code === -32602 || data.error.message?.includes("not found")) {
                continue;
              } else {
                throw new Error(`RPC Error: ${data.error.message}`);
              }
            }

            if (data.result) {
              const status = data.result.status;

              if (status === "SUCCESS") {
                options.onSuccess?.();
                return { success: true };
              } else if (status === "FAILED") {
                throw new Error(`Transaction failed: ${JSON.stringify(data.result)}`);
              }
              // If status is still PENDING, continue polling
            }
          } catch (e: any) {
            // If it's a network error or JSON parse error, continue polling
            if (e.name === "TypeError" || e.message?.includes("fetch")) {
              continue;
            }

            throw e;
          }
        }

        throw new Error(`Transaction timeout after ${maxAttempts * 2} seconds. Hash: ${txHash}`);
      }

      // If not pending, transaction was accepted
      options.onSuccess?.();
      return { success: true };
    } catch (e) {
      options.onError?.(e);
      return { success: false, error: e };
    } finally {
      setSubmitting(false);
    }
  }

  return { submit, isSubmitting };
}
