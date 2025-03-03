import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  useDisclosure,
  Stack,
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
        <Box fontSize='xl' fontWeight='bold'>
          <Link to='/'>🏋️ Workout Buddy</Link>
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

          {/* Mobile Menu Button */}
          <IconButton
            size='md'
            // icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label='Open Menu'
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            ml={2}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          />
        </Flex>
      </Flex>

      {/* Mobile Menu */}
      {isOpen && isAuthenticated && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as='nav' gap={4}>
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={onClose}>
                <Button variant='ghost'>{link.name}</Button>
              </Link>
            ))}
            <Button onClick={handleLogout}>Logout</Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
