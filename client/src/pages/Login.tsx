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

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null); // State for error messages

  const createAccount = () => {
    window.location.href = "/Profile";
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(e.target);
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form is submitted");
    setError(null);
    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err: any) {
      if (err) {
        setError(err.message || "An error occurred"); // Display error from API response
        console.error("Failed to login all error", err);
        setError("Username or password is incorrect. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
        //console.error('Failed to l mesage', err.response.data.message);
        console.log("Failed to login else error", err);
      }
      console.error("Failed to login outer loop", err);
      setLoginData({
        email: "",
        password: "",
      });
    }
  };
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='70vh'
      // bg='gray.100'
      padding={4}
    >
      <Card.Root maxW='sm' size='md' color='#213A82' margin='5'>
        <Card.Header>
          <Card.Title> Login</Card.Title>
        </Card.Header>

        <form onSubmit={handleSubmit}>
          <Card.Body>
            <Stack gap='6' maxW='md' css={{ "--field-label-width": "96px" }}>
              <Field.Root orientation='horizontal' required>
                <Field.Label>Email</Field.Label>
                <Input
                  name='email'
                  placeholder='me@example.com'
                  flex='1'
                  value={loginData.email || ""}
                  onChange={handleChange}
                />
              </Field.Root>
              <Field.Root orientation='horizontal' required>
                <Field.Label>Password</Field.Label>
                <Input
                  type='password'
                  name='password'
                  flex='1'
                  value={loginData.password || ""}
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
            {error && <p>{error}</p>}
          </Card.Footer>
        </form>
      </Card.Root>
    </Box>
  );
};

export default Login;
