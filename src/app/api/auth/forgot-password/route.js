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
        const { email } = await request.json();

        // Simulate server processing time
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Basic validation
        if (!email) {
            return NextResponse.json(
                { message: 'Email is required' },
                { status: 400 }
            );
        }

        // Check if user exists
        const user = MOCK_USERS.find(u => u.email === email);

        // For security reasons, don't reveal if the email exists or not
        // Just return success even if the email doesn't exist

        // In a real app, you would:
        // 1. Generate a reset token
        // 2. Save it to the database with an expiration
        // 3. Send an email with a link containing the token

        return NextResponse.json({
            message: 'If an account with that email exists, we have sent a password reset link',
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
} 