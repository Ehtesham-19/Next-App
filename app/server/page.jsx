import React from "react";
import { ServerFunction } from "../utils/server-utils";
import ImageSlider from "../components/slider";

function Server() {
  const result = ServerFunction();
  return (
    <div className="bg-blue-300">
      Server {result}
      <ImageSlider />
    </div>
  );
}

export default Server;
