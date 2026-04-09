import fs from "fs/promises";
import React from "react";

const SubmitEvent = async (e) => {
  "use server";
  console.log(e.get("name"), e.get("email"), e.get("num"), e.get("add"));
  await fs.writeFile(
    "data.txt",
    `Name: ${e.get("name")}, Email: ${e.get("email")}, Number: ${e.get("num")}, Address: ${e.get("add")}\n`,
    { flag: "a" },
  );
};

function Form() {
  return (
    <div className="w-[300px] bg-red-100 p-6 rounded-lg shadow-md mx-auto">
      <form action={SubmitEvent}>
        <div className=" p-4 rounded">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-black text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="p-4 rounded">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-black text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="p-4 rounded">
          <label htmlFor="num">Number</label>
          <input
            type="phone"
            id="num"
            name="num"
            className="bg-black text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="p-4 rounded">
          <label htmlFor="add">Address</label>
          <input
            type="text"
            id="add"
            name="add"
            className="bg-black text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
