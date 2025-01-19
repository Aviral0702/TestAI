import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from   "next-auth/providers/google";
export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async session({session,token}) {
            session.user.id = token.id;
            return session;
        },
        async jwt({token, user}) {
            if(user) token.id = user.id;
            return token;
        },
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};