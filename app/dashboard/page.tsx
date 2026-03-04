'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarNav } from '@/components/navigation/sidebar-nav';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, FileText, Clock, Shield } from 'lucide-react';

// Mock data
const recentActivity = [
  { date: 'Jan 1', vulnerabilities: 8 },
  { date: 'Jan 8', vulnerabilities: 6 },
  { date: 'Jan 15', vulnerabilities: 5 },
  { date: 'Jan 22', vulnerabilities: 3 },
  { date: 'Jan 29', vulnerabilities: 2 },
];

const engagements = [
  {
    id: 1,
    title: 'Web Application Penetration Test',
    status: 'In Progress',
    daysLeft: 12,
  },
  {
    id: 2,
    title: 'Vulnerability Assessment',
    status: 'Completed',
    daysLeft: 0,
  },
  {
    id: 3,
    title: 'Security Audit',
    status: 'Scheduled',
    daysLeft: 30,
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarNav />

      <main className="md:ml-64">
        <div className="py-8 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's your security overview.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Engagements</CardTitle>
                  <Shield className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Ongoing security projects</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reports Available</CardTitle>
                  <FileText className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">Ready for download</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
                  <AlertCircle className="w-4 h-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Require attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Review</CardTitle>
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Days remaining</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Vulnerability Trend</CardTitle>
                  <CardDescription>Vulnerabilities over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={recentActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                      <XAxis dataKey="date" stroke="currentColor" opacity={0.5} />
                      <YAxis stroke="currentColor" opacity={0.5} />
                      <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: 'none' }} />
                      <Line type="monotone" dataKey="vulnerabilities" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment</CardTitle>
                  <CardDescription>Current security posture</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[
                      { name: 'Critical', value: 2 },
                      { name: 'High', value: 8 },
                      { name: 'Medium', value: 15 },
                      { name: 'Low', value: 24 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                      <XAxis dataKey="name" stroke="currentColor" opacity={0.5} />
                      <YAxis stroke="currentColor" opacity={0.5} />
                      <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: 'none' }} />
                      <Bar dataKey="value" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Active Engagements */}
            <Card>
              <CardHeader>
                <CardTitle>Active Engagements</CardTitle>
                <CardDescription>Your ongoing security projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {engagements.map((engagement) => (
                    <div key={engagement.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{engagement.title}</h3>
                        <p className="text-sm text-muted-foreground">{engagement.status}</p>
                      </div>
                      {engagement.daysLeft > 0 && (
                        <div className="text-right">
                          <p className="font-semibold">{engagement.daysLeft} days</p>
                          <p className="text-sm text-muted-foreground">remaining</p>
                        </div>
                      )}
                      {engagement.daysLeft === 0 && (
                        <Button variant="outline" size="sm">Download Report</Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="border-t border-border py-8 px-4 md:px-8 mt-8">
          <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
            <p>&copy; 2024 OmniTrust Africa. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
