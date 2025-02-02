import axios from 'axios';
import { NextResponse } from 'next/server';

interface LungCancerData {
  gender: string;
  age: string;
  smoking: string;
  yellow_fingers: string;
  anxiety: string;
  peer_pressure: string;
  chronic_disease: string;
  fatigue: string;
  allergy: string;
  wheezing: string;
  alcohol: string;
  coughing: string;
  shortness_of_breath: string;
  swallowing_difficulty: string;
  chest_pain: string;
}

interface PredictionResponse {
  success: boolean;
  prediction: string;
  probability: number[];
  error?: string;
}

export async function POST(request: Request) {
  try {
    // Log the incoming request
    console.log('Received lung cancer prediction request');
    
    const data: LungCancerData = await request.json();
    console.log('Request data:', data);
    
    // Validate required fields
    const requiredFields = [
      'gender', 'age', 'smoking', 'yellow_fingers', 'anxiety',
      'peer_pressure', 'chronic_disease', 'fatigue', 'allergy',
      'wheezing', 'alcohol', 'coughing', 'shortness_of_breath',
      'swallowing_difficulty', 'chest_pain'
    ];
    
    for (const field of requiredFields) {
      if (!data[field as keyof LungCancerData]) {
        console.error(`Missing required field: ${field}`);
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Configure axios request
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 second timeout
    };
    
    // Make request to Flask API
    console.log('Calling Flask API...');
    const response = await axios.post<PredictionResponse>(
      'http://127.0.0.1:5000/predict/lung_cancer',
      data,
      axiosConfig
    );

    console.log('Flask API response:', response.data);
    
    // Return successful response
    return NextResponse.json(
      {
        status: true,
        data: response.data
      },
      {
        status: 200,
      }
    );
    
  } catch (error) {
    // Log the error details
    console.error("Error in lung cancer prediction:", error);
    
    // Handle Axios errors specifically
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || error.message;
      return NextResponse.json(
        {
          status: false,
          data: `API Error: ${errorMessage}`
        },
        {
          status: error.response?.status || 500,
        }
      );
    }
    
    // Handle other types of errors
    return NextResponse.json(
      {
        status: false,
        data: "Error making prediction"
      },
      {
        status: 500,
      }
    );
  }
}