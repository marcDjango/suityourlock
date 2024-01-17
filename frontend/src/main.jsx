import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
import App from "./App";
import RootLayout from "./RootLayout";
=======
import Login, { authenticate } from "./pages/Login/Loginpage";
import Register, { enrolment } from "./pages/Register/Register";
import RootLayout from "./RootLayout";
import App from "./App";
import Card from "./components/Card/Card";
>>>>>>> d156f6684d1ef39ca324c358eaae8b6d962b8ea7

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<App />} />
      {/* <Route path="list-cards" element={<Card />} /> */}
      <Route path="list-cards/card" element={<Card />} />
      {/* <Route path="show-product" element={<ShowProduct />} /> */}
      {/* <Route path="Contact" element={<Contact />} /> */}
      <Route path="/register" element={<Register />} action={enrolment} />
      <Route path="/login" element={<Login />} action={authenticate} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
