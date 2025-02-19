import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Pages/Root";
import ErrorPage from "./error-page";
import PhotosPage from "./Components/Photos/PhotosPage";
import Contact from "./Components/Contact/Contact";
import GalleryPage from "./Components/Photos/GallergyPage";
import Video from "./Components/Video/Video";
import Stats from "./Components/Stats/Stats";
import Roster from "./Components/Roster/Roster";
import TeamRecords from "./Components/TeamRecords/records"



const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/photos",
        element: <PhotosPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/photos/:folderName",
        element: <GalleryPage />,
      },
      {
        path: "/videos",
        element: <Video />,
      },
      {
        path: "/roster",
        element: <Roster />,
      },
      {
        path: "/stats",
        element: <Stats />,
      },
      {
        path:"/team-records",
        element: <TeamRecords />
      }
      
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
