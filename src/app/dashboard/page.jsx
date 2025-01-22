import { getServerSession } from "next-auth";
import { useSession,signOut } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function Dashboard() {
  const {data} = useSession();
  const session = await getServerSession(authOptions)
  if(!session) {
    return <div>Unauthorized, Please login to continue to the dashboard...</div>
  }
  return(
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
  )
  }
  