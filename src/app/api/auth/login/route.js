import { NextResponse } from 'next/server';

// In a real app, you would use a database and proper authentication
const MOCK_USERS = [
    {
        id: '1',
        email: 'user@example.com',
        // In a real app, this would be hashed
        password: 'password123',
    },
];

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // Simulate server processing time
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Basic validation
        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find user (in a real app, you would query your database)
        const user = MOCK_USERS.find(u => u.email === email);

        if (!user || user.password !== password) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // In a real app, you would create a session or JWT token here
        return NextResponse.json({
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
            },
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
} 