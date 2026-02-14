import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const { items } = await req.json();

        if (!items || !Array.isArray(items) || items.length === 0) {
            return new Response('No items provided', { status: 400 });
        }

        const schema = z.object({
            recipes: z.array(z.object({
                id: z.string(),
                title: z.string(),
                description: z.string(),
                ingredients: z.array(z.string()).describe('List of ingredient names from the available items used in this recipe'),
                missingIngredients: z.array(z.string()).describe('List of extra ingredients needed that are likely pantry staples or need to be bought'),
                instructions: z.array(z.string()),
                prepTime: z.string(),
                cookTime: z.string(),
            })),
        });

        const itemsList = items.map((i: any) => `${i.name} (${i.quantity}, ${i.status})`).join(', ');

        const result = await generateObject({
            model: google('gemini-2.5-flash'),
            schema,
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful chef. Generate 2-3 creative recipes using the provided list of ingredients. Prioritize using items that are "expiring" or "expired" (if safe, e.g. slightly old produce, otherwise warn). Assume the user has basic pantry staples (oil, salt, pepper, spices).',
                },
                {
                    role: 'user',
                    content: `Available ingredients: ${itemsList}`,
                },
            ],
        });

        return Response.json(result.object);
    } catch (error) {
        console.error('Recipe AI Error:', error);
        return new Response(JSON.stringify({ error: 'Failed to generate recipes' }), { status: 500 });
    }
}
