// middleware.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY); // will throw error if expired
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/api/user/protected/*', '/freelancer/*','/client/*'], // Add protected routes here
};
