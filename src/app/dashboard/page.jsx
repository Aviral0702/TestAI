import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if(!session) {
    return <p>You must be logged in to view this page~</p>
  }
    return (
      <main className="p-8">
        <h2 className="text-3xl font-semibold">Dashboard</h2>
        <p>Upload your API specs to generate tests!</p>
      </main>
    );
  }
  