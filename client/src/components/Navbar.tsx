import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Goals", path: "/fitnessgoals" },
  { name: "Activity", path: "/activity" },
  { name: "Profile", path: "/profile" },
];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(Auth.loggedIn());
  }, []);

  const handleLogout = () => {
    Auth.logout();
    setIsAuthenticated(false);
  };

  return (
    <Box bg='#213A82' px={4} color='white' borderRadius={2}>
      <Flex h={16} alignItems='center' justifyContent='space-between'>
        {/* Logo */}
        <Box fontSize='4xl' fontWeight='bold'>
          {" "}
          <Heading as='h1' size='4xl'>
            <Link to='/'>🏋️ Workout Buddy</Link>{" "}
          </Heading>
        </Box>

        {/* Desktop Menu */}
        <Flex alignItems='center'>
          {isAuthenticated ? (
            <Stack
              as='nav'
              direction='row'
              gap={4}
              display={{ base: "none", md: "flex" }}
            >
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path}>
                  <Button
                    variant='ghost'
                    color='white'
                    _hover={{ bg: "#182B62" }}
                  >
                    {link.name}
                  </Button>
                </Link>
              ))}
              <Button
                variant='ghost'
                color='white'
                _hover={{ bg: "#182B62" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Stack>
          ) : (
            <Link to='/login'>
              <Button variant='ghost' color='white' _hover={{ bg: "#182B62" }}>
                Login
              </Button>
            </Link>
          )}

          <IconButton
            size='md'
            aria-label='Toggle Navigation'
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            ml={2}
          >
            {isOpen ? <CloseIcon /> : <HamburgerIcon />}
          </IconButton>
        </Flex>
      </Flex>

      {/* Mobile Menu */}
      {/* {isOpen && isAuthenticated && ( */}
      {isOpen}
      <Box pb={4} display={{ md: "none" }}>
        <Stack as='nav' gap={4}>
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={onClose}>
              <Button variant='ghost'>{link.name}</Button>
            </Link>
          ))}
          <Button colorScheme='yellow' onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Box>
      {/* )} */}
    </Box>
  );
};

export default Navbar;
