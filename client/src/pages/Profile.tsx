import { useState, FormEvent, useEffect } from "react";
("use client");
// import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input"
import {
  Input,
  NumberInputRoot,
  Button,
  NativeSelect,
  Stack,
  Field,
  Text,
  Textarea,
  Box,
  Center,
  Image,
} from "@chakra-ui/react";
// import {
//   FormControl,
//   FormLabel,
//   FormErrorMessage,
//   FormHelperText,
// } from "@chakra-ui/form-control";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/number-input";
import image2 from "../assets/image2.jpg";

//import { useMutation } from "@apollo/client";
//import { UPDATE_USER } from "../utils/mutation";
import Auth from "../utils/auth";
import { Me } from "../utils/queries";
import { useQuery } from "@apollo/client";

const Profile = () => {
  const { loading, error, data } = useQuery(Me);
  //const [updateUser] = useMutation(UPDATE_USER);
  if (!loading) {
    console.log(data);
  }
  // const [data, setUserData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  //   city: "",
  //   age: 0,
  //   weight: 0,
  //   height: 0,
  //   gender: "",
  //   goalText: "",
  //   description: "",
  //   status: "",
  //   priority: "",
  //   targetDate: "",
  //   startDate: "",
  //   progress: 0,
  // });

  // useEffect(() => {
  //   if (data) {
  //     setUserData({
  //       ...data.getUser,
  //       targetDate: data.getUser.targetDate?.split("T")[0] || "",
  //       startDate: data.getUser.startDate.split("T")[0],
  //     });
  //   }
  // }, [data]);

  // // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    // setUserData({ ...userData, [name]: value });
  };

  // Handle number input changes
  const handleNumberChange = (
    valueAsString: string,
    valueAsNumber: number,
    field: string
  ) => {
    // setUserData({ ...userData, [field]: valueAsNumber });
    console.log(data);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(data);

    //    await updateUser({
    //       variables: {
    //         input: {
    //           ...userData,
    //           age: Number(userData.age),
    //           weight: Number(userData.weight),
    //           height: Number(userData.height),
    //         },
    //       },
    //     });
    //     alert("Profile updated successfully!");
    //   } catch (err) {
    //     console.error(err);
    //     alert("Error updating profile.");
    //   }
  };

  // if (loading) return <Text>Loading...</Text>;
  // if (error) return <Text>Error loading profile.</Text>;

  return (
    <Box
      maxW='600px'
      mx='auto'
      p={6}
      bg='gray.100'
      borderRadius='lg'
      boxShadow='lg'
      bgImage={image2}
      bgSize='cover'
      // position='center'
      // bgRepeat='no-repeat'
      // display='flex'
    >
      {/* Title inside a box */}
      <Center mb={6}>
        <Text fontSize='2xl' fontWeight='bold' color='blue.700'>
          Profile
        </Text>
      </Center>

      {/* Form Container */}
      <Box p={6} bg='white' borderRadius='lg' boxShadow='md'>
        <form onSubmit={handleSubmit}>
          <Stack gap={6}>
            {/* Non-editable Fields */}
            <Field.Root orientation='horizontal' required>
              <Field.Label>First Name </Field.Label>
              <Input
                placeholder='First Name'
                value={data?.me.firstName}
                readOnly
              />
            </Field.Root>

            <Field.Root orientation='horizontal' required>
              <Field.Label>Last Name </Field.Label>
              <Input
                placeholder='Last Name'
                value={data?.me.lastName}
                readOnly
              />
            </Field.Root>

            <Field.Root orientation='horizontal' required>
              <Field.Label>Email </Field.Label>
              <Input placeholder='Email' value={data?.me.email} readOnly />
            </Field.Root>

            <Field.Root orientation='horizontal' required>
              <Field.Label>City</Field.Label>
              {/* Editable Fields */}
              <Input
                placeholder='City'
                name='city'
                value={data?.me.city}
                onChange={handleChange}
                bg='gray.50'
              />
            </Field.Root>

            {/* Age Input */}
            <Field.Root orientation='horizontal' required>
              <Field.Label>Age</Field.Label>
              <NumberInput
                min={10}
                allowMouseWheel
                // format={(value) => `${value} Years`}
                // format={(value) => `${value} lbs`}
                bg='gray.50'
                value={data?.me.age}
                onChange={(valStr, valNum) =>
                  handleNumberChange(valStr, valNum, "age")
                }
              >
                <NumberInputField placeholder='Age' bg='gray.50' />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Field.Root>

            {/* Weight Input */}
            <Field.Root orientation='horizontal' required>
              <Field.Label>Weight</Field.Label>
              <NumberInput
                min={10}
                allowMouseWheel
                // format={(value) => `${value} lbs`}
                value={data?.me.weight}
                onChange={(valStr, valNum) =>
                  handleNumberChange(valStr, valNum, "weight")
                }
              >
                <NumberInputField placeholder='Age' bg='gray.50' />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Field.Root>

            {/* Height Input */}
            <Field.Root orientation='horizontal' required>
              <Field.Label>Height</Field.Label>
              <NumberInput
                min={90}
                allowMouseWheel
                // format={(value) => `${value} cm`}
                value={data?.me.height}
                onChange={(valStr, valNum) =>
                  handleNumberChange(valStr, valNum, "height")
                }
              >
                <NumberInputField placeholder='Height' bg='gray.50' />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Field.Root>

            {/* Goal Description */}
            <Field.Root orientation='horizontal' required>
              <Field.Label>Goal</Field.Label>
              <Textarea
                placeholder='Enter your goal description...'
                name='description'
                value={data?.me.goals[0]?.goalText}
                onChange={handleChange}
                bg='gray.50'
              />
            </Field.Root>
            <Field.Root orientation='horizontal' required>
              <Field.Label>Status </Field.Label>
              <Input value={data?.me.goals[0]?.status} readOnly />
            </Field.Root>

            <Field.Root orientation='horizontal' required>
              <Field.Label>Priority </Field.Label>
              <Input value={data?.me.goals[0]?.priority} readOnly />
            </Field.Root>

            <Field.Root orientation='horizontal' required>
              <Field.Label>TargetDate </Field.Label>
              <Input value={data?.me.goals[0]?.targetDate} readOnly />
            </Field.Root>

            <Field.Root orientation='horizontal' required>
              <Field.Label>Progress </Field.Label>
              <Input value={data?.me.goals[0]?.progress} readOnly />
            </Field.Root>
            {/* Centered Update Button */}
            <Center>
              <Button type='submit' colorScheme='blue' size='lg' w='50%'>
                Update
              </Button>
            </Center>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Profile;
