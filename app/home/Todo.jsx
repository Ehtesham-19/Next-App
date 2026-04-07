//index.js
"use client";

import { useState } from "react";
import React from "react";
import Head from "next/head";
import { toast } from "react-toastify";

export default function TaskScheduler() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskPriority, setTaskPriority] = useState("Top");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleTaskPriorityChange = (e) => {
    setTaskPriority(e.target.value);
  };

  const handleTaskDeadlineChange = (e) => {
    setTaskDeadline(e.target.value);
  };

  const addTask = () => {
    if (taskName.trim() === "" || taskDeadline === "") {
      toast.error("Please enter a task and select a valid deadline.");
      return;
    }

    const selectedDate = new Date(taskDeadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      toast.error ("Please select a future date for the deadline.");
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      task: taskName,
      priority: taskPriority,
      deadline: taskDeadline,
      done: false,
    };

    setTasks([...tasks, newTask]);

    setTaskName("");
    setTaskPriority("Top");
    setTaskDeadline("");
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    setTaskName(taskToEdit.task);
    setTaskPriority(taskToEdit.priority);
    setTaskDeadline(taskToEdit.deadline);
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
  };

  const markDone = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: true } : task,
    );
    setTasks(updatedTasks);

    const completedTask = tasks.find((task) => task.id === id);
    if (completedTask) {
      setCompletedTasks([...completedTasks, completedTask]);
    }
  };

  const filteredTasks = tasks
    .filter((task) => !task.done)
    .filter((task) => task.task.toLowerCase().includes(searchKeyword.toLowerCase()))
    .filter((task) => (filterPriority ? task.priority === filterPriority : true));

  return (
    <div className="mx-auto my-8 max-w-3xl rounded-2xl bg-white p-5 shadow-lg">
      <Head>
        <title>Task Management - Geeksforgeeks.org</title>
      </Head>
      <header className="mb-5 rounded-t-xl bg-blue-600 py-2.5 text-center text-white">
        <h1 className="text-2xl font-bold">Task Management</h1>
      </header>
      <main>
        <div className="mb-5 flex flex-wrap justify-between gap-1 md:gap-0">
          <input
            type="text"
            className="m-1 flex-grow rounded border border-gray-300 bg-white p-2.5 text-base outline-none transition focus:border-blue-500"
            placeholder="Enter task..."
            value={taskName}
            onChange={handleTaskNameChange}
          />
          <select
            className="m-1 flex-grow cursor-pointer rounded border border-gray-300 bg-gray-100 p-2.5 text-base outline-none transition focus:border-blue-500"
            value={taskPriority}
            onChange={handleTaskPriorityChange}
          >
            <option value="Top">Top Priority</option>
            <option value="Middle">Middle Priority</option>
            <option value="Low">Less Priority</option>
          </select>
          <input
            type="date"
            className="m-1 flex-grow rounded border border-gray-300 bg-white p-2.5 text-base outline-none transition focus:border-blue-500"
            value={taskDeadline}
            onChange={handleTaskDeadlineChange}
          />
          <button 
            className="m-1 flex-grow rounded border-none bg-blue-600 p-2.5 text-base font-semibold text-white cursor-pointer transition duration-300 hover:bg-blue-800"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            className="flex-grow rounded border border-gray-300 bg-white p-2.5 text-base outline-none transition focus:border-blue-500"
            placeholder="Search tasks"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <select
            className="mt-2 flex-grow cursor-pointer rounded border border-gray-300 bg-white p-2.5 text-base outline-none transition focus:border-blue-500 md:mt-0 md:ml-2"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="Top">Top Priority</option>
            <option value="Middle">Middle Priority</option>
            <option value="Low">Less Priority</option>
          </select>
        </div>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Upcoming Tasks</h2>
        <div className="mb-8 overflow-x-auto">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-2.5 text-left">Task Name</th>
                <th className="p-2.5 text-left">Priority</th>
                <th className="p-2.5 text-left">Deadline</th>
                <th className="p-2.5 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((t, index) => (
                <tr key={t.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-2.5">{t.task}</td>
                  <td className="p-2.5">{t.priority}</td>
                  <td className="p-2.5">{t.deadline}</td>
                  <td className="p-2.5">
                    {!t.done && (
                      <div className="flex flex-wrap gap-1">
                        <button
                          className="cursor-pointer rounded-lg border-none bg-blue-600 px-3 py-3 text-white font-semibold transition duration-300 hover:bg-blue-700"
                          onClick={() => markDone(t.id)}
                        >
                          Mark Done
                        </button>
                        <button
                          className="cursor-pointer rounded-lg border-none bg-blue-600 px-3 py-3 text-white font-semibold transition duration-300 hover:bg-blue-700"
                          onClick={() => handleEditTask(t.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="cursor-pointer rounded-lg border-none bg-red-600 px-3 py-3 text-white font-semibold transition duration-300 hover:bg-red-700"
                          onClick={() => handleDeleteTask(t.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Completed Tasks</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-2.5 text-left">Task Name</th>
                  <th className="p-2.5 text-left">Priority</th>
                  <th className="p-2.5 text-left">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {completedTasks.map((ct, index) => (
                  <tr key={ct.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-2.5">{ct.task}</td>
                    <td className="p-2.5">{ct.priority}</td>
                    <td className="p-2.5">{ct.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
