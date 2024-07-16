import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar.jsx';
import UploadBookData from "./PostingPage/UploadBookData.jsx";
import Profile from "./profilePage/profile.jsx";
import LandingBooks from './booksPage/MainBooks.jsx';
import Landing from './LandingPage/Landing.jsx';
import LoginPage from "./LandingPage/Login.jsx";
import CreateAccount from "./LandingPage/CreateAccount.jsx";
import UserProfile from "./UserProfilePage/UserProfile.jsx";
import LandingEBooks from './booksPage/E-Books.jsx';
import BulkUploadData from './PostingPage/UploadBulkBookData.jsx';
import MessageTab from './MessagePage/MessageTab.jsx';
import UploadEBookData from './PostingPage/UploadEbookData.jsx';
import BulkEBookUploadData from './PostingPage/UploadBulkEBookData.jsx';
import BookDetails from './booksPage/BookDetails.jsx';
import EBookDetails from './booksPage/EBookDetails.jsx';
import ViewOrders from './components/ViewOrders.jsx';
import MyEbooksTab from './components/MyEbooksTab.jsx';
import AdminPanel from './AdminPage/AdminLanding.jsx';
import AdminPostApproval from './AdminPage/AdminPostApproval.jsx';
import AdminViewAccount from './AdminPage/AdminViewAccounts.jsx';
import ForgotPassword from './LandingPage/ForgotPassword.jsx';
import UpdateForgotPassword from './LandingPage/NavigateUpdatePass.jsx';

function Layout() {
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
            element: <LoginPage /> 
        },
        { 
            path: '/CreateAccount', 
            element: <CreateAccount /> 
        },
        {
            path: '/ForgotPassword',
            element: <ForgotPassword/>
        },
        { 
            path: '/userProfile/:userName',
            element: <UserProfile /> 
        },
        { 
            path: '/message', 
            element: <MessageTab /> 
        },
        { 
            path: '/books', 
            element: <LandingBooks /> 
        },
        { 
            path: '/e-books', 
            element: <LandingEBooks /> 
        },
        { 
            path: '/myprofile', 
            element: <Profile /> 
        },
        { 
            path: '/uploadBooks', 
            element: <UploadBookData /> 
        },
        { 
            path: '/books/:detailsID', 
            element: <BookDetails /> 
        },
        { 
            path: '/e-books/:detailsID', 
            element: <EBookDetails /> 
        },
        { 
            path: '/uploadEBooks', 
            element: <UploadEBookData /> 
        },
        { 
            path: '/bulkupload', 
            element: <BulkUploadData /> 
        },
        { 
            path: '/bulkEbookUpload', 
            element: <BulkEBookUploadData />
        },
        { 
            path: '/viewOrders', 
            element: <ViewOrders /> 
        },
        {
            path: '/MyEbooks', 
            element: <MyEbooksTab /> 
        },
        {
            path: '/ForgotPassword/Update',
            element: <UpdateForgotPassword/>
        },
        {
            path: '/AdminPanel',
            element: <AdminPanel />,
            children: [
            { 
                path: 'ViewAccounts', 
                element: <AdminViewAccount /> 
            },
            { 
                path: 'PostApproval', 
                element: <AdminPostApproval /> 
            }
            ]
        }
        ]
    }
]);

export default router;
