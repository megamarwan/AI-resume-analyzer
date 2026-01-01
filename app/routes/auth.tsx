import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { usePuterStore } from '~/lib/puter'
export const meta = () => {
    [
        { title: 'resumineauth' },
        { naem: 'description', content: 'log into your account' }
    ]
}
const auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1]; //the variable next
    //holds the second element [1]
    // after the 'next='
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate(next);
        }

    }, [auth.isAuthenticated, next])
    return (
        <main className="bg-[url('./images/bg-main.svg')]  bg-cover main-h-screen flex items-center justify-center">
            <div className='gradient-border shadow-lg'>
                <section className='flex flex-col gap-8 bg-whiet rounded-2xl p-10'>
                    <div className='flex flex-col items-center gap-2 text-center'>
                        <h1>welcome </h1>
                        <h2>log into your account</h2>
                        <div>
                            {isLoading ? (<button className='auth-button   animate-pulse'><p>is loading</p></button>)
                                : (<> {auth.isAuthenticated ? (<button className='auth-button' onClick={auth.signOut}>
                                    <p>logout</p>
                                </button>) : (<button className='auth-button' onClick={auth.signIn}>
                                    <p>sign in</p>
                                </button>)}</>)}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default auth