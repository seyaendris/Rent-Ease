import { User } from "@prisma/client";

export type safeUser = Omit<
    User,
    "createdAt" | "emailVerified"
> & {
    createdAt: string
    updatedAt: string
    emailVerified: string | null
}
