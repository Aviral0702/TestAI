"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LogOut, Plus, Activity, Database } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import { ComboboxDemo } from "@/components/ui/ComboBox";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [apiName, setApiName] = useState("");
  const [baseURL, setBaseURL] = useState("");
  const [httpMethod, setHttpMethod] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [expectedResponse, setExpectedResponse] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/api/projects");
      const data = await response.json();
      console.log(data);
      setProjects(data);
    };

    fetchProjects();
  }, []);
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-center text-red-500">
              Unauthorized Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">
              Please login to continue to the dashboard
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProject) {
      alert("Please select a project");
      return;
    }
    const parsedRequestbody = JSON.parse(requestBody);
    const parsedExpectedResponse = JSON.parse(expectedResponse);
    try {
      const res = await fetch("/api/apis", {
        method: "POST",
        body: JSON.stringify({
          apiName,
          projectId: selectedProject.id,
          baseURL,
          httpMethod,
          parsedRequestbody,
          parsedExpectedResponse,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        console.log("API details uploaded successfully!");
      }
    } catch (error) {
      console.error("Failed to upload API details", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-semibold">TestifAI</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-sm text-gray-600">
              {session.user.name}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut()}
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* API Upload Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-blue-500" />
                Add New API
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    API Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter API name"
                    value={apiName}
                    onChange={(e) => setApiName(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2 w-full">
                  <label className="text-sm font-medium text-gray-700">
                    Project
                  </label>
                  <ComboboxDemo
                    projects={projects}
                    setSelectedProject={setSelectedProject}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Base URL
                  </label>
                  <Input
                    type="text"
                    placeholder="https://api.example.com"
                    value={baseURL}
                    onChange={(e) => setBaseURL(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    HTTP Method
                  </label>
                  <Select onValueChange={(value) => setHttpMethod(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select an HTTP Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Request Body
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter request body"
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Expected Response
                  </label>
                  <Input
                    type="text"
                    placeholder="Expected Response"
                    value={expectedResponse}
                    onChange={(e) => setExpectedResponse(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add API
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <StatsCard />
        </div>
      </div>
    </div>
  );
}
