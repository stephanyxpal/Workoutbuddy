import { Box, Button, Input, Textarea, VStack, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const FitnessGoals: React.FC = () => {
  const [goal, setGoal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    console.log("Fitness Goal:", goal);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
  };

  return (
    <Box maxW="500px" mx="auto" mt={10} p={5} boxShadow="lg" borderRadius="lg" bg="gray.50">
      <Heading size="lg" textAlign="center" mb={4}>
        Set Your Fitness Goal
      </Heading>
      <VStack align="stretch">
        <Box>
          <Text fontWeight="bold" mb={1}>Describe your fitness goal</Text>
          <Textarea
            placeholder="What do you want to achieve?"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </Box>

        <Box>
          <Text fontWeight="bold" mb={1}>Start Date</Text>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </Box>

        <Box>
          <Text fontWeight="bold" mb={1}>End Date</Text>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </Box>

        <Button colorScheme="blue" onClick={handleSubmit} width="full">
          Save Goal
        </Button>
      </VStack>
    </Box>
  );
};

export default FitnessGoals;

