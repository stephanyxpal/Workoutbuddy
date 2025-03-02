import { useState, FormEvent } from "react";

import {
  Input,
  Button,
  NativeSelect,
  Stack,
  Field,
  Text,
  Box,
  Center,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { ADD_WORKOUT } from "../utils/mutation";
import Auth from "../utils/auth";

const WorkoutForm = () => {
  const [formData, setFormData] = useState({
    workoutType: "Cardio",
    duration: "",
    caloriesBurned: 0,
    date: new Date().toISOString().split("T")[0], // Default to today’s date
    repetitions: 0,
    sets: 0,
    weightUsed: 0,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [addWorkout] = useMutation(ADD_WORKOUT);

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!formData.workoutType)
      newErrors.workoutType = "Workout type is required";
    if (!formData.duration || Number(formData.duration) <= 0)
      newErrors.duration = "Duration must be greater than 0";
    if (Number(formData.caloriesBurned) < 1)
      newErrors.caloriesBurned = "Calories burned cannot be negative";
    if (!formData.date) newErrors.date = "Date is required";
    if (Number(formData.repetitions) < 0)
      newErrors.repetitions = "Reps cannot be negative";
    if (Number(formData.sets) < 0) newErrors.sets = "Sets cannot be negative";
    if (Number(formData.weightUsed) < 0)
      newErrors.weightUsed = "Weight cannot be negative";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleWorkoutType = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      workoutType: value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value ? parseInt(value, 10) : 0) : value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Remove error for the specific field
    }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails
    //const form = e.currentTarget;
    console.log("Form submitted", formData);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      console.log("inside the mutation");
      const { data } = await addWorkout({
        variables: { input: { ...formData } },
      });
      if (!data) {
        throw new Error("something went wrong!");
      }

      // Auth.login(data.addUser.token);
      alert("Activity added successful!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Text fontSize='2xl' fontWeight='bold' textAlign='center' mb={4}>
        Activity
      </Text>
      <Box
        maxW='400px'
        mx='auto'
        p={2}
        //bg='gray.100'
        borderRadius='md'
        boxShadow='md'
      >
        {/* <VStack gap={4} align='stretch' maxW='sm' padding={5}>*/}
        <Stack gap='8' maxW='sm' css={{ "--field-label-width": "200px" }}>
          <form onSubmit={handleSubmit} noValidate>
            <Field.Root orientation='horizontal' required>
              <Field.Label>Workout Type</Field.Label>
              <NativeSelect.Root
                variant={"outline"}
                // onChange={handleChange}
                // value={formData.workoutType}
              >
                <NativeSelect.Field
                  value={formData.workoutType}
                  mb={4}
                  onChange={(e) => handleWorkoutType(e.currentTarget.value)}
                >
                  <option value='Cardio'>Cardio</option>
                  <option value='Strength Training'>Strength Training</option>
                  <option value='Yoga'>Yoga</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>
            {errors.workoutType && (
              <Text color='red.500'>{errors.workoutType}</Text>
            )}

            <Field.Root orientation='horizontal' required>
              <Field.Label>Duration (Minutes)</Field.Label>
              <Input
                type='number'
                name='duration'
                value={formData.duration}
                min={1}
                flex='1'
                onChange={handleChange}
                mb={4}
              />
            </Field.Root>
            {errors.duration && <Text color='red.500'>{errors.duration}</Text>}

            {/* Calories Burned */}
            <Field.Root orientation='horizontal' required>
              <Field.Label>Calories Burned</Field.Label>
              <Input
                type='number'
                name='caloriesBurned'
                value={formData.caloriesBurned}
                min={0}
                flex='1'
                mb={4}
                onChange={handleChange}
              />
            </Field.Root>
            {errors.caloriesBurned && (
              <Text color='red.500'>{errors.caloriesBurned}</Text>
            )}

            {/* Date */}
            <Field.Root orientation='horizontal' required>
              <Field.Label>Date</Field.Label>
              <Input
                type='date'
                name='date'
                flex='1'
                mb={4}
                value={formData.date}
                onChange={handleChange}
              />
            </Field.Root>
            {errors.date && <Text color='red.500'>{errors.date}</Text>}

            <Field.Root orientation='horizontal' required>
              <Field.Label>Reps</Field.Label>
              <Input
                type='number'
                name='repetitions'
                value={formData.repetitions}
                min={0}
                mb={4}
                onChange={handleChange}
              />
            </Field.Root>
            {errors.repetitions && (
              <Text color='red.500'>{errors.repetitions}</Text>
            )}

            <Field.Root orientation='horizontal' required>
              <Field.Label>Sets</Field.Label>
              <Input
                type='number'
                name='sets'
                value={formData.sets}
                min={0}
                mb={4}
                onChange={handleChange}
              />
            </Field.Root>
            {errors.sets && <Text color='red.500'>{errors.sets}</Text>}

            <Field.Root orientation='horizontal' required>
              <Field.Label>Weight</Field.Label>
              <Input
                type='number'
                name='weightUsed'
                value={formData.weightUsed}
                min={0}
                mb={4}
                onChange={handleChange}
              />
            </Field.Root>
            {errors.weightUsed && (
              <Text color='red.500'>{errors.weightUsed}</Text>
            )}

            <Center>
              <Button type='submit' variant='solid' bg='#213A82' color='white'>
                Add An Activity
              </Button>
            </Center>
          </form>
        </Stack>
        {/* </VStack> */}
      </Box>
    </>
  );
};

export default WorkoutForm;
