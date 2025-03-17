import { NextResponse } from "next/server";
import { prisma } from "../../projects/route";

export async function POST(req) {
  try {
    const { endpointId, requestType, url, payload } = await req.json();
    if (!endpointId || !requestType || !url) {
      return NextResponse.json({
        status: 400,
        body: { message: "Missing required fields" },
      });
    }
    const prompt = `Generate test cases covering 5 crucial and edge cases for the ${requestType} API at ${url} with payload ${JSON.stringify(payload)} with the code for testing in Node.js format`; // Prompt for the model
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: prompt },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log(data.candidates[0].content.parts[0].text);
    const rawTests = data.candidates[0].content.parts.text;

    const storedTests = await Promise.all(
      parsedTests.map(test => 
        prisma.test.create({
          data:{
            endpointId,
            name: `Test for ${requestType} API at ${url}`,
            testCode: rawTests,
          }
        })
      )
    )

    return NextResponse.json(
      {
        success: true,
        tests: storedTests,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate test cases" },
      { status: 500 }
    );
  }
}
