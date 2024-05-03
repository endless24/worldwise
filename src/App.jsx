// import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CityList from "./component/CityList";
import CountryList from "./component/CountryList";
import City from "./component/City";
import Form from "./component/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";

import ProtectedRoute from "./pages/ProtectedRoute";
import PreventRoute from "./pages/PreventRoute";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PreventRoute>
                  <HomePage />
                </PreventRoute>
              }
            />
            <Route
              path="/product"
              element={
                <PreventRoute>
                  <Product />
                </PreventRoute>
              }
            />
            <Route
              path="/pricing"
              element={
                <PreventRoute>
                  <Pricing />
                </PreventRoute>
              }
            />
            <Route
              path="login"
              element={
                <PreventRoute>
                  <Login />
                </PreventRoute>
              }
            />
            <Route
              path="register"
              element={
                <PreventRoute>
                  <Register />
                </PreventRoute>
              }
            />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* defual route */}
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            {/* handling error when user vite wrog route */}
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
