// Simple EN/VI dictionary (User preference: map "English":"Vietnamese")
export const EN_VI: Record<string, string> = {
  "Connect Wallet":"Kết nối ví",
  "Recipient":"Người nhận",
  "Amount in ETH":"Số lượng ETH",
  "Message (optional)":"Tin nhắn (tuỳ chọn)",
  "Send ETH":"Gửi ETH",
  "Send with message":"Gửi kèm tin nhắn",
  "Transaction submitted":"Đã gửi giao dịch",
  "Confirmed!":"Đã xác nhận!",
  "Transactions":"Danh sách giao dịch",
  "From":"Từ",
  "To":"Đến",
  "Amount":"Số tiền",
  "Message":"Tin nhắn",
  "Time":"Thời gian",
  "Loading...":"Đang tải...",
  "No transactions yet":"Chưa có giao dịch"
};

export type Lang = "en" | "vi";

// Very lightweight t() helper
export function t(key: string, lang: Lang = "en") {
  if (lang === "vi" && EN_VI[key]) return EN_VI[key];
  return key;
}
