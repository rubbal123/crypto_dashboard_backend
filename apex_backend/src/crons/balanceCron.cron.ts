
import { getBalanceCron } from "../controllers/okx.controller";
import totalBalance from "../models/totalBalance";
import { accountCoinListCron} from "../controllers/safeheron.controller";
import cron from "node-cron";
import dotenv from "dotenv";
dotenv.config();
const updateBalance = async (balanceData: any,source:String) => {
  if (!balanceData) return;
  const existing = await totalBalance.findOne({
      where: { source }
    });

    if (existing) {
      await existing.update({
        resData: balanceData,
        
      });
      
    } else {
       await totalBalance.create({
        source: source,
        resData: balanceData,
      });
      
    }
};
cron.schedule("*/4 * * * *", async () => {
  console.log("🕛 Running update balance cron job (OKX + Safeheron)...");
  try {
    
    const [okx_balance, safeheron_balance] = await Promise.all([
      getBalanceCron(),
      accountCoinListCron(),
    ]);
  //console.log("okx balance",await getBalanceCron())
    await Promise.all([updateBalance(okx_balance,"okx"),updateBalance(safeheron_balance,"safeheron")]);
    console.log("✅ Daily balances saved successfully!");
  } catch (error) {
    console.error("❌ Error in daily balance cron:", error);
  }
});