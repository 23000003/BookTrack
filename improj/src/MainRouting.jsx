import { useState } from "react";
import {createBrowserRouter} from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import UploadData from "./PostingPage/UploadData.jsx";
import Profile from "./profilePage/profile.jsx";
import LandingBooks from './booksPage/LandingBooks.jsx';
import Landing from './LandingPage/Landing.jsx';
import LoginPage from "./LandingPage/Login.jsx";
import CreateAccount from "./LandingPage/CreateAccount.jsx";
import UserProfile from "./UserProfilePage/UserProfile.jsx";

function Layout(){
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {
        path: '/login',
        element: <LoginPage/>
      },
      {
        path: '/CreateAccount',
        element: <CreateAccount/>
      },
      {
        path: '/UserProfile',
        element: <UserProfile/>
      },
      {
        path: '/books',
        element: <LandingBooks />
      },
      {
        path: '/myprofile',
        element: <Profile />
      },
      {
        path: '/upload',
        element: <UploadData />
      }
    ]
  }
]);

export default router;