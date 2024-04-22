"use client";
import Quizcard from "@/components/quizcard";
import styles from "./dashboard.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/loader";
import { redirect } from "next/navigation";

type Quiz = {
  completed: boolean;
  subdomain: string;
};

type ResponseData = {
  tech: Quiz[];
  management: Quiz[];
  design: Quiz[];
};

export default function Dashboard() {
  const [techsub_pending, setTechsub_pending] = useState<string[]>([]);
  const [managementsub_pending, setManagementsub_pending] = useState<string[]>(
    []
  );
  const [designsub_pending, setDesignsub_pending] = useState<string[]>([]);
  const [techsub_completed, setTechsub_completed] = useState<string[]>([]);
  const [managementsub_completed, setManagementsub_completed] = useState<
    string[]
  >([]);
  const [designsub_completed, setDesignsub_completed] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  function removeLoader() {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  useEffect(() => {
    document.body.style.overflow = "auto";
    const emailValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("email"))
      ?.split("=")[1];

    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken"))
      ?.split("=")[1];
    if (!emailValue || !accessToken) {
      redirect("/login");
    }
    setLoading(true);
    axios
      .get<ResponseData>(
        `${process.env.BACKEND_URL}/get_domains/${emailValue}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        localStorage.setItem("domains", JSON.stringify(response.data));
        removeLoader();
        setTechsub_pending(
          response.data.tech
            .filter((item) => !item.completed)
            .map((item) => item.subdomain)
        );
        setTechsub_completed(
          response.data.tech
            .filter((item) => item.completed)
            .map((item) => item.subdomain)
        );
        setManagementsub_pending(
          response.data.management
            .filter((item) => !item.completed)
            .map((item) => item.subdomain)
        );
        setManagementsub_completed(
          response.data.management
            .filter((item) => item.completed)
            .map((item) => item.subdomain)
        );
        setDesignsub_pending(
          response.data.design
            .filter((item) => !item.completed)
            .map((item) => item.subdomain)
        );
        setDesignsub_completed(
          response.data.design
            .filter((item) => item.completed)
            .map((item) => item.subdomain)
        );
      })
      .catch((error) => {
        removeLoader();
        console.log(error);
      });
  }, []);

  return (
    <>
      <main className="pt-24 md:pt-20 min-h-screen flex justify-center items-center text-2xl md;text-3xl text-white">
        Round 2 updates will be shared soon
        {/*<section className="md:h-[42vh] w-screen px-5 md:px-20">
          <div className=" h-full w-full flex flex-col justify-center">
            <h1 className="ml-5 text-white text-center md:text-left font-striger text-3xl">
              Pending Quizzes
            </h1>
            <div
              className={` flex flex-col md:flex-row md:overflow-x-auto my-2 ${styles.scrollContainer}`}
            >
              {techsub_pending.length === 0 &&
              managementsub_pending.length === 0 &&
              designsub_pending.length === 0 ? (
                <h1 className="text-white font-sarpanch h-full w-full text-3xl text-center my-5">
                  No Pending Quizzes
                </h1>
              ) : (
                <>
                  {techsub_pending.map((sub, index) => (
                    <Quizcard
                      domain="Tech"
                      key={index}
                      subDomain={sub}
                      completed={false}
                    />
                  ))}
                  {managementsub_pending.map((sub, index) => (
                    <Quizcard
                      domain="Management"
                      key={index}
                      subDomain={sub}
                      completed={false}
                    />
                  ))}
                  {designsub_pending.map((sub, index) => (
                    <Quizcard
                      domain="Design"
                      key={index}
                      subDomain={sub}
                      completed={false}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </section>
        <section className="md:h-[42vh] w-screen px-5 md:px-20 mb-5 md:mb-0">
          <div className=" h-full w-full flex flex-col justify-center">
            <h1 className="ml-5 text-white text-center md:text-left font-striger text-3xl">
              Completed Quizzes
            </h1>
            <div
              className={`flex flex-col md:flex-row md:overflow-x-auto my-2  ${styles.scrollContainer}`}
            >
              {techsub_completed.length === 0 &&
              managementsub_completed.length === 0 &&
              designsub_completed.length === 0 ? (
                <h1 className="text-white font-sarpanch h-full w-full text-3xl text-center my-5">
                  No quizzes are completed yet!
                </h1>
              ) : (
                <>
                  {techsub_completed.map((sub, index) => (
                    <Quizcard
                      domain="Tech"
                      key={index}
                      subDomain={sub}
                      completed={true}
                    />
                  ))}
                  {managementsub_completed.map((sub, index) => (
                    <Quizcard
                      domain="Management"
                      key={index}
                      subDomain={sub}
                      completed={true}
                    />
                  ))}
                  {designsub_completed.map((sub, index) => (
                    <Quizcard
                      domain="Design"
                      key={index}
                      subDomain={sub}
                      completed={true}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </section>{" "}
        <Loader visibility={loading}></Loader> */}
      </main>
    </>
  );
}
