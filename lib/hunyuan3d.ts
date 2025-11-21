/**
 * Client for interacting with the Hunyuan3D API server
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_HUNYUAN3D_API_URL || 'http://localhost:8000';

export interface Generate3DRequest {
  hf_token?: string;
  [key: string]: any;
}

export interface Generate3DResponse {
  success: boolean;
  result?: any;
  error?: string;
}

export class Hunyuan3DClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || API_BASE_URL;
  }

  /**
   * Generate a 3D model using Hunyuan3D API
   */
  async generate3DModel(request: Generate3DRequest = {}): Promise<Generate3DResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Check if the API server is healthy
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get available API endpoints
   */
  async getEndpoints(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/endpoints`);
      const data = await response.json();
      return data.endpoints || [];
    } catch {
      return [];
    }
  }
}

// Export a singleton instance
export const hunyuan3dClient = new Hunyuan3DClient();

