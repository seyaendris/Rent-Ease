import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { email, name, password } = body;

    // Hash the password with a salt of 12 rounds
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user in the database
    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword,
        }
    });

    // Return the created user as JSON
    return NextResponse.json(user);
}
