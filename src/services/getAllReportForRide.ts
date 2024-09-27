import { createPublicClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";
import { safetyContractABI } from "@/utils/abis/safety-reportABI";
import { SafetyContractAddress } from "@/utils/addresses/safety-report";
import { SafetyReport } from "@/entities/safetyReport"; // Ensure this type matches your Solidity SafetyReport struct

export const getAllReportsForRide = async (
  _rideId: number
): Promise<SafetyReport[]> => {
  let allSafetyReports: SafetyReport[] = [];

  if (window.ethereum) {
    const publicClient = createPublicClient({
      chain: celoAlfajores,
      transport: custom(window.ethereum),
    });

    try {
      const fetchedReports = await publicClient.readContract({
        address: SafetyContractAddress,
        abi: safetyContractABI,
        functionName: "getAllReportsForRide", // Call the Solidity function
        args: [_rideId],
      }) as Array<any>;

      for (let reportIndex = 0; reportIndex < fetchedReports.length; reportIndex++) {
        const reportData = fetchedReports[reportIndex];

        const safetyReport: SafetyReport = {
          id: Number(reportData["id"]),
          rideEventId: Number(reportData["rideEventId"]),
          reportedBy: reportData["reportedBy"],
          reportDescription: reportData["reportDescription"],
          reportTimestamp: Number(reportData["timestamp"]),
          isResolved: reportData["isResolved"],
          isBlank: reportData["isBlank"]
        };

        allSafetyReports.push(safetyReport);
      }

      return allSafetyReports;
    } catch (err) {
      console.error(err);
      return allSafetyReports;
    }
  }

  return allSafetyReports;
};
