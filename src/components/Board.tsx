import { Box, Grid, GridItem, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";

const Board: React.FC = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // Using useColorModeValue inside the component body to set variables
  const squareBg = useColorModeValue("gray.200", "gray.700");
  const squareHoverBg = useColorModeValue("gray.300", "gray.600");
  const xColor = "teal.500";
  const oColor = "pink.500";

  const handleClick = (index: number) => {
    if (squares[index] || calculateWinner(squares)) return;
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
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
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"}`;

  return (
    <Box>
      <Text mb={4} fontSize="xl" fontWeight="bold" textAlign="center">
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
      >
        {Array(9)
          .fill(null)
          .map((_, i) => renderSquare(i))}
      </Grid>
    </Box>
  );
};

const calculateWinner = (squares: Array<string | null>) => {
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
  return null;
};

export default Board;
