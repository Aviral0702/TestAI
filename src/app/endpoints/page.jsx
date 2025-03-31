"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Plus, Link2, ArrowRight, Code } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProjectEndpoints() {
  const [projects, setProjects] = useState([])
  const [endpoints, setEndpoints] = useState([])
  const [selectedProjectId, setSelectedProjectId] = useState("")
  const [method, setMethod] = useState("GET")
  const [url, setUrl] = useState("")
  const [payload, setPayload] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [loadingEndpoints, setLoadingEndpoints] = useState(false)

  // Fetch projects on component mount
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects")
        if (!res.ok) throw new Error("Failed to fetch projects")
        const data = await res.json()
        setProjects(data)
        if (data.length > 0) {
          setSelectedProjectId(data[0].id.toString())
        }
      } catch (error) {
        setError("Failed to load projects: " + error.message)
      }
    }
    fetchProjects()
  }, [])

  // Fetch endpoints when a project is selected
  useEffect(() => {
    if (!selectedProjectId) return

    async function fetchEndpoints() {
      setLoadingEndpoints(true)
      try {
        const res = await fetch(`/api/endpoints?projectId=${selectedProjectId}`)
        if (!res.ok) throw new Error("Failed to fetch endpoints")
        const data = await res.json()
        setEndpoints(data.endpoints)
      } catch (error) {
        setError("Failed to load endpoints: " + error.message)
      } finally {
        setLoadingEndpoints(false)
      }
    }

    fetchEndpoints()
  }, [selectedProjectId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!selectedProjectId || !method || !url) {
      setError("Project, Method and URL are required")
      setLoading(false)
      return
    }

    let parsedPayload = {}
    if (payload) {
      try {
        parsedPayload = JSON.parse(payload)
      } catch (e) {
        setError("Invalid JSON payload")
        setLoading(false)
        return
      }
    }

    try {
      const res = await fetch("/api/endpoints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: selectedProjectId,
          method,
          url,
          payload: parsedPayload,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Failed to create endpoint")
      }

      const data = await res.json()
      setEndpoints((prev) => [data.endpoint, prev])
      setUrl("")
      setPayload("")
      toast.success("Endpoint created successfully")
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Helper function to get method badge color
  const getMethodColor = (method) => {
    switch (method) {
      case "GET":
        return "bg-blue-500 hover:bg-blue-600"
      case "POST":
        return "bg-green-500 hover:bg-green-600"
      case "PUT":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "DELETE":
        return "bg-red-500 hover:bg-red-600"
      case "PATCH":
        return "bg-purple-500 hover:bg-purple-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Project Endpoints</h1>
          <p className="text-muted-foreground">Create and manage API endpoints for your projects</p>
        </div>

        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus size={18} className="text-primary" />
              Add New Endpoint
            </CardTitle>
            <CardDescription>Configure an API endpoint for your project</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id.toString()}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="method">Method</Label>
                  <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger id="method">
                      <SelectValue placeholder="HTTP Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-3">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    type="text"
                    placeholder="https://api.example.com/v1/resource"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payload">Payload (JSON)</Label>
                <Textarea
                  id="payload"
                  placeholder='{"key": "value"}'
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                  className="min-h-[120px] font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">Optional for POST, PUT, and PATCH requests</p>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Add Endpoint"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link2 size={20} className="text-primary" />
              <h2 className="text-2xl font-semibold">Endpoints</h2>
            </div>

            {selectedProjectId && (
              <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {loadingEndpoints ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : endpoints.length > 0 ? (
            <div className="space-y-4">
              {endpoints.map((endpoint) => (
                <Card key={endpoint.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge className={getMethodColor(endpoint.method)}>{endpoint.method}</Badge>
                      <Button variant="ghost" size="sm">
                        Test <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="font-mono text-sm break-all">{endpoint.url}</div>
                  </CardContent>
                  {endpoint.payload && Object.keys(endpoint.payload).length > 0 && (
                    <CardFooter className="border-t bg-muted/30 pt-3">
                      <Tabs defaultValue="formatted" className="w-full">
                        <TabsList className="mb-2">
                          <TabsTrigger value="formatted" className="text-xs">
                            Payload
                          </TabsTrigger>
                          <TabsTrigger value="raw" className="text-xs">
                            Raw
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="formatted" className="mt-0">
                          <div className="font-mono text-xs overflow-x-auto">
                            {Object.entries(endpoint.payload).map(([key, value]) => (
                              <div key={key} className="flex gap-2">
                                <span className="text-blue-600 dark:text-blue-400">{key}:</span>
                                <span>{JSON.stringify(value)}</span>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="raw" className="mt-0">
                          <pre className="font-mono text-xs overflow-x-auto">
                            {JSON.stringify(endpoint.payload, null, 2)}
                          </pre>
                        </TabsContent>
                      </Tabs>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-muted/30">
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <Code size={40} className="text-muted-foreground mb-3 opacity-50" />
                <p className="text-muted-foreground">No endpoints found for this project.</p>
                <p className="text-muted-foreground text-sm">Add your first endpoint using the form above.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

