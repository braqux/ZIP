"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"
import { submitGiveawayForm } from "./actions"

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [serialNumber, setSerialNumber] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError("")

    try {
      const result = await submitGiveawayForm(formData)
      if (result.success) {
        setSerialNumber(result.serialNumber || "")
        setIsSubmitted(true)
      } else {
        setError(result.error || "Something went wrong. Please try again.")
      }
    } catch (err) {
      setError("Failed to submit form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-cyan-400">🎮 Achievement Unlocked! 🎮</CardTitle>
            <CardDescription className="text-lg">You're officially in the game!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <Label className="text-sm font-medium text-gray-600">Your Serial Number</Label>
              <div className="text-2xl font-bold text-purple-600 mt-1 font-mono">{serialNumber}</div>
              <p className="text-xs text-gray-500 mt-2">Save this number - you'll need it to claim your prize!</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">Thank you for participating in our giveaway!</p>
              <p className="text-xs text-gray-500">Winners will be announced soon. Good luck! 🍀</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="text-center text-white max-w-md">
        <h1 className="text-4xl font-bold mb-4">🎮 Giveaway System</h1>
        <p className="text-xl mb-6">Deployment Successful!</p>
        <div className="bg-white/10 p-6 rounded-lg space-y-4">
          <p className="text-sm">✅ Next.js App Router working</p>
          <p className="text-sm">✅ Vercel deployment active</p>
          <p className="text-sm">✅ Ready for giveaway form</p>
        </div>
        <p className="text-xs mt-4 opacity-75">If you see this page, your deployment is working correctly.</p>
      </div>
    </div>
  )
}
