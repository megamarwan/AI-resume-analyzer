import React from 'react'
import ScoreGauge from './ScoreGauge'

const Category = ({title,score} : {title:string,score:number}) => {

  return ( <div className='resume-summary'>
    <div className='category'>
      <div className='flex flex-row gap-2 items-center justify-center'>
        <p className='text-2xl'>{title}</p>
      </div>
     <p className='text-2xl'> <span className='{textColor}'>{score}</span></p> 

    </div>
     
  </div>)
}

export const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className='bg-white rounded-2xl shadow-md w-full'>
      <div className='flex flex-row item-center p-4 gap-8'>
        <ScoreGauge score ={feedback.overallScore}/>
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl font-bold'> your resume score</h2>
          <p className='text-sm text-grey-500'>this score is calculated basef on variables </p>
        </div>
      <Category title='tone and style' score={feedback.toneAndStyle.score} />
      <Category title='content' score={feedback.content.score} />
      <Category title='structure' score={feedback.structure.score} />
      <Category title='skills' score={feedback.skills.score} />
      </div>
      </div>
  )
}

export default Summary