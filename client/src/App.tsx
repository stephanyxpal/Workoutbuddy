//import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import { Provider } from "@/components/ui/provider"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider  value={defaultSystem}>
          <Outlet />
       </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
