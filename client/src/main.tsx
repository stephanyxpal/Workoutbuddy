import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import NotFound from './pages/Notfound';
import Activity from './pages/activity';
import FitnessGoals from './pages/FitnessGoals';
import Profile from './pages/Profile';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/activity',
        element: <Activity />
      },
      {
        path: '/FitnessGoals',
        element: <FitnessGoals />
      },
      {
        path: '/Profile',
        element: <Profile />
      },

    ],
  },
]);

const rootElement = document.getElementById('root');

if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}
else{
  console.log("No root element")
}
