import { retrieveData, retrieveDataById } from "@/lib/service";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const id = searchParams.get("id");

    if(id) {
        const detailProduct = await retrieveDataById("Guests", String(id));
        if(detailProduct){
            return NextResponse.json({
                status:200, 
                message: "Success", 
                data: detailProduct})
        }

        return NextResponse.json({
            status:404, 
            message: "Not Found", 
            data: {}
        })
    }

    const products = await retrieveData("Guests");
    return NextResponse.json({ status:200, message: "Success", data: products });
}