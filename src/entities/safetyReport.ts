export type SafetyReport = {
    id: number;
    rideEventId: number;
     reportedBy: `0x${string}`;
     reportDescription: string;
     reportTimestamp: number;
     isResolved: boolean;
     isBlank: boolean;
  };