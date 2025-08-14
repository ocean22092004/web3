"use client";

import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { transactionsAbi } from "../lib/abi";
import { t, type Lang } from "../lib/i18n";

const CONTRACT = process.env.NEXT_PUBLIC_TX_CONTRACT as `0x${string}`;
const LANG: Lang = "en"; // đổi "vi" nếu muốn tiếng Việt

export default function SendWithMessage() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("0.01");
  const [message, setMessage] = useState("");

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({ hash });

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Krypt 2025</h2>
      </div>

      <div className="space-y-2">
        <label className="label">{t("Recipient", LANG)}</label>
        <input className="input" placeholder="0x..." value={to} onChange={(e) => setTo(e.target.value)} />
      </div>

      <div className="space-y-2">
        <label className="label">{t("Amount in ETH", LANG)}</label>
        <input className="input" type="number" min="0" step="0.0001" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>

      <div className="space-y-2">
        <label className="label">{t("Message (optional)", LANG)}</label>
        <input className="input" placeholder="gm gm..." value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>

      <button
        className="btn"
        disabled={isPending || !CONTRACT}
        onClick={() =>
          writeContract({
            abi: transactionsAbi,
            address: CONTRACT,
            functionName: "addToBlockchain",
            args: [to as `0x${string}`, message],
            value: parseEther(amount || "0")
          })
        }
      >
        {isPending ? "..." : t("Send with message", LANG)}
      </button>

      {hash && <p className="muted">{t("Transaction submitted", LANG)}: {hash}</p>}
      {isSuccess && <p className="text-green-400">✅ {t("Confirmed!", LANG)}</p>}
      {error && <p className="text-red-400">{(error as Error).message}</p>}
      {!CONTRACT && <p className="text-yellow-400">Set NEXT_PUBLIC_TX_CONTRACT in .env.local</p>}
    </div>
  );
}
