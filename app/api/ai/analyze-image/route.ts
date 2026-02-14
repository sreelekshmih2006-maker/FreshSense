import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const { image, type } = await req.json();

        if (!image) {
            return new Response('No image provided', { status: 400 });
        }

        const schema = z.object({
            items: z.array(z.object({
                name: z.string().describe('Name of the food item'),
                quantity: z.string().describe('Quantity estimated from the image, e.g. "2 apples", "1 gallon"'),
                category: z.enum(['Dairy', 'Produce', 'Meat', 'Pantry', 'Frozen', 'Beverage', 'Other']).describe('Category of the item'),
                confidence: z.number().describe('Confidence score between 0 and 1'),
                daysToExpire: z.number().describe('Estimated shelf life in days from today (e.g. 7 for a week, 3 for 3 days)'),
                storageTips: z.string().optional().describe('Short tip on how to store this item for maximum freshness'),
            })),
        });

        const isFridge = type === 'fridge';
        const prompt = isFridge
            ? 'Analyze this image of a fridge interior. Identify all visible food items. Estimate quantities and categorize them. Also provide storage tips and estimated shelf life in days (daysToExpire) assuming the items were bought today.'
            : 'Analyze this grocery receipt. Extract all food items purchased. Estimate quantities and categorize them. Also provide storage tips and estimated shelf life in days (daysToExpire) assuming the items were bought today.';

        const result = await generateObject({
            model: google('gemini-2.5-flash'),
            schema,
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: prompt },
                        { type: 'image', image }, // SDK handles base64 data URLs
                    ],
                },
            ],
        });

        return Response.json(result.object);
    } catch (error) {
        console.error('AI Error:', error);
        return new Response(JSON.stringify({ error: 'Failed to analyze image' }), { status: 500 });
    }
}
