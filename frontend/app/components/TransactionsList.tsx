"use client";

import { useReadContract } from "wagmi";
import { transactionsAbi } from "../lib/abi";
import { formatEther } from "viem";
import { t, type Lang } from "../lib/i18n";

const CONTRACT = process.env.NEXT_PUBLIC_TX_CONTRACT as `0x${string}`;
const LANG: Lang = "en";

type Tx = {
  from: `0x${string}`;
  to: `0x${string}`;
  amount: bigint;
  message: string;
  timestamp: bigint;
};

export default function TransactionsList() {
  const { data, isLoading, refetch } = useReadContract({
    abi: transactionsAbi,
    address: CONTRACT,
    functionName: "getAllTransactions"
  });

  const list = (data as Tx[] | undefined) ?? [];

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t("Transactions", LANG)}</h3>
        <button className="btn" onClick={() => refetch()} disabled={isLoading}>
          {isLoading ? t("Loading...", LANG) : "↻"}
        </button>
      </div>

      {isLoading ? (
        <p className="muted">{t("Loading...", LANG)}</p>
      ) : list.length === 0 ? (
        <p className="muted">{t("No transactions yet", LANG)}</p>
      ) : (
        <div className="space-y-3">
          {list
            .slice()
            .reverse()
            .map((tx, i) => (
              <div key={i} className="grid-list">
                <div className="card">
                  <div className="text-sm">
                    <div><span className="label">{t("From", LANG)}:</span> {tx.from}</div>
                    <div><span className="label">{t("To", LANG)}:</span> {tx.to}</div>
                    <div><span className="label">{t("Amount", LANG)}:</span> {formatEther(tx.amount)} ETH</div>
                    <div><span className="label">{t("Message", LANG)}:</span> {tx.message || "—"}</div>
                    <div><span className="label">{t("Time", LANG)}:</span> {new Date(Number(tx.timestamp) * 1000).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
