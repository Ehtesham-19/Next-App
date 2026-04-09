"use client";

import React from "react";
import Card from "./card";
import Blogs from "./Blogs";
import ImageWithtext from "./ImageWithtext";
import TaskScheduler from "./Todo";
import { Button } from "@/components/ui/button";

function HomePage() {
  return (
    <div>
      <Card />
      <Blogs />
      <TaskScheduler />
      <ImageWithtext />
      <Button variant="outline">Text</Button>
    </div>
  );
}

export default HomePage;
