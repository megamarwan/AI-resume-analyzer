import React from 'react'
import { Link } from 'react-router'

function ResumeCard ({resume}: {resume :Resume}) {
  return (

    <Link to = {`/resume/${resume.id}`} className = " resume-card animate-in fade-in"> Resume Cards 
    <div className='flex flex-col gap-2'>
      <h1 className='!text-black font-bold break-words'> 
        {resume.companyName}    
      </h1>
      <h2 className='text-leg break-words' >{resume.jobTitle} </h2>
    </div>
    </Link>
  )
}

export default ResumeCard