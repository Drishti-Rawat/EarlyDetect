import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = await request.json();
    console.log("data", data);

    try {
        // send data to flask api
        // const response = await axios.post('https://cancer-detection-flask-api-o1f9.vercel.app/api/predict', {
        //     features: data.features,
        // });
        const response = await axios.post('http://127.0.0.1:5000/predict/general_cancer', {
            features: data.features,
        });

        return NextResponse.json(
            {
                status:true,
                data : response.data
            },
        {
            status: 200,
        });
        
    } catch (error) {
        console.log("error", error);
        return NextResponse.json(
            {
                status:false,
                data : "Error making prediction"
            }
        )

    }

    }