import { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/app/libs/prismadb';

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        
    ],
};
