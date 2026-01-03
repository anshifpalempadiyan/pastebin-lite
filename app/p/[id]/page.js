import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

const PastePage = async ({ params }) => {
    const { id } = await params

    const client = await clientPromise
    const db = client.db()

    const data = await db.collection("pastes").findOne({ id })

    if (!data) {
        notFound()
    }

    let now = Date.now()

    if (data.expires_at && now > new Date(data.expires_at).getTime()) {
        notFound()
    }

    if (data.max_views !== null && data.views_used >= data.max_views) {
        notFound()
    }

    await db.collection("pastes").updateOne({ id }, { $inc: { views_used: 1 } })

    return (
        <main style={{ padding: "20px", whiteSpace: "pre-wrap" }}>
            <pre>{data.content}</pre>
        </main>
    );
}

export default PastePage 