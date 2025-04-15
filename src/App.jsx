import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home';
import ContactUs from './pages/ContactUs.jsx';
import {Footer} from "./components/Footer.jsx";
import { useEffect, useState } from 'react';
import HostEventDetails from './pages/HostEvent/Details';
import HostEventBanner from './pages/HostEvent/Banner'; 
import HostEventTicketing from './pages/HostEvent/Ticketing'; 
import HostEventReview from './pages/HostEvent/Review';
import HostEvent from "./pages/HostEvent/HostEvent.jsx";
import ProfileDetails from "./pages/Profile/ProfileDetails.jsx"; 
import PrivateRoute from './components/PrivateRoute';
import MyEvents from "./pages/Organiser/MyEvents.jsx";
import MyTickets from "@/pages/Attendee/MyTickets.jsx";
import EventDetails from "@/pages/Events/EventDetails.jsx";
import Checkout from './pages/Checkout/Checkout.jsx';
import EventStatistics from './pages/Events/EventStats.jsx';
import ExternalEventDetails from "@/pages/Events/ExternalEventDetails.jsx";
import ExploreEventPages from "@/pages/Events/ExploreEventPages.jsx";
import CheckoutReturn from "@/pages/Checkout/CheckoutReturn.jsx";
import RedirectPage from "@/pages/Profile/RedirectPage.jsx";


const App = () => {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const location = useLocation();


    useEffect(() => {
    

        if (location.pathname === '/explore') {
            document.body.classList.add('scrollable'); 
            document.body.classList.remove('no-scroll'); 
        }
        else if (location.pathname === '/host') {
            document.body.classList.add('scrollable');  
            document.body.classList.remove('no-scroll');  
        } else if (location.pathname === '/host') {
          document.body.classList.add('scrollable');
          document.body.classList.remove('no-scroll'); 
       } else {
            document.body.classList.add('scrollable'); 
            document.body.classList.remove('no-scroll'); 
        }

         return () => {
            document.body.classList.remove('scrollable');
            document.body.classList.remove('no-scroll');
             
        };
    }, [location.pathname, isLoggedOut]);




    return (
        <div>
            <main className="main-content">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/contactUs" element={<ContactUs />} />
                    <Route path="/host" element={
                        <PrivateRoute allowedUserType="organiser">
                            <HostEvent />
                        </PrivateRoute>}
                    />
                    <Route path="/host/details" element={
                        <PrivateRoute allowedUserType="organiser">
                            <HostEventDetails />
                        </PrivateRoute>} />
                    <Route path="/host/banner" element={<HostEventBanner />} />
                    <Route path="/host/ticketing" element={<HostEventTicketing />} />
                    <Route path="/host/review" element={<HostEventReview />} />
                    <Route path="/profile" element={<ProfileDetails />} />
                    
                    <Route path="/myEvents" element={
                        <PrivateRoute allowedUserType="organiser">
                            <MyEvents />
                        </PrivateRoute>
                    }
                    />
                    <Route path="/myTickets" element={
                    <PrivateRoute allowedUserType="attendee">
                        <MyTickets />
                    </PrivateRoute>
                    }
                    />
                    <Route path="/explore/category/:categoryName" element={<ExploreEventPages/>} />

                    <Route path="/explore/search/:searchTerm" element={<ExploreEventPages/>} />
                    <Route path="/explore/search" element={<ExploreEventPages/>} />



                    <Route path="/event/:eventName/:eventId" element={
                        <EventDetails />} />
                    <Route path="/event/:eventId" element={
                        
                            <ExternalEventDetails />
                        } />
                    <Route path="/checkout/:eventId" element={<Checkout />} />
                    <Route path="/checkoutReturn" element={<CheckoutReturn />} />
                    <Route path="/events/:eventId/statistics" element={
                        <PrivateRoute allowedUserType="organiser">
                            <EventStatistics />
                        </PrivateRoute>
                    }
                    />
                    
                    <Route path="/redirect" element={<RedirectPage />} />
                </Routes>
            <Footer />
            </main>
        </div>
    )
}

// Wrap App with BrowserRouter in the main index file
const Main = () => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

export default Main
