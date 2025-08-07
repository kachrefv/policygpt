import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, name, password } = body;

        if (!email || !name || !password) {
            return new NextResponse('Missing info', { status: 400 });
        }

        const exist = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (exist) {
            return new NextResponse('Email already exists', { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error('REGISTRATION_ERROR', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}