"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, User } from "lucide-react"
import { getParticipantBySerial } from "../actions"
import type { Participant } from "@/lib/supabase"

export default function LookupPage() {
  const [serialNumber, setSerialNumber] = useState("")
  const [participant, setParticipant] = useState<Participant | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLookup() {
    if (!serialNumber.trim()) {
      setError("Please enter a serial number")
      return
    }

    setLoading(true)
    setError("")
    setParticipant(null)

    const result = await getParticipantBySerial(serialNumber.trim())

    if (result.success && result.data) {
      setParticipant(result.data)
    } else {
      setError(result.error || "Participant not found")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">🔍 Participant Lookup</h1>
          <p className="text-white/80">Find participant information by serial number</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search by Serial Number</CardTitle>
            <CardDescription>Enter the participant's serial number to view their information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="serial">Serial Number</Label>
              <Input
                id="serial"
                placeholder="GW-123456-7890"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLookup()}
              />
            </div>

            <Button onClick={handleLookup} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Lookup Participant
                </>
              )}
            </Button>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {participant && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <CardTitle>Participant Found</CardTitle>
                </div>
                <Badge variant="secondary" className="font-mono">
                  {participant.serial_number}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Name</Label>
                  <p className="text-lg font-semibold">{participant.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Email</Label>
                  <p>{participant.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Phone</Label>
                  <p>{participant.phone || "Not provided"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Kick Username</Label>
                  <p>{participant.kick_username || "Not provided"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Entry Date</Label>
                  <p>{new Date(participant.created_at).toLocaleString()}</p>
                </div>
              </div>

              {participant.comments && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Comments</Label>
                  <p className="mt-1 p-3 bg-gray-50 rounded">{participant.comments}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
