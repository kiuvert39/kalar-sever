import axios from 'axios';

const ZEROB0UNCE_API_KEY = 'your-zerobounce-api-key';

interface ZeroBounceResponse {
  status: string;
  sub_status: string;
  error?: string;
}

export  async function verifyEmailExists(email: string): Promise<ZeroBounceResponse> {
  try {
    const response = await axios.get<ZeroBounceResponse>(
      `https://api.zerobounce.net/v2/validate?api_key=${process.env.ZEROB0UNCE_API_KEY}&email=${email}`
    );

    return response.data;
  } catch (error:any) {
    console.error('Error verifying email:', error);
    return { status: 'error', sub_status: 'unknown', error: error.message };
  }
}


