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
import Team from "./Pages/Team";
import TeamRecords from "./Pages/Team/TeamRecords";
import Stats from "./Pages/Team/Stats";
import Schedule from "./Pages/Schedule";
import News from "./Pages/News";
import LatestNews from "./Pages/News/LatestNews";
import Photos from "./Pages/Media/Photos";
import Videos from "./Pages/Media/Videos";
import GalleryPage from "./Components/Photos/GalleryPage";



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
        path: "roster",
        element: <Team />,
      },
      {
        path: "team-records",
        element: <TeamRecords />,
      },
      {
        path: "stats",
        element: <Stats />,
      },
      {
        path: "schedule",
        element: <Schedule />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "latest-news",
        element: <LatestNews />,
      },
      {
        path: "photos",
        element: <Photos />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "videos",
        element: <Videos />,
      },
      {
        path: "gallery/:id",
        element: <GalleryPage />,
      },
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
