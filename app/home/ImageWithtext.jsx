"use client";

import React from "react";

function ImageWithtext() {
  return (
    <div className="w-full flex">
      <div className="w-[50%] p-4">
        <img
          src="https://images.pexels.com/photos/2882507/pexels-photo-2882507.jpeg"
          alt="Image"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="w-[50%] p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Image with Text</h1>
          <p className="text-gray-600">
            This is an example of an image with accompanying text. The image is
            displayed on the left, while the text is on the right. You can
            customize the content and styling as needed.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ImageWithtext;
