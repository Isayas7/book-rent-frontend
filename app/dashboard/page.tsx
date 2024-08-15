"use client"
import AdminDashboard from "@/components/dashboard/admin-dashboard";
import OwnerDashboard from "@/components/dashboard/owner-dashboard";
import { AuthContext } from "@/context/AuthContext";
import { UserRole } from "@/utils/schema";
import { useRouter } from "next/navigation";
import { useContext } from "react";


export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const router = useRouter()
  return (
    <>
      {user?.role === UserRole.ADMIN ? (
        <AdminDashboard />
      ) : user?.role === UserRole.OWNER ? (
        <OwnerDashboard />
      ) : (
        router.push("/login")
      )}
    </>
  );
}
