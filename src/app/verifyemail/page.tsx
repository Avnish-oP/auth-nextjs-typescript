'use client'
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

function VerifyPage() {
    const [isTokenValid, setIsTokenValid] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const verifyFunction = (token:any) => {
        if (!token) {
            router.push('/signup');
        }
        fetch('/api/users/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    router.push('/');
                }
                else {
                    setIsTokenValid(false);
                }
            });
    }
  return (
    <div>
        <h1>Verify Page</h1>
        <button onClick={()=>verifyFunction(token)}>click here to verify</button>
        <p className={`text-red-600 ${isTokenValid? "hidden":"block"}`}>invalid token</p>
    </div>
  )
}

export default VerifyPage
