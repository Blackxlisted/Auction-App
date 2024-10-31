import { createBrowserRouter, Navigate, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
    CreateAuctionPage,
    LandingPage,
    HomeLayoutPage,
    ErrorPage,
    AuctionsPage,
    AuctionItemPage,
} from "./pages/index";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayoutPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: '/create-auction',
                element: (
                    <PrivateRoute>
                        <CreateAuctionPage />
                    </PrivateRoute>
                )
            },
            {
                path: '/auctions',
                element: (
                    <PrivateRoute>
                        <AuctionsPage />
                    </PrivateRoute>
                ),
                children: [
                    {
                        path: ':id', 
                        element: <AuctionItemPage />
                    }
                ]
            },
        ]

    }
])


function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth0();
    return isAuthenticated ? children : <Navigate to="/"/>;
}