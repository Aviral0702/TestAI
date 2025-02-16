import { prisma } from "../projects/route";

export async function POST(req, res) {
  try {
    const user = await prisma.user.create({
      data: {
        email: "testuser@example.com",
        name: "Test User",
      },
    });

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
