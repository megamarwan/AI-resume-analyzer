import React from 'react'
import Navbar from '~/components/Navbar'
import { useState } from 'react'
import { type FormEvent } from 'react'
import { FileUpLoader } from '~/components/fileuploader'
import { prepareInstructions } from 'constants/index'
import { convertPdfToImage } from '~/lib/pdfToImage/pdfToImage'
import { usePuterStore } from '~/lib/puter'
import { generateUUID } from '~/lib/utils'

import { Navigate } from 'react-router'
import { useNavigate } from 'react-router'

const UploadPage = () => { // Renamed component for standard practice
    const [isProcessing, setProcessing] = useState(false);
    const { fs, auth, ai, kv } = usePuterStore();
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate()
    

    // Function to handle the file passed up from FileUpLoader
    const handleFileSelect = (selectedFile: File | null) => {
        setFile(selectedFile);
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: {
        companyName: string;
        jobTitle: string;
        jobDescription: string;
        file: File;
    }): Promise<void> => {

        setProcessing(true);
        setStatusText('uploading the file..');
        const uploadedFile = await fs.upload([file]);

        if (!uploadedFile) return setStatusText('error failed to upload')

        setStatusText('converting to image')

        const imageFile = await convertPdfToImage(file)

        if (!imageFile.file) return setStatusText('error failed to convert to image')


        setStatusText("uploading the image")
        const uploadedImage = await fs.upload([imageFile.file]);
        if (!uploadedImage) return setStatusText('error failed to upload')
        setStatusText('preparing text')
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imageFile: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }

        await kv.set(`resume${uuid}`, JSON.stringify(data))
        setStatusText("analyzing")
        const feedback = await ai.feedback(uploadedFile.path, prepareInstructions({ jobTitle, jobDescription }));
        if (!feedback) return setStatusText('error failed to analyze')
        const feedbackText = typeof feedback.message.content === 'string' ? feedback.message.content
            : feedback.message.content[0].text
        data.feedback = JSON.parse(feedbackText)
        await kv.set(`resume${uuid}`, JSON.stringify(data))
        setStatusText('analysis complete')
        console.log(data)
        navigate(`/resume/${uuid}`)


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
        const companyName = formData.get('company-name') as string
        const jobTitle = formData.get('job-title') as string
        const jobDescription = formData.get('job-description') as string // FIX: Spelling

        // Append the file state to the FormData for submission
        formData.append('resume', file);
        setProcessing(true); // Example Submission Logic:
        setStatusText('Analyzing resume...');

        // await fetch('YOUR_API_ENDPOINT', { method: 'POST', body: formData });
        // setProcessing(false);
        // setStatusText('Analysis Complete!');

        if (!file) return;
        handleAnalyze({ companyName, jobTitle, jobDescription, file });

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