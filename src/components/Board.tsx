import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const Board: React.FC = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

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
        h="100px"
        border="1px solid black"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="2xl"
        onClick={() => handleClick(index)}
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
      <Text mb={4} fontSize="xl">
        {status}
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={1}>
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
