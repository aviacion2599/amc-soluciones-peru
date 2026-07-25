import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return new NextResponse("Missing id", { status: 400 });
    }

    // Attempt to stream directly from drive.usercontent.google.com
    const driveUrl = `https://drive.usercontent.google.com/download?id=${id}&export=download`;

    const headers = new Headers();
    const range = request.headers.get("range");
    if (range) {
      headers.set("range", range);
    }

    const response = await fetch(driveUrl, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      // Fallback to the uc endpoint
      const fallbackUrl = `https://drive.google.com/uc?export=download&id=${id}`;
      const fallbackResponse = await fetch(fallbackUrl, {
        method: "GET",
        headers,
      });
      
      if (!fallbackResponse.ok) {
        return new NextResponse("Failed to fetch video from both endpoints", { status: fallbackResponse.status });
      }

      const resHeaders = new Headers(fallbackResponse.headers);
      resHeaders.set("Access-Control-Allow-Origin", "*");
      return new NextResponse(fallbackResponse.body, {
        status: fallbackResponse.status,
        statusText: fallbackResponse.statusText,
        headers: resHeaders,
      });
    }

    const resHeaders = new Headers(response.headers);
    resHeaders.set("Access-Control-Allow-Origin", "*");
    
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: resHeaders,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
