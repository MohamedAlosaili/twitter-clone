import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import WindowContextProvider from "context/WindowContext";
import UserContextProvider from "context/UserContent";
import { getUserPrefer } from "utils/userPreference";

// Pages
import Home from "pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="home" element={<Home />} />
      <Route path="explore" element={<div>Search</div>} />
      <Route path=":username" element={<div>Profile</div>} />
    </Route>
  )
);

getUserPrefer();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <WindowContextProvider>
        <RouterProvider router={router} />
      </WindowContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
