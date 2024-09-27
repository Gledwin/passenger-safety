import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";
import { safetyContractABI } from "@/utils/abis/safety-reportABI";
import { SafetyContractAddress } from "@/utils/addresses/safety-report";
import { SafetyReport } from "@/entities/safetyReport"; // Ensure this type matches your Solidity SafetyReport struct

export const getSafetyReportById = async (
  _reportId: number
): Promise<SafetyReport | null> => {
  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });

    try {
      const reportData = await publicClient.readContract({
        address: SafetyContractAddress,
        abi: safetyContractABI,
        functionName: "getSafetyReportById", // Call the Solidity function
        args: [_reportId],
      }) as any;

      const safetyReport: SafetyReport = {
        id: Number(reportData["id"]),
        rideEventId: Number(reportData["rideEventId"]),
        reportedBy: reportData["reportedBy"],
        reportDescription: reportData["reportDescription"],
        reportTimestamp: Number(reportData["reportTimestamp"]),
        isResolved: reportData["isResolved"],
        isBlank: reportData["isBlank"]
      };

      return safetyReport;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  return null;
};
