("use client");
import {
  Input,
  Stack,
  Field,
  Text,
  Textarea,
  Box,
  Center,
} from "@chakra-ui/react";

import image2 from "../assets/image2.jpg";

import Auth from "../utils/auth";
import { Me } from "../utils/queries";
import { useQuery } from "@apollo/client";

const Profile = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return false;
  }

  const { loading, error, data } = useQuery(Me);
  //const [updateUser] = useMutation(UPDATE_USER);
  if (!loading) {
    console.log(data);
    console.log(error);
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(data);
  };

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
                // onChange={handleChange}
                bg='gray.50'
                readOnly
              />
            </Field.Root>

            {/* Age Input */}
            <Field.Root orientation='horizontal' required>
              <Field.Label>Age</Field.Label>
              <Input bg='gray.50' value={data?.me.age} readOnly />
            </Field.Root>

            {/* Weight Input */}
            <Field.Root orientation='horizontal' required>
              <Field.Label>Weight</Field.Label>
              <Input bg='gray.50' value={data?.me.weight} readOnly />
            </Field.Root>

            {/* Height Input */}
            <Field.Root orientation='horizontal' required>
              <Field.Label>Height</Field.Label>
              <Input value={data?.me.height} bg='gray.50' readOnly />
            </Field.Root>

            {/* Goal Description */}
            <Field.Root orientation='horizontal' required>
              <Field.Label>Goal</Field.Label>
              <Textarea
                value={data?.me.goals[0]?.goalText}
                readOnly
                // bg='gray.50'
              />
            </Field.Root>
            {/* <Field.Root orientation='horizontal' required>
              <Field.Label>Status </Field.Label>
              <Input value={data?.me.goals[0]?.status} readOnly />
            </Field.Root>

            <Field.Root orientation='horizontal' required>
              <Field.Label>Priority </Field.Label>
              <Input value={data?.me.goals[0]?.priority} readOnly />
            </Field.Root> */}

            <Field.Root orientation='horizontal' required>
              <Field.Label>TargetDate </Field.Label>
              <Input value={data?.me.goals[0]?.targetDate} readOnly />
            </Field.Root>

            <Field.Root orientation='horizontal' required mb={30}>
              <Field.Label>Progress </Field.Label>
              <Input value={data?.me.goals[0]?.progress} readOnly />
            </Field.Root>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Profile;
