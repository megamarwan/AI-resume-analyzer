import React from 'react'
import { Link } from 'react-router'
import ScoreCircle from './ScoreCircle'

function ResumeCard({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) {
  return (

    <Link to={`/resume/${id}`} className=" resume-card animate-in fade-in"> Resume Cards
        <div className="resume-card-header"><div className='flex flex-col gap-2'>
        <h1 className='!text-black font-bold break-words'>
          {companyName}
        </h1>
        <h2 className='text-leg break-words text-grey-500' >{jobTitle} </h2>
      </div>
        <div className='flex-shrink-0'>
          <ScoreCircle score={feedback.overallScore}></ScoreCircle>
        </div></div>
          <div className='gradient-border animate-in fade-in duration 1000'>
          <div className='w-full h-full'>
          <img src={imagePath}
            alt='resume'
            className='w-full h-[350px] max-sm:h-[250px]] object-cover object-top  py-0' />
          </div>
          </div>
    </Link>
  )
}

export default ResumeCard