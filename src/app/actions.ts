
'use server';

import { 
  personalizedMessageAssistant, 
  PersonalizedMessageAssistantInput 
} from '@/ai/flows/personalized-message-assistant';
import {
  explainConcept,
  ExplainConceptInput,
} from '@/ai/flows/concept-explainer';


type FormState = {
  success: boolean;
  message: string;
}

export async function generatePersonalizedMessage(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const input: PersonalizedMessageAssistantInput = {
    contactContext: formData.get('contactContext') as string,
    desiredTone: formData.get('desiredTone') as string,
    messageGoal: formData.get('messageGoal') as string,
    draftMessage: formData.get('draftMessage') as string,
  };

  try {
    const result = await personalizedMessageAssistant(input);
    return { success: true, message: result.personalizedMessage };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, message: `Falha ao gerar a mensagem: ${errorMessage}` };
  }
}

export async function explainConceptAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const input: ExplainConceptInput = {
    concept: formData.get('concept') as string,
  };

  if (!input.concept) {
    return { success: false, message: 'O conceito não pode estar vazio.' };
  }

  try {
    const result = await explainConcept(input);
    return { success: true, message: result.explanation };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, message: `Falha ao gerar a explicação: ${errorMessage}` };
  }
}
