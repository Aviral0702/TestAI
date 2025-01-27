import { NextResponse } from "next/server";
import { prisma } from "../projects/route";

export async function POST(req) {
  try {
    const { projectId, method, url, payload } = await req.json();

    if (!projectId || !method || !url) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newEndpoint = await prisma.endpoint.create({
      data: {
        projectId: parseInt(projectId),
        method,
        url,
        payload: payload || {},
      },
    });

    return NextResponse.json({
      message: "Endpoint created successfully",
      endpoint: newEndpoint,
    });
  } catch (error) {
    console.error("Error creating endpoint", error);
    return NextResponse.json(
      {
        message: "Failed to create endpoint",
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    if (!projectId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const endpoints = await prisma.endpoint.findMany({
      where: {
        projectId: parseInt(projectId),
      },
      include: {
        tests: true,
      },
    });
    return NextResponse.json({ endpoints });
  } catch (error) {
    console.error("Error fetching endpoints", error);
    return NextResponse.json(
      {
        message: "Failed to fetch endpoints",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const { id, method, url, payload } = await req.json();
    if (!id) {
      return NextResponse.json(
        {
          message: "Please provide endpoint id",
        },
        { status: 400 }
      );
    }

    const updatedEndpoint = await prisma.endpoint.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...(method && { method }),
        ...(url && { url }),
        ...(payload && { payload }),
      },
    });

    return NextResponse.json({
      message: "Endpoint updated successfully",
      endpoint: updatedEndpoint,
    });
  } catch (error) {
    console.error("Error updating endpoint", error);
    return NextResponse.json(
      {
        message: "Failed to update endpoint",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const { id } = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        {
          message: "Please provide endpoint id",
        },
        { status: 400 }
      );
    }
    await prisma.endpoint.delete({
        where: {
            id: parseInt(id),
        }
    });

    return NextResponse,json({
        message: "Endpoint deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting endpoint", error);
    return NextResponse.json(
      {
        message: "Failed to delete endpoint",
      },
      { status: 500 }
  );}
}
