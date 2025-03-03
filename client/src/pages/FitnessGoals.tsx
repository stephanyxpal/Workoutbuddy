import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";

import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";

import { FormEvent, ChangeEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_GOAL } from "../utils/mutation";
import Auth from "../utils/auth";

const FitnessGoals: React.FC = () => {
  const [goalformData, setGoalformData] = useState({
    goalText: "",
    startDate: "",
    targetDate: "",
  });

  const [errors, setErrors] = useState({
    goalText: "",
    startDate: "",
    targetDate: "",
  });

  const [addGoal] = useMutation(ADD_GOAL);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { goalText: "", startDate: "", targetDate: "" };

    if (!goalformData.goalText || goalformData.goalText.length < 10) {
      newErrors.goalText = "Goal description must be at least 10 characters.";
      isValid = false;
    }
    if (!goalformData.startDate) {
      newErrors.startDate = "Start date is required.";
      isValid = false;
    }
    if (!goalformData.targetDate) {
      newErrors.targetDate = "End date is required.";
      isValid = false;
    } else if (
      goalformData.startDate &&
      goalformData.targetDate < goalformData.startDate
    ) {
      newErrors.targetDate = "End date must be after the start date.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setGoalformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      console.log("Inside mutation in goals");
      await addGoal({
        variables: { input: { ...goalformData } },
      });
      alert("Goal Added successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      maxW='500px'
      mx='auto'
      mt={10}
      p={5}
      boxShadow='lg'
      borderRadius='lg'
      bg='gray.50'
    >
      <Heading size='lg' textAlign='center' mb={4}>
        Set Your Fitness Goal
      </Heading>
      <VStack align='stretch' gap={4}>
        <FormControl isInvalid={!!errors.goalText}>
          <Text fontWeight='bold' mb={1}>
            Describe your fitness goal
          </Text>
          <Textarea
            placeholder='What do you want to achieve?'
            name='goalText'
            value={goalformData.goalText}
            onChange={handleInputChange}
          />
          <FormErrorMessage style={{ color: "red" }}>
            {errors.goalText}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.startDate}>
          <Text fontWeight='bold' mb={1}>
            Start Date
          </Text>
          <Input
            type='date'
            name='startDate'
            value={goalformData.startDate}
            onChange={handleInputChange}
          />
          <FormErrorMessage style={{ color: "red" }}>
            {errors.startDate}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.targetDate}>
          <Text fontWeight='bold' mb={1}>
            End Date
          </Text>
          <Input
            type='date'
            name='targetDate'
            value={goalformData.targetDate}
            onChange={handleInputChange}
          />
          <FormErrorMessage style={{ color: "red" }}>
            {errors.targetDate}
          </FormErrorMessage>
        </FormControl>

        <Button
          // colorScheme='blue'
          onClick={handleSubmit}
          width='full'
          variant='ghost'
          color='white'
          bg='#213A82'
          _hover={{ bg: "#182B62" }}
        >
          Save Goal
        </Button>
      </VStack>
    </Box>
  );
};

export default FitnessGoals;
