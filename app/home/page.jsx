import React from "react";
import Card from "./card";
import Blogs from "./Blogs";
import ImageWithtext from "./ImageWithtext";
import TaskScheduler from "./Todo";

function HomePage() {
  return (
    <div>
      <Card />
      <Blogs />
      <TaskScheduler />
      <ImageWithtext />
    </div>
  );
}

export default HomePage;
