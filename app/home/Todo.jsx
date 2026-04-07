"use client";

import { useState } from "react";
import Head from "next/head";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TaskScheduler() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskPriority, setTaskPriority] = useState("Top");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleTaskPriorityChange = (value) => {
    setTaskPriority(value);
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
      toast.error("Please select a future date for the deadline.");
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
    toast.success("Task added successfully!");
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
    toast.info("Task deleted!");
  };

  const markDone = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: true } : task,
    );
    setTasks(updatedTasks);

    const completedTask = tasks.find((task) => task.id === id);
    if (completedTask) {
      setCompletedTasks([...completedTasks, completedTask]);
      toast.success("Task completed!");
    }
  };

  const filteredTasks = tasks
    .filter((task) => !task.done)
    .filter((task) =>
      task.task.toLowerCase().includes(searchKeyword.toLowerCase()),
    )
    .filter((task) =>
      filterPriority && filterPriority !== "all"
        ? task.priority === filterPriority
        : true,
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <Head>
        <title>Task Management - Geeksforgeeks.org</title>
      </Head>

      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardTitle className="text-3xl">📋 Task Management</CardTitle>
          </CardHeader>
        </Card>

        {/* Add Task Form */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <Input
                  type="text"
                  placeholder="Enter task..."
                  value={taskName}
                  onChange={handleTaskNameChange}
                  className="md:col-span-2"
                />

                <Select
                  value={taskPriority}
                  onValueChange={handleTaskPriorityChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Top">🔴 Top Priority</SelectItem>
                    <SelectItem value="Middle">🟡 Middle Priority</SelectItem>
                    <SelectItem value="Low">🟢 Less Priority</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  type="date"
                  value={taskDeadline}
                  onChange={handleTaskDeadlineChange}
                />
              </div>

              <Button
                onClick={addTask}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                ➕ Add Task
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Input
                type="text"
                placeholder="🔍 Search tasks..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />

              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="Top">🔴 Top Priority</SelectItem>
                  <SelectItem value="Middle">🟡 Middle Priority</SelectItem>
                  <SelectItem value="Low">🟢 Less Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks Table */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>⏰ Upcoming Tasks ({filteredTasks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredTasks.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No tasks yet. Add one to get started! 🚀
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task Name</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTasks.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="font-medium">{t.task}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              t.priority === "Top"
                                ? "bg-red-100 text-red-800"
                                : t.priority === "Middle"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {t.priority}
                          </span>
                        </TableCell>
                        <TableCell>{t.deadline}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markDone(t.id)}
                              className="hover:bg-green-50"
                            >
                              ✓ Done
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditTask(t.id)}
                              className="hover:bg-blue-50"
                            >
                              ✏️ Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteTask(t.id)}
                            >
                              🗑️ Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Completed Tasks Table */}
        {completedTasks.length > 0 && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>
                ✅ Completed Tasks ({completedTasks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task Name</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Deadline</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedTasks.map((ct) => (
                      <TableRow key={ct.id} className="opacity-75">
                        <TableCell className="line-through">
                          {ct.task}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              ct.priority === "Top"
                                ? "bg-red-100 text-red-800"
                                : ct.priority === "Middle"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {ct.priority}
                          </span>
                        </TableCell>
                        <TableCell>{ct.deadline}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
