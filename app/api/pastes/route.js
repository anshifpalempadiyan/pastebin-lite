import { error } from "console";
import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";


export const POST = async (request) => {
    let body
    try {
        body = await request.json()
        
    } catch (error) {
        return NextResponse.json( {message:"Invalid Json format"}, {status:400} )
        
    }

    const { content , ttl_seconds , max_views } = body 

    if ( typeof content !== "string" || content.trim().length === 0) {
        return NextResponse.json( {error:"Content must be a non-empty string "} , { status : 400 } )
    }
    if ( ttl_seconds !== undefined ) {
        if ( !Number.isInteger(ttl_seconds) || ttl_seconds < 1 ){
            return NextResponse.json( { error : " ttl_seconds must be an integer >= 1"} , { status : 400 })
        }
    }

    if ( max_views !== undefined ) {
        if ( !Number.isInteger(max_views) || max_views < 1 ) {
            return NextResponse.json( { error : "max_views must be an integer >= 1"} , { status : 400})
        }
    }

    const id = crypto.randomUUID();
    const createdAt = new Date()

    let expiresAt = null
    if (ttl_seconds !== undefined ) {
        expiresAt = new Date( createdAt.getTime() + ttl_seconds * 1000 )
    }

    const client = await clientPromise
    const db = client.db()

    await db.collection("pastes").insertOne({
        id,
        content,
        created_at : createdAt,
        expires_at : expiresAt,
        max_views : max_views ?? null,
        views_used : 0,
    })

    const baseUrl = request.nextUrl.origin



    return NextResponse.json( { id , url : `${baseUrl}/p/${id}` } , { status : 201 })
}