import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
const { login } = require('../../../db/users');

let userAccount

export const authOptions = {
    cookie: {
        secure: process.env.NODE_ENV && process.env.NODE_ENV === 'production',
    },
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60
    },
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: { 
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try
                {
                    if (!credentials.username || !credentials.password) return null;
                    const user = await login(credentials.username, credentials.password);

                    if (user && user !== null) {
                        userAccount = {
                            userId: user.userId,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            fullName: `${user.firstName} ${user.lastName}`
                        };
                        return userAccount;
                    }
                    else {
                        console.log("User not found")
                        return null;
                    }
                }
                catch (err) {
                    console.log("Authorize error:", err);
                }

            }
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        // async signIn(user, account, profile) {
        //     try
        //     {
        //         //the user object is wrapped in another user object so extract it
        //         user = user.user;
        //         console.log("Sign in callback", user);
        //         console.log("User id: ", user.userId)
        //         if (typeof user.userId !== typeof undefined)
        //         {
        //             return user;
        //         }
        //         else
        //         {
        //             console.log("User id was undefined")
        //             return false;
        //         }
        //     }
        //     catch (err)
        //     {
        //         console.error("Signin callback error:", err);
        //     }

        // },
        // async register(firstName, lastName, username, password) {
        //     try
        //     {
        //         await createUser(username, password, firstName, lastName)
        //         return true;
        //     }
        //     catch (err)
        //     {
        //         console.error("Failed to register user. Error", err);
        //         return false;
        //     }

        // },
        async jwt({token, user}) {

            if (typeof user !== typeof undefined)
            {
                token.user = user;
            }
            return token;
        },
        async session({session, token}) {
            if (userAccount && userAccount !== null)
            {
                session.user = userAccount;
            }
            else if (typeof token.user !== typeof undefined && (typeof session.user === typeof undefined
                || (typeof session.user !== typeof undefined && typeof session.user.userId === typeof undefined)))
            {
                session.user = token.user;
            }
            else if (typeof token !== typeof undefined)
            {
                session.token = token;
            }
            return session;
        },
    }
}
export default NextAuth(authOptions)