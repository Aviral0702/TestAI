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

    const data = await req.json();
    console.log(data);
    const newEndpoint = await prisma.endpoint.create({
      data: {
        projectId: data.projectId,
        method: data.httpMethod,
        url: data.baseURL,
        payload: safeJsonParse(data.requestBody) || {},
        tests: {
          create: {
            testCode: safeJsonParse(data.expectedResponse) || {}
          }
        }
      }
      
    });

    return NextResponse.json({ 
      message: "API Added successfully", 
      newEndpoint 
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
