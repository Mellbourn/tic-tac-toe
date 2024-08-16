import { Box, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import Board from "./components/Board";

const App: React.FC = () => {
  return (
    <Box textAlign="center" fontSize="xl" p={3}>
      <VStack spacing={5}>
        <Heading as="h1" size="2xl">
          Tic-Tac-Toe
        </Heading>
        <Board />
      </VStack>
    </Box>
  );
};

export default App;
