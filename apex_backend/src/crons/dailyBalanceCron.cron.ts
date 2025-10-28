import cron from "node-cron";
import BalanceHistory from "../models/BalanceHistory";
import { getOkxBalance } from "../services/okxClient.service";
import { getSafeheronBalance } from "../services/safeheron.service";

const saveBalance = async (balanceData: any) => {
  if (!balanceData) return;
  await BalanceHistory.create({
    source: balanceData.source,
    totalBalance: balanceData.totalBalance,
    coinData: balanceData.coinData,
    date: new Date(),
  });
  console.log(`✅ ${balanceData.source} balance saved`);
};
//console.log(" cron starting ...")
cron.schedule("0 0 * * *", async () => {
  console.log("🕛 Running daily balance cron job (OKX + Safeheron)...");

  try {
    const [okx, safeheron] = await Promise.all([
      getOkxBalance(),
      getSafeheronBalance(),
    ]);

    await Promise.all([saveBalance(okx), saveBalance(safeheron)]);
    console.log("✅ Daily balances saved successfully!");
  } catch (error) {
    console.error("❌ Error in daily balance cron:", error);
  }
});
