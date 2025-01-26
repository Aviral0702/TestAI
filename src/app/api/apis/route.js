import { getServerSession } from "next-auth";
import { prisma } from "../projects/route";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized Access" },
        { status: 401 }
      );
    }

    // Ensure user exists in database
    const user = await prisma.user.upsert({
      where: { email: session.user.email },
      update: {},
      create: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name || 'Unknown User',
        hashedPassword: '', // Empty for OAuth users
      },
    });

    const data = await req.json();

    const newProject = await prisma.$transaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          name: data.apiName,
          description: "",
          userId: user.id,
          endpoints: {
            create: {
              method: data.httpMethod,
              url: data.baseURL,
              payload: safeJsonParse(data.requestBody) || {},
              tests: {
                create: {
                  testCode: safeJsonParse(data.expectedResponse) || {},
                },
              },
            },
          },
        },
      });

      return project;
    });

    return NextResponse.json({ 
      message: "API Added successfully", 
      newProject 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        message: "Failed to add API", 
        errorDetails: {
          name: error.name,
          message: error.message
        }
      },
      { status: 500 }
    );
  }
}

function safeJsonParse(input) {
  if (!input) return {};
  try {
    return typeof input === 'string' ? JSON.parse(input) : input;
  } catch (error) {
    console.error("JSON parsing error:", error);
    return {};
  }
}
