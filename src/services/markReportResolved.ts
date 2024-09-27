import {
    createPublicClient,
    createWalletClient,
    custom,
} from "viem";
import { celoAlfajores } from "viem/chains";
import { safetyContractABI } from "@/utils/abis/safety-reportABI";
import { SafetyContractAddress } from "@/utils/addresses/safety-report";

export const markReportResolved = async (
    _signerAddress: `0x${string}` | undefined,
    _reportId: number
): Promise<boolean> => {
    if (window.ethereum) {

        const privateClient = createWalletClient({
            chain: celoAlfajores,
            transport: custom(window.ethereum),
        });
        const publicClient = createPublicClient({
            chain: celoAlfajores,
            transport: custom(window.ethereum),
        });

        const [address] = await privateClient.getAddresses();

        try {
            const markResolvedTxnHash = await privateClient.writeContract({
                account: address,
                address: SafetyContractAddress,
                abi: safetyContractABI,
                functionName: "markReportResolved", // Call the Solidity function
                args: [_reportId], // Pass the report ID to be marked as resolved
            });

            const markResolvedTxnReceipt = await publicClient.waitForTransactionReceipt({
                hash: markResolvedTxnHash,
            });

            if (markResolvedTxnReceipt.status === "success") {
                return true;
            }
            return false;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    return false;
};
