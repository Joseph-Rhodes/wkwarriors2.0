import React from "react";
import NewSections from "./Components/Homepage/NewSections";
import AboutUs from "./Components/Homepage/AboutUs"
import UpcomingSchedule from "./Components/Homepage/UpcomingSchedule"
import MediaSection from "./Components/Homepage/MediaSection"
import RegisterSection from "./Components/Homepage/Register";



const App = () => {
  return (
    <div>
      <NewSections />
      <AboutUs />
      <RegisterSection />
      <UpcomingSchedule />
      <MediaSection /> 
    </div>
  );
};

export default App;