const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

interface PromptResponse {
    output: string;
    tokens?: number;
}

export async function promptClaude(userPrompt: string): Promise<PromptResponse> {
    if (!API_KEY) {
        return {
            output: "API key not found. Set VITE_GROQ_API_KEY in .env",
            tokens: 0,
        };
    }

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: userPrompt }],
                max_tokens: 1024,
            }),
        });

        const data = await response.json();
        console.log("GROQ RESPONSE:", JSON.stringify(data));
        const output = data.choices[0]?.message?.content || data.error?.message || JSON.stringify(data) || "No response";;

        return { output, tokens: 0 };
    } catch (error) {
        return {
            output: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
            tokens: 0,
        };
    }
}