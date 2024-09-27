import {
    createPublicClient,
    createWalletClient,
    custom,
    http,
    parseTransaction,
} from "viem";
import { celoAlfajores } from "viem/chains";
import { safetyContractABI } from "@/utils/abis/safety-reportABI";// Use your taxi contract's ABI
import { SafetyContractAddress } from "@/utils/addresses/safety-report"; // Use your taxi contract's address

export const createRide = async (
    _signerAddress: `0x${string}` | undefined,
    {
        _driver,
        _passengerLimit,
        _fare,
        _rideDetails,
        _departureTime,
        _forImmediateStart,
    }: CreateRideProps
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
            const createRideTxnHash = await privateClient.writeContract({
                account: address,
                address: SafetyContractAddress,
                abi: safetyContractABI,
                functionName: "createRide",
                args: [
                    _driver,
                    _passengerLimit,
                    _fare,
                    _rideDetails,
                    _departureTime,
                    _forImmediateStart,
                ],
            });

            const createRideTxnReceipt =
                await publicClient.waitForTransactionReceipt({
                    hash: createRideTxnHash,
                });

            if (createRideTxnReceipt.status == "success") {
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

export type CreateRideProps = {
    _driver: `0x${string}`;
    _passengerLimit: number;
    _fare: number;
    _rideDetails: string;
    _departureTime: number;
    _forImmediateStart: boolean;
};


