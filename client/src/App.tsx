//import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import { Provider } from "@/components/ui/provider"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import FitnessGoals from './pages/FitnessGoals';
import Activity from './pages/Activity';
import Profile from './pages/Profile';
import Home from './pages/Home';


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider  value={defaultSystem}>
          <Outlet />
          <FitnessGoals/>
          <Activity />
          <Profile />
          <Home />
       </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;