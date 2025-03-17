"use client";
import { useState } from "react";
import { toast } from "sonner";
export default function CreateProject() {
  const [name, setname] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!name || !description) {
      setError("Project Name and Description is required");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });
      setname("");
      setDescription("");
      toast.success("Project created successfully");
      if (!res.ok) throw new Error("Failed to create project");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Project Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Description (Optional)</label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}
