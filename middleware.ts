import { NextRequest, NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "./lib/amplifyServerUtils";
import { fetchAuthSession } from "aws-amplify/auth/server";


export async function middleware(request: NextRequest) {
    const response = NextResponse.next()

    const authenticated = await runWithAmplifyServerContext({
        nextServerContext: {request, response},
        operation: async (context:any) => {
            try{
                const session = await fetchAuthSession(context, {})
                return session.tokens !== undefined
            }catch(err){
                console.log(err)
                return false
            }
        }
    })
    if(authenticated) {
        return response
    }
    return NextResponse.redirect(new URL('/sign-in', request.url))
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sign-in|cart|profile|products|admin).*)"]
}