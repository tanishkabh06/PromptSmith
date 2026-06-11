// src/App.tsx
import { useState } from "react";
import { promptClaude } from "./api/prompter";
import "./App.css";

interface SavedPrompt {
    id: number;
    prompt: string;
    response: string;
    timestamp: string;
}

function App() {
    const [inputPrompt, setInputPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>(() => {
        const saved = localStorage.getItem("prompts");
        return saved ? JSON.parse(saved) : [];
    });
    const [loading, setLoading] = useState(false);

    const handleTest = async () => {
        if (!inputPrompt.trim()) return;

        setLoading(true);
        try {
            const result = await promptClaude(inputPrompt);
            setResponse(result.output);
        } catch (error) {
            setResponse(`Error: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        if (!inputPrompt.trim() || !response.trim()) {
            alert("Please test a prompt first");
            return;
        }

        const newPrompt: SavedPrompt = {
            id: Date.now(),
            prompt: inputPrompt,
            response,
            timestamp: new Date().toLocaleString(),
        };

        const updated = [...savedPrompts, newPrompt];
        setSavedPrompts(updated);
        localStorage.setItem("prompts", JSON.stringify(updated));
        alert("Prompt saved!");
    };

    const handleDelete = (id: number) => {
        const updated = savedPrompts.filter((p) => p.id !== id);
        setSavedPrompts(updated);
        localStorage.setItem("prompts", JSON.stringify(updated));
    };

    const handleLoadPrompt = (prompt: SavedPrompt) => {
        setInputPrompt(prompt.prompt);
        setResponse(prompt.response);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <header className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <h1 className="text-3xl font-bold text-slate-900">PromptSmith</h1>
                    <p className="text-slate-600 mt-1">
                        IDE for testing, saving, and exporting AI prompts
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Input & Output */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Input Section */}
                        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                            <label className="block text-sm font-medium text-slate-900 mb-3">
                                Your Prompt
                            </label>
                            <textarea
                                value={inputPrompt}
                                onChange={(e) => setInputPrompt(e.target.value)}
                                placeholder="Write a React component that..."
                                className="w-full h-32 p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
                            />

                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={handleTest}
                                    disabled={loading || !inputPrompt.trim()}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-medium py-2 px-4 rounded-lg transition"
                                >
                                    {loading ? "Testing..." : "Test Prompt"}
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={!response}
                                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white font-medium py-2 px-4 rounded-lg transition"
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                        {/* Output Section */}
                        {response && (
                            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                                <label className="block text-sm font-medium text-slate-900 mb-3">
                                    Response
                                </label>
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 max-h-64 overflow-y-auto">
                                    <p className="text-slate-700 whitespace-pre-wrap font-mono text-sm">
                                        {response}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Saved Prompts */}
                    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm h-fit sticky top-8">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">
                            Saved Prompts ({savedPrompts.length})
                        </h2>

                        {savedPrompts.length === 0 ? (
                            <p className="text-slate-500 text-sm">No prompts saved yet</p>
                        ) : (
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {savedPrompts.map((p) => (
                                    <div
                                        key={p.id}
                                        className="bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer transition"
                                    >
                                        <p
                                            onClick={() => handleLoadPrompt(p)}
                                            className="text-sm font-medium text-slate-900 truncate hover:text-blue-600"
                                        >
                                            {p.prompt.substring(0, 40)}...
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">{p.timestamp}</p>
                                        <button
                                            onClick={() => handleDelete(p.id)}
                                            className="text-xs text-red-600 hover:text-red-700 mt-2"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;