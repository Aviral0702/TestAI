"use client";
import { useSession } from "next-auth/react";
import { Activity, AlertCircle, Code2, PlayCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MainNav } from "@/components/layout/main-nav";
import { UserNav } from "@/components/layout/user-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState([]);
  const [endpoints, setEndpoints] = useState(0);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);

        // Calculate total endpoints after projects are fetched
        const totalEndpoints = await fetchEndpoints(data);
        setEndpoints(totalEndpoints);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-center text-destructive">
              Unauthorized Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Please login to continue to the dashboard
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col dark">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Input
              type="search"
              placeholder="Search..."
              className="md:w-[200px] lg:w-[300px]"
            />
            <UserNav user={session.user} />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Code2 className="mr-2 h-4 w-4" />
              Import API Schema
            </Button>
            <Button>
              <PlayCircle className="mr-2 h-4 w-4" />
              Run Tests
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Projects
              </CardTitle>
              <Code2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                API Endpoints
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{endpoints}</div>
              <p className="text-xs text-muted-foreground">+5 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Generated Tests
              </CardTitle>
              <PlayCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">
                +22 since yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Last Run Status
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Passed</div>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest test runs and API updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Auth Service</TableCell>
                    <TableCell>Test Run</TableCell>
                    <TableCell className="text-green-500">Passed</TableCell>
                    <TableCell className="text-right">2h ago</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Payment API</TableCell>
                    <TableCell>New Endpoint Added</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell className="text-right">5h ago</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">User Service</TableCell>
                    <TableCell>Test Run</TableCell>
                    <TableCell className="text-red-500">Failed</TableCell>
                    <TableCell className="text-right">1d ago</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/projects">
                <Button className="w-full justify-start" variant="outline">
                  <Code2 className="mr-2 h-4 w-4" />
                  Create New Project
                </Button>
              </Link>
              <Button className="w-full justify-start" variant="outline">
                <Activity className="mr-2 h-4 w-4" />
                Add API Endpoint
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <PlayCircle className="mr-2 h-4 w-4" />
                Generate Tests
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <footer className="border-t py-4 px-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2024 TestifAI. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Button variant="link" size="sm" className="text-muted-foreground">
              Privacy Policy
            </Button>
            <Button variant="link" size="sm" className="text-muted-foreground">
              Terms of Service
            </Button>
            <Button variant="link" size="sm" className="text-muted-foreground">
              Contact
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

async function fetchEndpoints({ projects }) {
  if (!projects || !Array.isArray(projects)) {
    return 0;
  }

  let totalEndpoints = 0;
  projects.forEach((project) => {
    if (project.endpoints && Array.isArray(project.endpoints)) {
      totalEndpoints += project.endpoints.length;
    }
  });
  return totalEndpoints;
}
