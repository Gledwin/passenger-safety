export const safetyContractABI =
[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_rideId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_passenger",
				"type": "address"
			}
		],
		"name": "addPassengerToRide",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_rideId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_driver",
				"type": "address"
			}
		],
		"name": "createRide",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_rideId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_details",
				"type": "string"
			}
		],
		"name": "fileSafetyReport",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rideEventId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "reportedBy",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "reportDescription",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "reportTimestamp",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isResolved",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isBlank",
						"type": "bool"
					}
				],
				"internalType": "struct SafetyReport",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_reportId",
				"type": "uint256"
			}
		],
		"name": "markReportResolved",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_rideId",
				"type": "uint256"
			}
		],
		"name": "getAllReportsForRide",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rideEventId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "reportedBy",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "reportDescription",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "reportTimestamp",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isResolved",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isBlank",
						"type": "bool"
					}
				],
				"internalType": "struct SafetyReport[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_reportId",
				"type": "uint256"
			}
		],
		"name": "getSafetyReportById",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rideEventId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "reportedBy",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "reportDescription",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "reportTimestamp",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isResolved",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isBlank",
						"type": "bool"
					}
				],
				"internalType": "struct SafetyReport",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]