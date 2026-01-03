import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";


export const GET = async ( request , { params }) => {

    const { id } = await params
    console.log(id,"id")

    const client = await clientPromise 
    const db = client.db()

    const idData = await db.collection("pastes").findOne({ id })

    if ( !idData ) {
        return NextResponse.json( { error : "Pastes not found "} , { status : 404 })
    }

    let now = Date.now()
    if ( process.env.TEST_MODE === "1") {
        const testNow = request.headers.get("x-test-now-ms")
        if ( testNow ) {
            now = Number( testNow )
        }
    }

    if ( idData.expires_at && now > new Date( idData.expires_at ).getTime() ) {
        return NextResponse.json( { error : "Paste expired "} , { status : 404 })
    }

    if ( idData.max_views !== null && idData.views_used >= idData.max_views ) {
        return NextResponse.json({ error: "View limit exceeded" } , { status: 404 } )
    }

    await db.collection("pastes").updateOne( { id } , { $inc : { views_used : 1 } })

    let remainingViews = null 
    if ( idData.max_views !== null ) {
        remainingViews = idData.max_views - ( idData.views_used + 1)
    }

    return NextResponse.json(  
        { 
        content : idData.content,
        remaining_views : remainingViews,
        expires_at : idData.expires_at } , 
        
        { status : 200 } )
}