"use client";
import {Suspense, useContext, useEffect} from "react";
import Loading from "../components/loading";
import {AuthContext} from "@/contexts/auth.context";
import Hero from "@/components/hero";
import ScrollIndicator from "@/components/scrollindicator";
import Welcome from "@/components/welcome";
import {useRouter} from "next/navigation";
import Button from "@/components/button";

export default function Home() {
  const router = useRouter();
  const { setCookieEmailValue, setCookieAccessToken } = useContext(AuthContext);

  useEffect(() => {
    // Check if the router is available
    if (!router) return;

    // Your router-related logic here
  }, [router]);

  useEffect(() => {
    const checkCookie = () => {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("email"))
        ?.split("=")[1];
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken"))
        ?.split("=")[1];
      if (cookieValue && accessToken) {
        setCookieEmailValue(cookieValue);
        setCookieAccessToken(accessToken);
      } else {
        // Not logged in
        router.push("/login");
      }
    };

    checkCookie();
  }, []);

  return (
      <main className="min-h-screen snap-y snap-mandatory overflow-y-scroll overscroll-behavior-none">
        <Suspense fallback={<Loading/>}>
          <div className="snap-center h-screen">
            <Hero/>
          </div>
          <div className="hidden md:visible snap-center h-screen">
            <Welcome/>
          </div>
          <div className="snap-center h-[50vh] flex items-center justify-center">
            <Button text={"Choose Domains"} onClick={() => router.push("/teams")}/>
          </div>
        </Suspense>
        <ScrollIndicator/>
      </main>
  );
}
