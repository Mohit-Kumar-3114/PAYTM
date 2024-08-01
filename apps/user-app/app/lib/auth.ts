import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { Prisma } from '@prisma/client';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
        password: { label: "Password", type: "password", required: true }
      },

      async authorize(credentials:any) {
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

          
          const result = await db.$transaction(async (prisma: Prisma.TransactionClient) => {

            const user = await prisma.user.create({
              data: {
                number: credentials.phone,
                password: hashedPassword
              }
            });

       
            await prisma.balance.create({
              data: {
                userId: user.id,
                amount: 0, 
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
