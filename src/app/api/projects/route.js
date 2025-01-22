import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const projects = await prisma.project.findMany();
        return new Response(JSON.stringify(projects));
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch the projects"}), {
            status: 500,
        })
    }
}