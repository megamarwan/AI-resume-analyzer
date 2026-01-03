import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import React from 'react'; // React is now imported for JSX use

interface FileUpLoaderProps {
    onFileSelect?: (file: File | null) => void;
}

export const FileUpLoader = ({ onFileSelect }: FileUpLoaderProps) => {

    // The onDrop handler now only focuses on notifying the parent component.
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);
    }, [onFileSelect]);

    // useDropzone configuration is clean and correct.
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        maxFiles: 1,
        multiple: false
    });

    // Correctly derive the file from the dropzone state (no need for useState)
    const file = acceptedFiles[0] || null;

    return (
        <div className='w-full gradient-border p-4'>
            {/* Must call getRootProps() */}
            <div {...getRootProps()} className='cursor-pointer p-8 flex flex-col items-center justify-center'>
                <input {...getInputProps()} />
                
                <div className='space-y-4 text-center'>
                    
                    {/* Icon container */}
                    <div className='mx-auto w-16 h-16 flex items-center justify-center'> 
                        {/* FIX 2: Corrected items-center and justify-center */}
                        {file ? (
                             <img src='images/pdf.png' alt='PDF selected' className='size-16'/>
                        ) : (
                             <img src='icons/info.svg' alt='upload' className='size-20'/>
                        )}
                    </div>
                    
                    {/* File Display vs. Instructions */}
                    {file ? (
                        <div className='flex items-center space-x-3 justify-center'>
                            {/* FIX 2: Corrected item-center */}
                            <div>
                                <p className='text-lg font-medium text-gray-700'>
                                     {/* FIX 2: Corrected text-leg */}
                                    {file.name}
                                </p>
                                <p className='text-sm text-green-600'>File Ready for Analysis</p>
                            </div>
                        </div>
                    ) : (
                        // Instructions
                        <div>
                            <p className='text-lg text-gray-500'>
                                {/* Use isDragActive for dynamic feedback */}
                                <span className='font-semibold text-blue-600'>
                                    {isDragActive ? 'Drop file here' : 'Drag file here or click to select'}
                                </span>
                            </p>
                            {/* FIX 2: Corrected text-leg */}
                            <p className='text-sm text-gray-500'>PDF only, max 200 megabyte</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};