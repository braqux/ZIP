"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Mail, Database, Settings } from "lucide-react"

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">🛠️ Giveaway Setup Guide</h1>
          <p className="text-white/80">Follow these steps to get your giveaway system fully operational</p>
        </div>

        <div className="space-y-6">
          {/* Email Setup */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-500" />
                <CardTitle>Email Delivery Setup</CardTitle>
                <Badge variant="destructive">Required</Badge>
              </div>
              <CardDescription>
                Configure email delivery to receive participant data at braqux@gmail.com
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Step 1: Sign up for Resend</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                  <li>
                    Go to{" "}
                    <a href="https://resend.com" className="underline font-medium" target="_blank" rel="noreferrer">
                      resend.com
                    </a>
                  </li>
                  <li>Sign up for a free account (100 emails/day free)</li>
                  <li>Verify your account via email</li>
                </ol>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Step 2: Get your API Key</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-green-800">
                  <li>In Resend dashboard, go to "API Keys"</li>
                  <li>Click "Create API Key"</li>
                  <li>Name it "Giveaway System"</li>
                  <li>Copy the API key (starts with "re_")</li>
                </ol>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Step 3: Add Environment Variable</h3>
                <p className="text-sm text-purple-800 mb-2">Add this to your environment variables:</p>
                <code className="bg-purple-100 px-2 py-1 rounded text-sm font-mono">
                  RESEND_API_KEY=your_api_key_here
                </code>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">Step 4: Domain Setup (Optional but Recommended)</h3>
                <p className="text-sm text-yellow-800">
                  For production, add your domain in Resend to avoid "via resend.dev" in emails. For testing, you can
                  skip this step.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Database Setup */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-500" />
                <CardTitle>Database Storage Setup</CardTitle>
                <Badge variant="secondary">Optional</Badge>
              </div>
              <CardDescription>Store participant data permanently (recommended for large giveaways)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Quick Setup with Supabase</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-green-800">
                  <li>
                    Go to{" "}
                    <a href="https://supabase.com" className="underline font-medium" target="_blank" rel="noreferrer">
                      supabase.com
                    </a>
                  </li>
                  <li>Create a free account and new project</li>
                  <li>Get your Project URL and API Key from Settings → API</li>
                  <li>
                    Add environment variables:
                    <div className="mt-2 space-y-1">
                      <code className="block bg-green-100 px-2 py-1 rounded text-xs font-mono">
                        NEXT_PUBLIC_SUPABASE_URL=your_project_url
                      </code>
                      <code className="block bg-green-100 px-2 py-1 rounded text-xs font-mono">
                        NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
                      </code>
                    </div>
                  </li>
                  <li>Run the SQL script to create the participants table</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Testing */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-orange-500" />
                <CardTitle>Testing Your Setup</CardTitle>
              </div>
              <CardDescription>Verify everything is working correctly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-900 mb-2">Test the Giveaway Form</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-orange-800">
                  <li>Fill out the giveaway form with test data</li>
                  <li>Check your email (braqux@gmail.com) for the notification</li>
                  <li>Verify the serial number is generated</li>
                  <li>
                    If using database, check the admin panel at <code>/admin</code>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Status Check */}
          <Card>
            <CardHeader>
              <CardTitle>Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Email Service: Not configured (add RESEND_API_KEY)</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Database: Not configured (add Supabase keys)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Landing Page: Ready ✅</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Serial Number Generation: Working ✅</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
