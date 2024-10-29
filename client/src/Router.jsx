import { createBrowserRouter } from 'react-router-dom';
import {
    CreateAuctionPage,
    LandingPage,
    HomeLayoutPage,
    ErrorPage,
    AuctionsPage,
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
                element: <CreateAuctionPage />
            },
            {
                path: '/auctions',
                element: <AuctionsPage />
            },
        ]

    }
])