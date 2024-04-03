"use client";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toast, Toaster } from "react-hot-toast";
import Link from "next/link";
import { div } from "three/examples/jsm/nodes/Nodes.js";

function VerifyPage() {
  const [verified, setVerified] = useState(false);
  const router = useRouter();
  const VerifyComponent = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const verifyFunction = (token: any) => {
      if (!token) {
        toast.error("No token found check you mail", {
          duration: 1000,
          position: "top-center",
        });
        toast.error("Redirecting to signup page", {
          duration: 1000,
          position: "bottom-center",
        });
        setTimeout(() => {
          router.push("/signup");
        }, 1000);
        return;
      }
      fetch("/api/users/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            toast.success(data.message, {
              duration: 1000,
              position: "top-center",
            });
            setVerified(true);
            router.push("/");
          } else {
            toast.error(data.message, {
              duration: 2000,
              position: "top-center",
            });
            setVerified(false);
          }
        });
    };
    return (
      <div>
        <h1>Verify Page</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => verifyFunction(token)}
        >
          click here to verify
        </button>
        {verified && (
          <div>
            <h1>Verified</h1>
            <Link className="text-blue-500 hover:underline" href="/login">
              Login Here
            </Link>
          </div>
        )}

        <Toaster />
      </div>
    );
  };
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyComponent />
      </Suspense>
    </div>
  );
}

export default VerifyPage;
