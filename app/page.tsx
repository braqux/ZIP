"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Gift, Sparkles, Trophy } from "lucide-react"
import { submitGiveawayForm } from "./actions"

export default function GiveawayLanding() {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"></div>
        <div className="relative container mx-auto px-4 py-16 text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Trophy className="w-16 h-16 text-cyan-400 drop-shadow-lg" />
              <Sparkles className="w-6 h-6 text-cyan-300 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            🎮 LEVEL UP! 🎮
          </h1>
          <p className="text-xl md:text-2xl mb-2 opacity-90">Quest Complete! You've unlocked the giveaway!</p>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Join thousands of gamers competing for epic prizes. Your gaming journey just got more exciting!
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mb-2">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                Claim Your Gaming Rewards
              </CardTitle>
              <CardDescription>
                Secure your spot in the giveaway - trusted by thousands of gamers worldwide
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="Enter your phone number" className="w-full" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kickUsername">Kick Username (Optional)</Label>
                  <Input
                    id="kickUsername"
                    name="kickUsername"
                    type="text"
                    placeholder="Your Kick username (optional)"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments">Additional Comments</Label>
                  <Textarea
                    id="comments"
                    name="comments"
                    placeholder="Any additional comments or questions?"
                    className="w-full min-h-[80px]"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Securing Your Entry...
                    </>
                  ) : (
                    "🎫 Claim My Gaming Serial"
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50 to-purple-50 rounded-lg border border-cyan-200">
                <p className="text-xs text-slate-600 text-center font-medium">
                  🛡️ Your data is encrypted and secure • Used only for this giveaway • No spam, ever
                </p>
                <p className="text-xs text-slate-500 text-center mt-1">Trusted by 50,000+ gamers worldwide</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-white/80">
        <p className="text-sm">🎮 Game on! Winners announced soon • Good luck, gamer! 🍀</p>
        <p className="text-xs text-white/60 mt-2">Fair play guaranteed • Random selection process</p>
      </div>
    </div>
  )
}
