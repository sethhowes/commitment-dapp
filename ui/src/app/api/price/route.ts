import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const currency = searchParams.get('currency') || 'matic-network';

  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=usd`);
    const data = await response.json();
    
    if (data[currency]) {
      return Response.json({ data: { amount: data[currency].usd } });
    } else {
      return Response.json({ error: 'Currency not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Failed to fetch price data:', error);
    return Response.json({ error: 'Failed to fetch price data' }, { status: 500 });
  }
}