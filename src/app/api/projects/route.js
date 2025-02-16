import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        endpoints:true,
      }
    });

    if (!projects) {
      return new NextResponse(
        JSON.stringify({ error: "No projects found for this user" }),
        {
          status: 404,
        }
      );
    }

    return new NextResponse(JSON.stringify(projects));
  } catch (error) {
    console.error(error instanceof Error ? error.message : error); // Check if it's an instance of Error to handle better

    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch the projects" }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const { name, description } = await req.json();
    const userId = await session.user.id;
    const project = await prisma.project.create({
      data: {
        name,
        description,
        userId: userId,
      },
    });
    return new NextResponse(JSON.stringify(project), {
      status: 201,
    });
  } catch (error) {
    console.error(
      "Error in creating project",
      error instanceof Error ? error.message : error
    );
    return new NextResponse(
      {
        message: "Failed to create project",
      },
      { status: 500 }
    );
  }
}


