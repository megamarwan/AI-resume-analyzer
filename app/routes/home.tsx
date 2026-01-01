import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Navbar from "~/components/Navbar";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "My first project" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth?next=/');
    }
  }, [auth.isAuthenticated])
  return <main className="bg-[url('./images/bg-main.svg')]  bg-cover">
    <Navbar />
    {/* {window.puter.ai.chat()} */}
    <section className="main-section">
      <div className="page-heading"></div>
      <h1>track yor application and resume heading</h1>
      <h2>review your resume here</h2>


      {resumes.length > 0 && (
        <div className="resumes-section ">
          {resumes.map((resume) => (
            <ResumeCard key="resume.id" resume={resume} />

          ))} </div>
      )}
    </section>
  </main>

}
