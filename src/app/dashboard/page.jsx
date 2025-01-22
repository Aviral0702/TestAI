"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Plus, Activity, Database } from "lucide-react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [apiName, setApiName] = useState("");
  const [baseURL, setBaseURL] = useState("");

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
            <CardTitle className="text-center text-red-500">Unauthorized Access</CardTitle>
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
    const res = await fetch("/api/apis", {
      method: "POST",
      body: JSON.stringify({ apiName, baseURL }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      console.log("API details uploaded successfully!");
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
            <div className="text-sm text-gray-600">{session.user.email}</div>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {session.user.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your API testing configurations and view results.
          </p>
        </div>

        {/* API Upload Card */}
        <div className="grid gap-6 md:grid-cols-2">
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
                  <label className="text-sm font-medium text-gray-700">API Name</label>
                  <Input
                    type="text"
                    placeholder="Enter API name"
                    value={apiName}
                    onChange={(e) => setApiName(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Base URL</label>
                  <Input
                    type="text"
                    placeholder="https://api.example.com"
                    value={baseURL}
                    onChange={(e) => setBaseURL(e.target.value)}
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
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-600 text-2xl font-semibold">0</div>
                  <div className="text-sm text-gray-600">Total APIs</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-600 text-2xl font-semibold">0</div>
                  <div className="text-sm text-gray-600">Tests Run</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-purple-600 text-2xl font-semibold">0%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-orange-600 text-2xl font-semibold">0</div>
                  <div className="text-sm text-gray-600">Active Tests</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}