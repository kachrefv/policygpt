export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        '/dashboard',
        '/generate',
        '/policies/:path*',
        '/account'
    ]
}