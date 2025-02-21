import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !email.length) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    const FORM_ID = process.env.CONVERTKIT_FORM_ID;
    const API_KEY = process.env.CONVERTKIT_API_KEY;

    if (!FORM_ID || !API_KEY) {
      console.error("Missing required environment variables:", {
        hasFormId: !!FORM_ID,
        hasApiKey: !!API_KEY,
      });
      throw new Error("Configuration error: Missing API credentials");
    }

    const API_URL = `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`;

    console.log("ConvertKit Configuration:", {
      formId: FORM_ID,
      apiKeyLength: API_KEY.length,
      apiUrl: API_URL,
    });

    const requestBody = {
      api_key: API_KEY,
      email: email,
    };

    console.log("Making request to ConvertKit:", {
      url: API_URL,
      method: "POST",
      email,
      requestBody,
    });

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    console.log("Raw ConvertKit API Response:", {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data: responseData,
    });

    if (!response.ok) {
      throw new Error(
        `ConvertKit API error: ${response.status} - ${JSON.stringify(
          responseData
        )}`
      );
    }

    if (!responseData.subscription) {
      console.error("Unexpected ConvertKit response format:", responseData);
      throw new Error("Invalid response from ConvertKit API");
    }

    return NextResponse.json(
      {
        message: "Successfully subscribed to the newsletter!",
        data: responseData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        message: "Error subscribing to newsletter",
        error: error instanceof Error ? error.message : "Unknown error",
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
