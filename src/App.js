import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navigation from "./components/Navigation";
import HomePage from './pages/HomePage.js';
import BookingCreatePage from './pages/BookingCreatePage.js';
import BookingEditPage from './pages/BookingEditPage';
import BookingListPage from './pages/BookingListPage';
import CustomerCreatePage from './pages/CustomerCreatePage';
import CustomerEditPage from './pages/CustomerEditPage';
import CustomerListPage from './pages/CustomerListPage';
import DroneShotCreatePage from './pages/DroneShotCreatePage';
import DroneShotEditPage from './pages/DroneShotEditPage';
import DroneShotListPage from './pages/DroneShotListPage';
import DroneSiteCreatePage from './pages/DroneSiteCreatePage';
import DroneSiteEditPage from './pages/DroneSiteEditPage';
import DroneSiteListPage from './pages/DroneSiteListPage';
// import NotFoundPage from './pages/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Navigation></Navigation>
        <Container className="my-3">
          <Routes>
            <Route path="/" element={<HomePage />} />
    <Route path="/bookings/create" element={<BookingCreatePage />} />
    <Route path="/bookings/:id/edit" element={<BookingEditPage />} />
    <Route path="/bookings" element={<BookingListPage />} />
    <Route path="/customers/create" element={<CustomerCreatePage />} />
    <Route path="/customers/:id/edit" element={<CustomerEditPage />} />
    <Route path="/customers" element={<CustomerListPage />} />
    <Route path="/drone-shots/create" element={<DroneShotCreatePage />} />
    <Route path="/drone-shots/:id/edit" element={<DroneShotEditPage />} />
    <Route path="/drone-shots" element={<DroneShotListPage />} />
    <Route path="/drone-sites/create" element={<DroneSiteCreatePage />} />
    <Route path="/drone-sites/:id/edit" element={<DroneSiteEditPage />} />
    <Route path="/drone-sites" element={<DroneSiteListPage />} />
    {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </Container>
    </>
  );
}

export default App;
