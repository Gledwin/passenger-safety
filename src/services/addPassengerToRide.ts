import {
    createPublicClient,
    createWalletClient,
    custom,
    http,
} from "viem";
import { celoAlfajores } from "viem/chains";
import { safetyContractABI } from "@/utils/abis/safety-reportABI";
import { SafetyContractAddress } from "@/utils/addresses/safety-report";

export const addPassengerToRide = async (
    _signerAddress: `0x${string}` | undefined,
    {
        _rideId,
        _passenger,
    }: AddPassengerProps
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
            const addPassengerTxnHash = await privateClient.writeContract({
                account: address,
                address: SafetyContractAddress,
                abi: safetyContractABI,
                functionName: "addPassengerToRide", // Call the Solidity function
                args: [
                    _rideId, // Pass the ride ID
                    _passenger, // Pass the passenger address
                ],
            });

            const addPassengerTxnReceipt =
                await publicClient.waitForTransactionReceipt({
                    hash: addPassengerTxnHash,
                });

            if (addPassengerTxnReceipt.status == "success") {
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

export type AddPassengerProps = {
    _rideId: number;
    _passenger: `0x${string}`; // Passenger's address
};
