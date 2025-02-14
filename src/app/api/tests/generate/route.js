import { NextResponse } from "next/server";

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
    return NextResponse.json(
      {
        tests: data.candidates[0].content.parts[0].text
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate test cases" },
      { status: 500 }
    );
  }
}
