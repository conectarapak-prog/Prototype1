
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askCommunityAssistant = async (prompt: string, history: { role: 'user' | 'model', text: string }[]) => {
  try {
    const model = 'gemini-3-flash-preview';
    
    const chat = ai.chats.create({
      model: model,
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      })),
      config: {
        systemInstruction: `Eres el Asistente IA de ConecTarapak, la plataforma líder de crowdfunding e innovación en la región de Tarapacá. Tu misión es:
        1. Asesorar en el escalamiento nacional e internacional de proyectos regionales.
        2. Fomentar alianzas estratégicas y la consolidación de ideas innovadoras.
        3. Priorizar el impacto ambiental y la economía circular en cada consejo.
        4. Brindar acompañamiento automatizado para la ejecución técnica y financiera impecable de cada proyecto.
        Mantén un tono profesional, motivador, regionalista pero con visión global, y altamente técnico en ejecución. Respuestas en ESPAÑOL.`,
      }
    });

    const result = await chat.sendMessage({ message: prompt });
    return result.text;
  } catch (error) {
    console.error("Error en API Gemini:", error);
    return "Error de enlace con el núcleo central. Por favor, reintente la conexión.";
  }
};

export const getIntelligenceUpdates = async () => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Genera 3 actualizaciones breves y técnicas sobre el estado del crowdfunding, startups de economía circular o hitos ambientales en la región de Tarapacá, Chile. Máximo 20 palabras por actualización. Formato JSON: [{time: 'HH:MM', text: '...'}]",
      config: {
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error obteniendo inteligencia:", error);
    return [
      { time: '09:42', text: 'Auge en proyectos de reciclaje industrial detectado en Zona Franca.' },
      { time: '08:15', text: 'Nueva ronda de crowdfunding para startups de desalinización solar abierta.' },
      { time: '07:00', text: 'Alerta: Alianza estratégica internacional firmada para escalamiento de agro-tech.' }
    ];
  }
};
