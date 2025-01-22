"use client";

import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>; // Loading state
  }

  if (!session) {
    return <div>Unauthorized, Please login to continue to the dashboard...</div>; // Unauthorized state
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Email: {session.user.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
      {/* Placeholder for future features */}
      <div>
        <h2>Your APIs</h2>
        <p>Upload API details to start generating tests!</p>
      </div>
    </div>
  );
}
