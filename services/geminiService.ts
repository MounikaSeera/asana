
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface GeneratedTask {
  name: string;
  description: string;
}

export const generateRealisticTasks = async (
  projectType: string,
  department: string,
  count: number = 5
): Promise<GeneratedTask[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate ${count} highly realistic task names and descriptions for a ${projectType} project in an ${department} department of a B2B SaaS company. Use specific technical or business jargon. Avoid generic names like 'Task 1'.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ["name", "description"],
          },
        },
      },
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Error generating tasks:", error);
    return Array(count).fill(null).map((_, i) => ({
      name: `Fallback Task ${i + 1}`,
      description: "Fallback description generated due to API error.",
    }));
  }
};

export const generateUserNames = async (count: number): Promise<string[]> => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate ${count} realistic professional full names for employees at a tech company.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
        },
      });
      return JSON.parse(response.text.trim());
    } catch (error) {
      console.error("Error generating names:", error);
      return ["John Doe", "Jane Smith"];
    }
};
