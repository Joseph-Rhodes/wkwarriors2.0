import React from "react";
import NewsSection from "./Components/Homepage/NewsSection"
import AboutUs from "./Components/Homepage/AboutUs"
import UpcomingSchedule from "./Components/Homepage/UpcomingSchedule"
import MediaSection from "./Components/Homepage/MediaSection"



const App = () => {
  return (
    <div>
      <NewsSection />
      <AboutUs />
      <UpcomingSchedule />
      <MediaSection /> 
    </div>
  );
};

export default App;