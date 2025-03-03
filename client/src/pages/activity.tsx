import { useState } from "react";
import { Box, Input, Button, Text, VStack } from "@chakra-ui/react";

const Activity = () => {
  const [actualReps, setActualReps] = useState(0);
  const [goalReps, setGoalReps] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [goalAchieved, setGoalAchieved] = useState("");

  const calculateGoal = () => {
    if (actualReps >= goalReps) {
      setGoalAchieved("Goal Achieved!");
    } else {
      setGoalAchieved("Goal Not Achieved");
    }
  };

  return (
    <Box p={5} maxW="500px" mx="auto" borderWidth={1} borderRadius="lg" boxShadow="md">
      <VStack>
        <Text>Actual Repetitions</Text>
        <Input type="number" value={actualReps} onChange={(e) => setActualReps(Number(e.target.value))} />

        <Text>Goal Repetitions</Text>
        <Input type="number" value={goalReps} onChange={(e) => setGoalReps(Number(e.target.value))} />

        <Text>Time Spent (minutes)</Text>
        <Input type="number" value={timeSpent} onChange={(e) => setTimeSpent(Number(e.target.value))} />

        <Text>Start Time</Text>
        <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

        <Text>End Time</Text>
        <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

        <Button colorScheme="blue" onClick={calculateGoal}>Check Goal</Button>

        {goalAchieved && <Text fontWeight="bold" color={goalAchieved === "Goal Achieved!" ? "green.500" : "red.500"}>{goalAchieved}</Text>}
      </VStack>
    </Box>
  );
};

export default Activity;
