"use client";

import { useState } from "react";

const Home = () => {
    const [content, setContent] = useState("");
    const [ttl, setTtl] = useState("");
    const [maxViews, setMaxViews] = useState("");
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");

    const submit = async () => {
        setError("");
        setUrl("");

        const body = {
            content,
        };

        if (ttl) body.ttl_seconds = Number(ttl);
        if (maxViews) body.max_views = Number(maxViews);

        const res = await fetch("/api/pastes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.error || "Something went wrong");
            return;
        }

        setUrl(data.url);
        setContent("");
        setTtl("");
        setMaxViews("");
    };

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
                <h1 className="text-2xl font-semibold mb-4 text-black">Pastebin Lite</h1>

                <textarea
                    className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Paste your text here..."
                    rows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <div className="flex gap-3 mt-3">
                    <input
                        className="w-1/2 border rounded-md p-2 text-sm text-black"
                        placeholder="TTL (seconds)"
                        value={ttl}
                        onChange={(e) => setTtl(e.target.value)}
                    />
                    <input
                        className="w-1/2 border rounded-md p-2 text-sm text-black"
                        placeholder="Max views"
                        value={maxViews}
                        onChange={(e) => setMaxViews(e.target.value)}
                    />
                </div>

                <button
                    onClick={submit}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                >
                    Create Paste
                </button>

                {url && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-sm break-all text-black">
                        Paste URL:{" "}
                        <a className="text-green-700 underline" href={url}>
                            {url}
                        </a>
                    </div>
                )}

                {error && (
                    <div className="mt-3 text-sm text-red-600">{error}</div>
                )}
            </div>
        </main>
    );
}
export default Home