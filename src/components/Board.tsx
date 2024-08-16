import {
  Box,
  Button,
  Grid,
  GridItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Board: React.FC = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  // Define color mode dependent variables
  const squareBg = useColorModeValue("gray.200", "gray.700");
  const squareHoverBg = useColorModeValue("gray.300", "gray.600");
  const xColor = "teal.500";
  const oColor = "pink.500";

  const handleClick = (index: number) => {
    if (squares[index] || gameOver) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newSquares);
    if (winner) {
      setGameOver(true);
    }
  };

  const handleNewGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
  };

  const renderSquare = (index: number) => {
    return (
      <GridItem
        w="100%"
        h="100%"
        bg={squareBg}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="3xl"
        fontWeight="bold"
        color={squares[index] === "X" ? xColor : oColor}
        onClick={() => handleClick(index)}
        _hover={{ cursor: "pointer", bg: squareHoverBg }}
      >
        {squares[index]}
      </GridItem>
    );
  };

  const winner = calculateWinner(squares);
  const status =
    winner === "Draw"
      ? "It's a draw!"
      : winner
      ? `Winner: ${winner}`
      : `Next player: ${isXNext ? "X" : "O"}`;

  return (
    <Box textAlign="center">
      <Text mb={4} fontSize="xl" fontWeight="bold">
        {status}
      </Text>
      <Grid
        templateColumns="repeat(3, 1fr)"
        templateRows="repeat(3, 1fr)"
        gap={2}
        w={{ base: "260px", md: "300px" }}
        h={{ base: "260px", md: "300px" }}
        maxW="100%"
        maxH="100%"
        mb={4}
      >
        {Array(9)
          .fill(null)
          .map((_, i) => renderSquare(i))}
      </Grid>
      <Button
        onClick={handleNewGame}
        colorScheme="teal"
        mt={4}
        visibility={gameOver ? "visible" : "hidden"}
        opacity={gameOver ? 1 : 0}
        pointerEvents={gameOver ? "auto" : "none"}
      >
        New Game
      </Button>
    </Box>
  );
};

// Function to calculate the winner or detect a draw
const calculateWinner = (squares: Array<string | null>): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  // Check for a draw
  if (squares.every((square) => square !== null)) {
    return "Draw";
  }

  return null;
};

export default Board;
