'use server';

/**
 * @fileOverview This file defines a Genkit flow for explaining concepts using AI.
 *
 * The flow takes a concept as input and returns a simple explanation.
 *
 * - explainConcept - A function that handles the concept explanation process.
 * - ExplainConceptInput - The input type for the explainConcept function.
 * - ExplainConceptOutput - The return type for the explainConcept function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainConceptInputSchema = z.object({
  concept: z
    .string()
    .describe('The concept to be explained.'),
});
export type ExplainConceptInput = z.infer<
  typeof ExplainConceptInputSchema
>;

const ExplainConceptOutputSchema = z.object({
  explanation: z
    .string()
    .describe(
      'A simple and easy-to-understand explanation of the concept.'
    ),
});
export type ExplainConceptOutput = z.infer<
  typeof ExplainConceptOutputSchema
>;

export async function explainConcept(
  input: ExplainConceptInput
): Promise<ExplainConceptOutput> {
  return conceptExplainerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'conceptExplainerPrompt',
  input: {schema: ExplainConceptInputSchema},
  output: {schema: ExplainConceptOutputSchema},
  prompt: `Você é um excelente professor com a habilidade de explicar conceitos complexos de forma simples e clara.

  Explique o seguinte conceito da maneira mais simples possível, como se estivesse explicando para uma criança de 10 anos:

  Conceito: {{{concept}}}
  `,
});

const conceptExplainerFlow = ai.defineFlow(
  {
    name: 'conceptExplainerFlow',
    inputSchema: ExplainConceptInputSchema,
    outputSchema: ExplainConceptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
