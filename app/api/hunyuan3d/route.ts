/**
 * Next.js API route for Hunyuan3D integration
 * This acts as a proxy to the Python FastAPI server
 */

import { NextRequest, NextResponse } from 'next/server';
import { hunyuan3dClient } from '@/lib/hunyuan3d';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward the request to the Python API server
    const result = await hunyuan3dClient.generate3DModel(body);
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'health') {
      const isHealthy = await hunyuan3dClient.healthCheck();
      return NextResponse.json({ healthy: isHealthy });
    }

    if (action === 'endpoints') {
      const endpoints = await hunyuan3dClient.getEndpoints();
      return NextResponse.json({ endpoints });
    }

    return NextResponse.json({ message: 'Hunyuan3D API endpoint' });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

