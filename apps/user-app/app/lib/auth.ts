import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
        password: { label: "Password", type: "password", required: true }
      },

      async authorize(credentials: any) {
        const existingUser = await db.user.findFirst({
          where: {
            number: credentials.phone
          }
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.number
            }
          }
          return null;
        }

        try {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          // Use a transaction to ensure both operations succeed or fail together
          const result = await db.$transaction(async (prisma) => {
            // Create a new user
            const user = await prisma.user.create({
              data: {
                number: credentials.phone,
                password: hashedPassword
              }
            });

            // Create an initial balance record for the new user
            await prisma.balance.create({
              data: {
                userId: user.id,
                amount: 0, // or set to some initial amount
                locked: 0
              }
            });

            return user;
          });

          return {
            id: result.id.toString(),
            name: result.name,
            email: result.number
          }
        } catch (e) {
          console.error("Error creating user or balance:", e);
        }

        return null;
      },
    })
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    }
  }
};
