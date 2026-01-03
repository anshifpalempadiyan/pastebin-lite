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
        <main style={{ padding: 20 }}>
            <h1>Pastebin Lite</h1>

            <textarea
                placeholder="Paste content here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                style={{ width: "100%" }}
            />

            <div style={{ marginTop: 10 }}>
                <input
                    placeholder="TTL (seconds)"
                    value={ttl}
                    onChange={(e) => setTtl(e.target.value)}
                />
                <input
                    placeholder="Max views"
                    value={maxViews}
                    onChange={(e) => setMaxViews(e.target.value)}
                    style={{ marginLeft: 10 }}
                />
            </div>

            <button onClick={submit} style={{ marginTop: 10 }}>
                Create Paste
            </button>

            {url && (
                <p>
                    Paste URL: <a href={url}>{url}</a>
                </p>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </main>
    );
}
export default Home