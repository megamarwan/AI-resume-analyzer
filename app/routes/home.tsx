import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Navbar from "~/components/Navbar";
import {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My first project" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <main className = "bg-[url('./images/bg-main.svg')]  bg-cover">
    <Navbar/>
    <section className="main-section">
      <div className="page-heading"></div>
      <h1>track yor application and resume heading</h1>
      <h2>review your resume here</h2>
    
   
      {resumes.length  > 0 && (
        <div className="resumes-section ">
       {  resumes.map( (resume)=> (
         <ResumeCard key="resume.id" resume={resume} />
         
        ))} </div>
      )}
      </section>
  </main>

}
