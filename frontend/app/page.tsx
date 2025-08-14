"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import SendWithMessage from "./components/SendWithMessage";
import TransactionsList from "./components/TransactionsList";
import BuyUSDT from "./components/BuyUSDT";

export default function Page() {
  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Krypt 2025</h1>
        <ConnectButton />
      </div>
      <BuyUSDT />
      <SendWithMessage />
      <TransactionsList />
    </main>
  );
}
