"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

const NavBar = () => {
  const { connect } = useConnect();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMiniPay, setIsMiniPay] = useState(false);

  useEffect(() => {
    if (
      window.ethereum &&
      (window.ethereum.isMiniPay || window.ethereum.isMinipay)
    ) {
      setIsMiniPay(true);
      connect({ connector: injected({ target: "metaMask" }) });
    }
  }, [connect]);

  return (
    <Box
      bg={useColorModeValue("#18A092", "#18A092")}
      px={4}
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <h2>safety&report</h2>
        </HStack>
        <Flex alignItems={"center"}>
          {!isMiniPay ? (
            <ConnectButton
              chainStatus="none"
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "avatar",
              }}
              showBalance={{
                smallScreen: false,
                largeScreen: true,
              }}
              label="Connect"
            />
          ) : (
            <div style={{ visibility: "hidden", pointerEvents: "none" }}>
              <ConnectButton
                chainStatus="none"
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "avatar",
                }}
                showBalance={{
                  smallScreen: false,
                  largeScreen: true,
                }}
                label="Connect"
              />
            </div>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;