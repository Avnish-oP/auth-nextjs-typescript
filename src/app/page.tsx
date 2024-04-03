"use client";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";


export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const [hovered, setHovered] = React.useState(false);
  const getUserInfo = async () => {
    try {
      const response = await axios.get("/api/users/userinfo");
      setUser({
        username: response.data.username,
        email: response.data.email,
      });
    } catch (error: any) {
        toast.error("You are not logged in, redirecting to login page", {
          duration: 2000,
          position: "top-center",
        });
        router.push("/login");
      
      console.log(error.response.data);

    }
  };

  const logout=async()=>{
    fetch("/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message, {
            duration: 2000,
            position: "top-center",
          });
          router.push("/login");
        } else {
          toast.error(data.message, {
            duration: 2000,
            position: "top-center",
          });
        }
      });
  
  }

  useEffect(() => {
    getUserInfo();
  });

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="h-[40rem] flex flex-col lg:flex-row overflow-hidden items-center justify-center bg-black w-full gap-4 mx-auto px-8 relative min-h-screen"
    >
      <div className="flex flex-col gap-10 items-center">
        <p className="md:text-2xl text-2xl -mt-20 font-medium text-center text-white relative z-20 max-w-2xl mx-auto">
          {`Hello, ${user.username}! Your email is ${user.email} it is nice to see you here❤️`}
        </p>
        <button
          className="bg-black border-2 border-white text-green-400 max-w-24 py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out z-50"
          type="submit"
          onClick={logout}
        >
          Logout &rarr;
        </button>
        <Toaster />
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full absolute inset-0"
          >
            <CanvasRevealEffect
              animationSpeed={5}
              containerClassName="bg-transparent"
              colors={[
                [59, 130, 246],
                [139, 92, 246],
              ]}
              opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1]}
              dotSize={2}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
    </div>
  );
}
