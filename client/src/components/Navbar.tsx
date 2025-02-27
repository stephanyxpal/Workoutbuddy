import { useState } from "react";
import {
  Box,
  Flex,
  //HStack,
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

const Navbar: React.FC = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const [isAuthenticated, setIsAuthenticated] = useState(Auth.loggedIn());

  return (
    <Box bg='#213A82' px={4} color='white' borderRadius={2}>
      <Flex h={16} alignItems='center' justifyContent='space-between'>
        {/* Logo */}
        <Box fontSize='xl' fontWeight='bold'>
          <Link to='/'>🏋️ Workout Buddy</Link>
        </Box>

        {/* Desktop Menu */}
        <Stack as='nav' direction='row' display={{ base: "none", md: "flex" }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              style={{ textDecoration: "none" }}
            >
              <Button variant='ghost' color='white' _hover={{ bg: "#182B62" }}>
                {link.name}
              </Button>
            </Link>
          ))}
          <Button
            colorScheme='yellow'
            onClick={() => setIsAuthenticated(!isAuthenticated)}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </Button>
        </Stack>

        {/* Mobile Menu Button */}
        <IconButton
          size='md'
          children={open ? <CloseIcon /> : <HamburgerIcon />}
          aria-label='Open Menu'
          display={{ md: "none" }}
          onClick={open ? onClose : onOpen}
        />
      </Flex>

      {/* Mobile Menu */}
      {open && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as='nav'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={onClose}
                style={{ textDecoration: "none" }}
              >
                <Button variant='ghost'>{link.name}</Button>
              </Link>
            ))}
            <Button
              colorScheme='yellow'
              onClick={() => setIsAuthenticated(!isAuthenticated)}
            >
              {isAuthenticated ? "Logout" : "Login"}
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
