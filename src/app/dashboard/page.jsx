// dashboard/page.jsx
"use client";

import ProtectedRoute from "../Routes/ProtectedRoute";
import DashboardContent from "./DashboardContent";


export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
