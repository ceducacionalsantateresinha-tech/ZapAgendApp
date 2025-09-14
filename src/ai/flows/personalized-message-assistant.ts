'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized message suggestions using AI.
 *
 * The flow takes contact context and desired tone as input and returns tailored message suggestions.
 *
 * @fileOverview A plant problem diagnosis AI agent.
 * - personalizedMessageAssistant - A function that handles the message personalization process.
 * - PersonalizedMessageAssistantInput - The input type for the personalizedMessageAssistant function.
 * - PersonalizedMessageAssistantOutput - The return type for the personalizedMessageAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedMessageAssistantInputSchema = z.object({
  contactContext: z
    .string()
    .describe(
      'Detailed context about the contact, including their name, relationship to the user, past interactions, and any relevant personal details.'
    ),
  desiredTone: z
    .string()
    .describe(
      'The desired tone of the message (e.g., formal, friendly, humorous, professional).'
    ),
  messageGoal: z
    .string()
    .describe(
      'The goal of the message e.g., confirm appointment, follow up, make introduction.'
    ),
  draftMessage: z
    .string()
    .optional()
    .describe(
      'The draft message as a starting point.'
    )
});
export type PersonalizedMessageAssistantInput = z.infer<
  typeof PersonalizedMessageAssistantInputSchema
>;

const PersonalizedMessageAssistantOutputSchema = z.object({
  personalizedMessage: z
    .string()
    .describe(
      'An AI-generated message suggestion tailored to the contact context and desired tone.'
    ),
});
export type PersonalizedMessageAssistantOutput = z.infer<
  typeof PersonalizedMessageAssistantOutputSchema
>;

export async function personalizedMessageAssistant(
  input: PersonalizedMessageAssistantInput
): Promise<PersonalizedMessageAssistantOutput> {
  return personalizedMessageAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedMessageAssistantPrompt',
  input: {schema: PersonalizedMessageAssistantInputSchema},
  output: {schema: PersonalizedMessageAssistantOutputSchema},
  prompt: `You are an AI-powered message personalization assistant. You are assisting the user in generating a message that is highly relevant to the contact they are messaging. Your goal is to maximize the impact of the message through personalization.

  Consider the following contact context:
  {{contactContext}}

  The user wants the message to have the following tone:
  {{desiredTone}}

  The goal of the message is:
  {{messageGoal}}

  Here is the draft message as a starting point:
  {{draftMessage}}

  Please generate a personalized message suggestion:
  `,
});

const personalizedMessageAssistantFlow = ai.defineFlow(
  {
    name: 'personalizedMessageAssistantFlow',
    inputSchema: PersonalizedMessageAssistantInputSchema,
    outputSchema: PersonalizedMessageAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
