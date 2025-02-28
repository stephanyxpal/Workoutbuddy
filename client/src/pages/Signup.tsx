import { useState, FormEvent, ChangeEvent } from "react";
import {
  Box,
  Field,
  Input,
  Stack,
  HStack,
  Button,
  Text,
} from "@chakra-ui/react";
import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutation";
import Auth from "../utils/auth";
import type { UserInput } from "../models/User";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState<UserInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    age: 0,
    weight: 0,
    height: 0,
    gender: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const genderList = createListCollection({
    items: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Other", value: "Other" },
    ],
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  // Handle input changes
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let errorMsg = "";
    if (["age", "weight", "height"].includes(name) && isNaN(Number(value))) {
      errorMsg = "Must be a number";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));

    setUserFormData((prevData) => ({
      ...prevData,
      [name]: ["age", "weight", "height"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  // Handle gender selection
  const handleGenderChange = (value: string) => {
    setUserFormData((prevData) => ({
      ...prevData,
      gender: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget;
    console.log("Form submitted");

    // Basic validation
    const newErrors: { [key: string]: string } = {};
    if (!userFormData.firstName.trim()) newErrors.firstName = "Required";
    if (!userFormData.lastName.trim()) newErrors.lastName = "Required";
    if (!userFormData.email.trim()) newErrors.email = "Required";
    if (!userFormData.password.trim()) newErrors.password = "Required";
    if (!userFormData.city.trim()) newErrors.city = "Required";
    if (!userFormData.age || isNaN(Number(userFormData.age)))
      newErrors.age = "Must be a number";
    // if (!userFormData.weight  || isNaN(Number(userFormData.weight)))
    //   newErrors.weight = "Must be a number";
    // if (!userFormData.height || isNaN(Number(userFormData.height)))
    //   newErrors.height = "Must be a number";
    if (!userFormData.gender) newErrors.gender = "Required";
    console.log(userFormData, newErrors);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      console.log("inside the mutation");
      const { data } = await addUser({
        variables: { input: { ...userFormData } },
      });

      Auth.login(data.addUser.token);
      alert("Signup successful!");
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  return (
    <>
      <Text fontSize='2xl' fontWeight='bold' textAlign='center' mb={4}>
        Sign Up
      </Text>
      <Box
        maxW='400px'
        mx='auto'
        p={6}
        bg='gray.100'
        borderRadius='md'
        boxShadow='md'
      >
        <Stack gap={4}>
          <form onSubmit={handleSubmit} noValidate>
            <Field.Root orientation='horizontal' required>
              <Field.Label>First Name</Field.Label>
              <Input
                type='text'
                name='firstName'
                flex='1'
                value={userFormData.firstName}
                onChange={handleInputChange}
              />
            </Field.Root>
            {errors.firstName && (
              <Text color='red.500'>{errors.firstName}</Text>
            )}

            <Field.Root orientation='horizontal' required>
              <Field.Label>Last Name</Field.Label>
              <Input
                type='text'
                name='lastName'
                flex='1'
                value={userFormData.lastName}
                onChange={handleInputChange}
              />
            </Field.Root>
            {errors.lastName && <Text color='red.500'>{errors.lastName}</Text>}

            <Field.Root orientation='horizontal' required>
              <Field.Label>Email</Field.Label>
              <Input
                name='email'
                type='email'
                flex='1'
                value={userFormData.email}
                onChange={handleInputChange}
              />
            </Field.Root>
            {errors.email && <Text color='red.500'>{errors.email}</Text>}

            <Field.Root orientation='horizontal' required>
              <Field.Label>Password</Field.Label>
              <Input
                type='password'
                name='password'
                flex='1'
                value={userFormData.password}
                onChange={handleInputChange}
              />
            </Field.Root>
            {errors.password && <Text color='red.500'>{errors.password}</Text>}

            <Field.Root orientation='horizontal' required>
              <Field.Label>Location</Field.Label>
              <Input
                type='text'
                name='city'
                flex='1'
                value={userFormData.city}
                onChange={handleInputChange}
              />
            </Field.Root>
            {errors.city && <Text color='red.500'>{errors.city}</Text>}

            <Field.Root orientation='horizontal' required>
              <Field.Label>Age</Field.Label>
              <Input
                type='text'
                name='age'
                flex='1'
                value={userFormData.age}
                onChange={handleInputChange}
              />
            </Field.Root>
            {errors.age && <Text color='red.500'>{errors.age}</Text>}

            <HStack gap={3} alignItems='center'>
              <Text fontSize='md' fontWeight='medium'>
                Gender
              </Text>
              <SelectRoot
                collection={genderList}
                size='sm'
                flex='1'
                onValueChange={(e) => handleGenderChange(e.value[0])}
              >
                <SelectTrigger>
                  <SelectValueText placeholder='Select a Gender' />
                </SelectTrigger>
                <SelectContent>
                  {genderList.items.map((gender) => (
                    <SelectItem item={gender} key={gender.value}>
                      {gender.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </HStack>
            {errors.gender && <Text color='red.500'>{errors.gender}</Text>}

            <Button type='submit' variant='solid' bg='#213A82' color='white'>
              Submit
            </Button>
          </form>
        </Stack>
        {error && (
          <Box
            mt={4}
            p={2}
            color='red.700'
            borderRadius='md'
            textAlign='center'
          >
            {error.message}
          </Box>
        )}
      </Box>
    </>
  );
};

export default SignupForm;
