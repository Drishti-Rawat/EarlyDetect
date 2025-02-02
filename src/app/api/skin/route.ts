// app/api/skin/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("data",data)
    
    // Forward the request to your Flask backend
    const response = await fetch('http://localhost:5000/predict/skin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result)
    
    if (!response.ok) {
      return NextResponse.json({ error: result.error, status: 'error' }, { status: 500 });
    }

    return NextResponse.json("done");
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', status: 'error' },
      { status: 500 }
    );
  }
}