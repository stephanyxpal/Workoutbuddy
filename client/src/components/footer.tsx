import { Box, Button, Container, Text } from "@chakra-ui/react";
//import { useLocation, useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  // const location = useLocation();
  // const navigate = useNavigate();

  // const handleGoBack = () => {
  //   if (window.history.length > 1) {
  //     navigate(-1);
  //   } else {
  //     navigate("/");
  //   }
  // };

  return (
    <Box
      as='footer'
      bg='gray.800'
      color='white'
      py={4}
      mt='auto'
      textAlign='center'
      // position='absolute'
      position='fixed'
      bottom='0'
      width='100%'
    >
      {/* <Container maxW='container.md'>
        {location.pathname !== "/" && (
          <Button colorScheme='teal' mb={3} onClick={handleGoBack}>
            &larr; Go Back
          </Button>
        )} */}
      <Text fontSize='sm'>
        &copy; {new Date().getFullYear()} - Workout Buddy
      </Text>
      {/* </Container> */}
    </Box>
  );
};

export default Footer;
