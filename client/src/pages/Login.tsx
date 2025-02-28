import { useMutation } from "@apollo/client";

import { LOGIN_USER } from "../utils/mutation";
import type { UserLogin } from "../models/User";
import { useState, FormEvent, ChangeEvent } from "react";
import {
  Box,
  Field,
  Input,
  Stack,
  //Fieldset,
  Button,
  Card,
} from "@chakra-ui/react";
import Auth from "../utils/auth";

const LoginForm = () => {
  //   const [loginData, setLoginData] = useState({
  //     email: "",
  //     password: "",
  //   });
  //const [error, setError] = useState<string | null>(null); // State for error messages
  const [userFormData, setUserFormData] = useState<UserLogin>({
    email: "",
    password: "",
  });
  // const [validated] = useState(false);
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [showAlert, setShowAlert] = useState(false);

  const createAccount = () => {
    window.location.href = "/signupForm";
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(e.target);
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    console.log("form is submitted");
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    //setError(null);
    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
    } catch (err: any) {
      console.error(err);
      setShowAlert(true);
      if (err) {
        // setError(err.message || "An error occurred"); // Display error from API response
        console.error("Failed to login all error", err);
        setShowAlert(true);
        console.log(data);
        // setError("Username or password is incorrect. Please try again.");
      } //else {
      // setError("An unexpected error occurred. Please try again.");
      //console.error('Failed to l mesage', err.response.data.message);
      // console.log("Failed to login else error", err);
    }
    //console.error("Failed to login outer loop", err);
    setUserFormData({
      email: "",
      password: "",
    });
  };
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='80vh'
      // bg='gray.100'
      padding={4}
    >
      <Card.Root
        maxW='sm'
        size='md'
        color='#213A82'
        minH='400px'
        margin='5'
        boxShadow='lg'
        borderRadius='lg'
      >
        <Card.Header>
          <Card.Title textAlign='center' fontSize='2xl' fontWeight='bold'>
            {" "}
            Login
          </Card.Title>
        </Card.Header>

        <form onSubmit={handleSubmit} noValidate>
          <Card.Body>
            <Stack gap='6' maxW='md' css={{ "--field-label-width": "96px" }}>
              <Field.Root orientation='horizontal' required>
                <Field.Label>Email</Field.Label>
                <Input
                  name='email'
                  placeholder='me@example.com'
                  flex='1'
                  value={userFormData.email || ""}
                  onChange={handleChange}
                />
              </Field.Root>
              <Field.Root orientation='horizontal' required>
                <Field.Label>Password</Field.Label>
                <Input
                  type='password'
                  name='password'
                  flex='1'
                  value={userFormData.password || ""}
                  onChange={handleChange}
                />
              </Field.Root>
            </Stack>
          </Card.Body>
          <Card.Footer justifyContent='space-around'>
            <Button type='submit' variant='solid' bg='#213A82'>
              Sign in
            </Button>
            {/* Create An Account{" "} */}
            <Button variant='solid' bg='#213A82' onClick={createAccount}>
              Create Account
            </Button>
          </Card.Footer>
        </form>
        {error && showAlert && (
          <Box
            mt={4}
            p={2}
            // bg='red.100'
            color='red.700'
            borderRadius='md'
            textAlign='center'
            // boxShadow='md'
          >
            Username or password is incorrect. Please try again.
          </Box>
        )}
      </Card.Root>
    </Box>
  );
};

export default LoginForm;
