import React from 'react'
import Navbar from '~/components/Navbar'
import { useState } from 'react'
// import { stat } from 'fs' // 🛑 REMOVED: Invalid Node.js module import
import { type FormEvent } from 'react'
import { FileUpLoader } from '~/components/fileuploader'

const UploadPage = () => { // Renamed component for standard practice
    const [isProcessing, setProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    // Function to handle the file passed up from FileUpLoader
    const handleFileSelect = (selectedFile: File | null) => {
        setFile(selectedFile);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const form = e.currentTarget; // Simplified access to the form element
        const formData = new FormData(form);
        
        // --- 🛑 CRITICAL FIX: Use the state variable for the file ---
        if (!file) {
            setStatusText('Please select a resume file.');
            return;
        }

        // --- Use Corrected Variable Names ---
        const companyName = formData.get('company-name');
        const jobTitle = formData.get('job-title');
        const jobDescription = formData.get('job-description'); // FIX: Spelling

        // Append the file state to the FormData for submission
        formData.append('resume', file); 
        
        // Example Submission Logic:
        setProcessing(true);
        setStatusText('Analyzing resume...');
        
        // await fetch('YOUR_API_ENDPOINT', { method: 'POST', body: formData });
        // setProcessing(false);
        // setStatusText('Analysis Complete!');
        
        console.log({ companyName, jobTitle, jobDescription, fileName: file.name });
    }


    return (
        <main className="bg-[url('./images/bg-main.svg')] bg-cover">
            <Navbar />
            <section className="main-section">

                <div className='page-heading py-16' >smart feedback for your resume</div>
                
                {/* ⚠️ Removed redundant H2/H1 structure, improved status display */}
                {isProcessing ? (
                    <>
                        <h2>{statusText}</h2>
                        <img src='/images/resume-scan.gif' alt='Scanning Resume' className='w-full'></img>
                    </>
                ) : (
                    <h1>Upload Your Resume</h1>
                )}

                {!isProcessing && (
                    <form id='upload-form' onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        {/* Company Name Field */}
                        <div className='form-div'>
                            <label htmlFor='company-name'>Company Name</label>
                            {/* FIX: Removed space from type=" text" */}
                            <input type="text" name="company-name" placeholder="CompanyName" id="company-name" /> 
                        </div>
                        
                        {/* Job Title Field */}
                        <div className='form-div'>
                            <label htmlFor='job-title'>Job Title</label>
                            {/* FIX: Removed space from type=" text" */}
                            <input type="text" name="job-title" placeholder="Job Title" id="job-title" /> 
                        </div>
                        
                        {/* Job Description Field */}
                        <div className='form-div'>
                            <label htmlFor='job-description'>Job Description</label> {/* FIX: Spelling */}
                            <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description" /> {/* FIX: Spelling */}
                        </div>
                        
                        {/* Resume Uploader */}
                        <div className='form-div'>
                            {/* ⚠️ REMOVED: Redundant outer label, FileUpLoader handles its own UX */}
                            <FileUpLoader onFileSelect={handleFileSelect} />
                        </div>
                        
                        <div className='mt-4'>
                            <button className='primary-button' type="submit" disabled={!file}>
                                {/* Disable button if no file is selected */}
                                Analyze Resume
                            </button>
                        </div>
                    </form>
                )}
            </section>
        </main>
    )
}

export default UploadPage