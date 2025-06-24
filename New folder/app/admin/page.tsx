"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Users, Trophy } from "lucide-react"
import { getAllParticipants } from "../actions"
import type { Participant } from "@/lib/supabase"

export default function AdminPage() {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [filteredParticipants, setFilteredParticipants] = useState<Participant[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    loadParticipants()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = participants.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.kick_username?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredParticipants(filtered)
    } else {
      setFilteredParticipants(participants)
    }
  }, [searchTerm, participants])

  async function loadParticipants() {
    setLoading(true)
    const result = await getAllParticipants()
    if (result.success && result.data) {
      setParticipants(result.data)
      setFilteredParticipants(result.data)
    } else {
      setError(result.error || "Failed to load participants")
    }
    setLoading(false)
  }

  function exportToCSV() {
    const headers = ["Serial Number", "Name", "Email", "Phone", "Kick Username", "Comments", "Created At"]
    const csvContent = [
      headers.join(","),
      ...filteredParticipants.map((p) =>
        [
          p.serial_number,
          `"${p.name}"`,
          p.email,
          p.phone || "",
          p.kick_username || "",
          `"${p.comments || ""}"`,
          new Date(p.created_at).toLocaleString(),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `giveaway-participants-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading participants...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">🎮 Giveaway Admin Panel</h1>
          <p className="text-white/80">Manage and view all giveaway participants</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{participants.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">With Kick Username</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{participants.filter((p) => p.kick_username).length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Latest Entry</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold">
                {participants.length > 0 ? new Date(participants[0].created_at).toLocaleDateString() : "No entries yet"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Export */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search participants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={exportToCSV} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Participants List */}
        <div className="grid gap-4">
          {filteredParticipants.map((participant) => (
            <Card key={participant.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{participant.name}</CardTitle>
                    <CardDescription>{participant.email}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="font-mono">
                    {participant.serial_number}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <strong>Phone:</strong> {participant.phone || "Not provided"}
                  </div>
                  <div>
                    <strong>Kick Username:</strong> {participant.kick_username || "Not provided"}
                  </div>
                  <div>
                    <strong>Entry Date:</strong> {new Date(participant.created_at).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Entry Time:</strong> {new Date(participant.created_at).toLocaleTimeString()}
                  </div>
                </div>
                {participant.comments && (
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <strong>Comments:</strong> {participant.comments}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredParticipants.length === 0 && !loading && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">
                {searchTerm ? "No participants found matching your search." : "No participants yet."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
