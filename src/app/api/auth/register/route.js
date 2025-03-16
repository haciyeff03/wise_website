import { NextResponse } from 'next/server';

// In a real app, you would use a database
const MOCK_USERS = [
    {
        id: '1',
        email: 'user@example.com',
        password: 'password123',
    },
];

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // Simulate server processing time
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Basic validation
        if (!email) {
            return NextResponse.json(
                { message: 'Email is required' },
                { status: 400 }
            );
        }

        // If only email is provided, this is the first step of registration
        // Just check if the email already exists
        if (!password) {
            const existingUser = MOCK_USERS.find(u => u.email === email);

            if (existingUser) {
                return NextResponse.json(
                    { message: 'User with this email already exists' },
                    { status: 409 }
                );
            }

            return NextResponse.json({
                message: 'Email is available',
            });
        }

        // If both email and password are provided, this is the second step
        // Validate password
        if (password.length < 8) {
            return NextResponse.json(
                { message: 'Password must be at least 8 characters' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = MOCK_USERS.find(u => u.email === email);

        if (existingUser) {
            return NextResponse.json(
                { message: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // In a real app, you would hash the password and save to database
        const newUser = {
            id: String(MOCK_USERS.length + 1),
            email,
            password,
        };

        MOCK_USERS.push(newUser);

        return NextResponse.json({
            message: 'Registration successful',
            user: {
                id: newUser.id,
                email: newUser.email,
            },
        });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
} 