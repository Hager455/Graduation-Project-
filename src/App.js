import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout'
import ErrorPage from './pages/ErrorPage.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Results from './pages/Results.jsx'
import Elections from './pages/Elections.jsx'
import ElectionDetails from './pages/ElectionDetails.jsx'
import Candidates from './pages/Candidates.jsx'
import Logout from './pages/Logout.jsx'
import Congrats from './pages/Congrats.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
      index: true,
      element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "results",
        element: <Results />
      },
      {
        path: "elections",
        element: <Elections />
      },
      {
        path: "elections/:id",
        element: <ElectionDetails />
      },
      {
        path: "elections/:id/candidates",
        element: <Candidates />
      },
      {
        path: "congrats",
        element: <Congrats />
      },
      {
        path: "Logout",
        element: <Logout />
      },

    ]
  }
  
])



function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
