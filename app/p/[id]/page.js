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
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
                <h1 className="text-xl font-semibold mb-4 text-black">Paste</h1>
                <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded-md text-black">
                    {data.content}
                </pre>
            </div>
        </main>
    );
}

export default PastePage 