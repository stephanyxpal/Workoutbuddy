import { Box, Text } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Box
      as='footer'
      bg='#213A82'
      color='white'
      py={4}
      mt='auto'
      textAlign='center'
      position='fixed'
      bottom='0'
      width='100%'
    >
      <Text fontSize='sm'>
        &copy; {new Date().getFullYear()} - Workout Buddy
      </Text>
      {/* </Container> */}
    </Box>
  );
};

export default Footer;
