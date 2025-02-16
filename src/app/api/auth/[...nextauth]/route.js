import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from   "next-auth/providers/google";
import { prisma } from "../../projects/route";
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
            if(session.user) {
                const user = await prisma.user.findUnique({
                    where: {
                        id: session.user.id
                    }
                });
                if(!user) {
                    await prisma.user.create({
                        data: {
                            id: session.user.id,
                            email: session.user.email,
                            name: session.user.name,
                            hashedPassword: session.user.hashedPassword || "123456"
                        }
                    })
                }
            }
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