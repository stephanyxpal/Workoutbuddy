import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  Image,
  HStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import Auth from "../utils/auth";

const Home = () => {
  const navigate = useNavigate();

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return false;
  }

  return (
    <Box minH='100vh'>
      {/* Half-page Image */}
      <Box h='50vh' bg='gray.200'>
        <Image
          src={image1}
          alt='Fitness Tracker'
          objectFit='cover'
          w='100%'
          h='100%'
        />
      </Box>

      {/* Content Below Image */}
      <Flex direction='column' align='center' textAlign='center' p={6}>
        <Text fontSize='2xl' fontWeight='bold' color='blue.700' mb={4}>
          It’s time to{" "}
          <Text as='span' color='red.500'>
            GET REAL
          </Text>{" "}
          about your health.
        </Text>

        <VStack gap={6} maxW='600px'>
          <Text fontSize='lg'>
            Track your workouts, monitor progress, and achieve your fitness
            goals with ease.
          </Text>
          <Button as={Link} to='/getactivity' colorScheme='blue' size='lg'>
            Get Started
          </Button>
          <Text fontSize='2xl' fontWeight='semibold'>
            Your Progress 📊
          </Text>
          <Text fontSize='lg' color='gray.600' mt={2}>
            🔥 Total Calories Burned: <strong>3200</strong>
          </Text>
          <Text fontSize='lg' color='gray.600'>
            ⏳ Total Workouts Logged: <strong>15</strong>
          </Text>
          <Text fontSize='lg' color='gray.600'>
            🏆 Streak: <strong>7 Days</strong>
          </Text>
        </VStack>
      </Flex>
      <Box
        p={4}
        borderRadius='lg'
        boxShadow='md'
        bg='gray.50'
        textAlign='center'
        h='50vh'
        mt={6}
      >
        <Box h='50vh' bg='gray.200'>
          <Image
            src={image2}
            alt='Fitness Tracker'
            objectFit='cover'
            w='100%'
            h='100%'
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
