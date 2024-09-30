import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from "react-router-dom";
//import React from "react";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import AddJobsPage from "./pages/AddJobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
  //Add a new job to the database
  const addJob = async (newJob) => {
    await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  //Delete a job from the database
  const deleteJob = async (id) => {
    await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobsPage addJobSubmit={addJob} />} />
        <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob} />} />
        <Route path="/edit-job/:id" element={<EditJobPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
