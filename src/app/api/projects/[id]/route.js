import { prisma } from "../route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET({ params }) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const { id } = params;

    const project = await prisma.project.findFirst({
      where: {
        id: parseInd(id),
        userId,
      },
      include: {
        endpoints: {
          include: {
            tests: true,
          },
        },
      },
    });
    if (!project) {
      return new NextResponse(JSON.stringify({ error: "Project not found" }), {
        status: 404,
      });
    }
    return new NextResponse(project);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch the project" }),
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(req, { params }) {
  const { id } = params;
  const { name, description } = req.body;
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  try {
    const project = await prisma.project.update({
      where: {
        id: parseInt(id),
        userId,
      },
      data: {
        name,
        description,
      },
    });
    if (!project) {
      return new NextResponse(JSON.stringify({ error: "Project not found" }), {
        status: 404,
      });
    }
    return new NextResponse(project);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to update the project" }),
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  try {
    await prisma.project.delete({
      where: {
        id: parseInt(id),
        userId,
      },
    });
    return new NextResponse({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to delete the project" }),
      {
        status: 500,
      }
    );
  }
}
