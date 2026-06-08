import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getSession from "@/lib/getsession";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const session = await getSession();
  const user = session?.user;

  if (user) {
    return (
      <div className="flex min-h-screen">
        <div className="flex-1 bg-neutral-800 text-neutral-100">
          <div className="p-6 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  Dashboard
                </h1>
                <p className="text-sm text-neutral-400 mt-1">
                  Overview of your application metrics and activity
                </p>
              </div>

              <button className="px-4 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-500 transition-colors">
                New Report
              </button>
            </div>
          </div>
          <div className="p-6 grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="p-4 bg-neutral-900/80 backdrop-blur text-neutral-100 border border-neutral-800 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-neutral-400">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold tracking-tight">
                    $45,231.87
                  </div>
                  <p className="text-xs text-neutral-400 mt-2">
                    <span className="text-green-400">+20.1%</span> from last
                    month
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4 bg-neutral-900/80 backdrop-blur text-neutral-100 border border-neutral-800 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-neutral-400">
                    Subscriptions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold tracking-tight">
                    +2350
                  </div>
                  <p className="text-xs text-neutral-400 mt-2">
                    <span className="text-green-400">+180.1%</span> from last
                    month
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4 bg-neutral-900/80 backdrop-blur text-neutral-100 border border-neutral-800 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-neutral-400">
                    Sales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold tracking-tight">
                    +12,234
                  </div>
                  <p className="text-xs text-neutral-400 mt-2">
                    <span className="text-green-400">+19%</span> from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4 bg-neutral-900/80 backdrop-blur text-neutral-100 border border-neutral-800 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-neutral-400">
                    Active Now
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold tracking-tight">
                    +573
                  </div>
                  <p className="text-xs text-neutral-400 mt-2">
                    <span className="text-green-400">+201</span> from last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-6">
              <Card className="bg-neutral-900/80 border border-neutral-800 shadow-sm text-neutral-100 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-medium">
                    Recent Users
                  </CardTitle>
                  <p className="text-sm text-neutral-400">
                    Latest signups and subscription plans
                  </p>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-neutral-800/60 transition-colors">
                        <TableHead className="text-neutral-100">Name</TableHead>
                        <TableHead className="text-neutral-100">
                          Email
                        </TableHead>
                        <TableHead className="text-neutral-100">Plan</TableHead>
                        <TableHead className="text-neutral-100">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="hover:bg-inherit">
                        <TableCell>John Doe</TableCell>
                        <TableCell>john@example.com</TableCell>
                        <TableCell>Pro</TableCell>
                        <TableCell>2026-01-21</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-inherit">
                        <TableCell>John Doe</TableCell>
                        <TableCell>john@example.com</TableCell>
                        <TableCell>Pro</TableCell>
                        <TableCell>2026-01-21</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-inherit">
                        <TableCell>John Doe</TableCell>
                        <TableCell>john@example.com</TableCell>
                        <TableCell>Pro</TableCell>
                        <TableCell>2026-01-21</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-inherit">
                        <TableCell>John Doe</TableCell>
                        <TableCell>john@example.com</TableCell>
                        <TableCell>Pro</TableCell>
                        <TableCell>2026-01-21</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-inherit">
                        <TableCell>John Doe</TableCell>
                        <TableCell>john@example.com</TableCell>
                        <TableCell>Pro</TableCell>
                        <TableCell>2026-01-21</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-inherit">
                        <TableCell>John Doe</TableCell>
                        <TableCell>john@example.com</TableCell>
                        <TableCell>Pro</TableCell>
                        <TableCell>2026-01-21</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    redirect("/login");
  }
};

export default Dashboard;
