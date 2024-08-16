import React from "react";
import {
  Box,
  Heading,
  VStack,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import Board from "./components/Board";

const App: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const color = useColorModeValue("gray.800", "gray.50");

  return (
    <Box
      textAlign="center"
      fontSize="xl"
      p={3}
      bg={bgColor}
      color={color}
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing={5} w="full" maxW="md">
        <Box
          w="full"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading as="h1" size="2xl">
            Tic-Tac-Toe
          </Heading>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Box>
        <Board />
      </VStack>
    </Box>
  );
};

export default App;
