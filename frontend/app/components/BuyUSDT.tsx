"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { erc20Abi, tokenSaleAbi } from "../lib/abi";
import { formatEther, parseEther } from "viem";

const USDT = process.env.NEXT_PUBLIC_USDT_CONTRACT as `0x${string}`;
const SALE = process.env.NEXT_PUBLIC_SALE_CONTRACT as `0x${string}`;

export default function BuyUSDT() {
  const { address } = useAccount();
  const [ethIn, setEthIn] = useState("0.01");

  // đọc rate (tokens per 1 ETH, theo đơn vị nhỏ nhất của USDT)
  const { data: rate } = useReadContract({ abi: tokenSaleAbi, address: SALE, functionName: "rate" });

  // đọc decimals & symbol USDT
  const { data: decimals } = useReadContract({ abi: erc20Abi, address: USDT, functionName: "decimals" });
  const { data: symbol } = useReadContract({ abi: erc20Abi, address: USDT, functionName: "symbol" });

  // số token dự kiến nhận được (format có decimals)
  const expectedOut = useMemo(() => {
    if (!rate) return "";
    try {
      const wei = parseEther(ethIn || "0");
      const out = (wei * BigInt(rate as bigint)) / (10n ** 18n); // ra đơn vị "smallest unit" của USDT
      const d = Number(decimals ?? 6n);
      return (Number(out) / 10 ** d).toLocaleString(undefined, { maximumFractionDigits: d });
    } catch {
      return "";
    }
  }, [ethIn, rate, decimals]);

  // balance USDT của user
  const { data: balRaw, refetch: refetchBal } = useReadContract({
    abi: erc20Abi,
    address: USDT,
    functionName: "balanceOf",
    args: [address ?? "0x0000000000000000000000000000000000000000"]
  });

  const balance = useMemo(() => {
    if (!balRaw) return "0";
    const d = Number(decimals ?? 6n);
    return (Number(balRaw) / 10 ** d).toLocaleString(undefined, { maximumFractionDigits: d });
  }, [balRaw, decimals]);

  // mua
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess) refetchBal();
  }, [isSuccess, refetchBal]);

  return (
    <div className="card space-y-3">
      <h3 className="text-lg font-semibold">Buy {symbol as string || "USDT"}</h3>

      <div className="space-y-2">
        <label className="label">Amount (ETH)</label>
        <input
          className="input"
          type="number"
          min="0"
          step="0.0001"
          value={ethIn}
          onChange={e => setEthIn(e.target.value)}
        />
        <p className="muted">
          You will receive ≈ <b>{expectedOut}</b> {String(symbol || "USDT")}
        </p>
      </div>

      <button
        className="btn"
        disabled={isPending || !SALE}
        onClick={() =>
          writeContract({
            abi: tokenSaleAbi,
            address: SALE,
            functionName: "buy",
            args: ["0x0000000000000000000000000000000000000000"], // gửi về chính ví caller
            value: parseEther(ethIn || "0")
          })
        }
      >
        {isPending ? "Processing..." : "Buy"}
      </button>

      {hash && <p className="muted">Tx: {hash}</p>}
      {isSuccess && <p className="text-green-400">✅ Purchased!</p>}
      {error && <p className="text-red-400">{(error as Error).message}</p>}

      <div className="muted">Your balance: <b>{balance}</b> {String(symbol || "USDT")}</div>
    </div>
  );
}
