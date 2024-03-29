'use client'
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function VerifyPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const verifyFunction = (token:any) => {
        if (!token) {
            router.push('/');
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
            });
    }
  return (
    <div>
        <h1>Verify Page</h1>
        <button onClick={()=>verifyFunction(token)}>click here to verify</button>
        
      
    </div>
  )
}

export default VerifyPage
