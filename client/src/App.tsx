//import './App.css';
import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
// import { Provider } from "@/components/ui/provider"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { setContext } from "@apollo/client/link/context";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

// import FitnessGoals from './pages/FitnessGoals';
// import Activity from './pages/activity';
// import Profile from './pages/Profile';
// import Home from './pages/Home';
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  console.log("App component rendered");
  return (
    //<Flex direction='column' minHeight='100vh'>
    <ApolloProvider client={client}>
      <ChakraProvider value={defaultSystem}>
        <Flex direction='column' minHeight='100vh'>
          <Navbar />
          <Box flex='1'>
            <Outlet />
          </Box>
          <Footer />
        </Flex>
      </ChakraProvider>
    </ApolloProvider>
    //</Flex>
  );
}

export default App;
