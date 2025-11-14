
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

export const getSimulatorFeedback = async (scenario: string, userResponse: string): Promise<string> => {
  if (!API_KEY) {
    return "Error: La clave de API de Gemini no está configurada. El simulador no puede funcionar.";
  }

  const systemInstruction = `
    Eres un experto en derecho constitucional mexicano, especializado en interacciones entre ciudadanos y policía.
    Tu rol es ser un simulador educativo. Analiza la respuesta del usuario ante la pregunta del oficial.
    Evalúa la respuesta del usuario con los siguientes criterios:
    1.  ¿Ejerce sus derechos de forma clara y respetuosa? (Ej. derecho a no responder, a no consentir revisiones).
    2.  ¿Es una respuesta que podría escalar o calmar la situación?
    3.  ¿Es legalmente correcta y protectora para el ciudadano?

    Proporciona una respuesta en español, concisa (máximo 3 párrafos), en formato Markdown, estructurada así:
    -   **Evaluación:** Un análisis breve de la respuesta del usuario.
    -   **Sugerencia:** Una recomendación para mejorar la respuesta, o una respuesta modelo.
    -   **Fundamento Legal:** Menciona brevemente el artículo o derecho que respalda la sugerencia (ej. Art. 16 Constitucional).

    Mantén un tono educativo, empoderador y tranquilizador. No des consejos legales, solo información basada en derechos.
  `;
  
  const prompt = `
    Escenario:
    ${scenario}
    
    Respuesta del usuario:
    "${userResponse}"

    Por favor, analiza la respuesta del usuario según las instrucciones.
  `;

  try {
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            systemInstruction
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Hubo un error al procesar tu respuesta. Por favor, inténtalo de nuevo.";
  }
};
