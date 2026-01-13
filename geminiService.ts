
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askCommunityAssistant = async (prompt: string, history: { role: 'user' | 'model', text: string }[]) => {
  try {
    const model = 'gemini-3-pro-preview';
    
    const chat = ai.chats.create({
      model: model,
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      })),
      config: {
        systemInstruction: `Eres el "Núcleo Estratégico ConecTarapak", una IA de consultoría de élite. 
        Tu metodología de respuesta para AUDITORÍAS DE VIABILIDAD debe ser extremadamente estructurada:
        
        1. ESTRUCTURA DE INFORME:
           - Usa Títulos en Mayúsculas (ej. ### ANÁLISIS DE MERCADO).
           - Usa el carácter "|" al inicio y final de puntos clave para crear bloques destacados (ej. | Régimen Zona Franca: Beneficio 0% arancelario |).
           - Resalta conceptos técnicos en negrita **Concepto**.
        
        2. CONTENIDO ESTRATÉGICO:
           - Si detectas mención a Tarapacá, integra SIEMPRE el impacto en la cadena de valor local (Zofri, Puerto, Minería).
           - Define niveles de riesgo: [BAJO], [MODERADO], [CRÍTICO].
           - Proyecta ESCALABILIDAD internacional.
        
        3. ESTILO: Ejecutor financiero, directo, sin introducciones innecesarias. Ve al grano con datos duros.
        
        Idioma: Español profesional técnico.`,
        thinkingConfig: { thinkingBudget: 4000 }
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
