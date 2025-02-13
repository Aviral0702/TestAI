import { NextResponse } from "next/server";
import { prisma } from "../projects/route";

//get all the tests of and endpoint
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const endpointId = searchParams.get("endpointId");
    if (!endpointId) {
      return NextResponse.json(
        { message: "Missing endpoint field" },
        { status: 400 }
      );
    }
    const tests = await prisma.test.findMany({
      where: {
        endpointId: parseInt(endpointId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return new NextResponse.json(
      {
        tests,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching tests", error);
    return NextResponse.json(
      {
        message: "Failed to fetch tests",
      },
      { status: 500 }
    );
  }
}

//create a new test
export async function POST(req) {
  try {
    const { endpointId, testCode } = await req.json();
    if (!endpointId || !testCode) {
      return NextResponse.json(
        {
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }
    const resp = await prisma.test.create({
      data: {
        endpointId: parseInt(endpointId),
        testCode:
          typeof testCode === "string " ? JSON.parse(testCode) : testCode,
      },
    });
  } catch (error) {
    console.error("Error creating test", error);
    return NextResponse.json(
      { message: "Failed to create test", error: String(error) },
      { status: 500 }
    );
  }
}

//deleting a test
export async function DELETE(req) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    if (!id) {
      console.error("Error deleting test", error);
      return NextResponse.json(
        { message: "Failed to delete test", error: String(error) },
        { status: 500 }
      );
    }

    const deletedTest = await prisma.test.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(
      { message: "Test deleted successfully", deletedTest },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting test", error);
    return NextResponse.json(
      { message: "Failed to delete test", error: String(error) },
      { status: 500 }
    );
  }
}

