import React, { useRef, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase/config';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const [message, setMessage] = useState<string>('')
    const [alert, setAlert] = useState<boolean>(false)
    const [status, setStatus] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, String(emailRef?.current?.value), String(passwordRef.current?.value))
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                if (user) {
                    setMessage('user Authenticated!')
                    setStatus(true)
                    setAlert(true)
                    setTimeout(() => {
                        setAlert(false)
                        navigate('/')
                        setMessage(``)
                    }, 3000)

                }
                // ...
            })
            .catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                setMessage(`${errorMessage}`)
                setStatus(false)
                setAlert(true)
                setTimeout(() => {
                    setAlert(false)
                    setMessage(``)
                }, 3000)
            });
    }



    return (
        <main className="overflow-y-auto h-screen pb-20 max-w-[1124px] no-scrollbar mx-auto">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className='whitespace-nowrap text-3xl lg:text-5xl font-bold text-center font-pacific'>I-Gallery</h1>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to I-Gallery</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input ref={emailRef} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div className="text-sm">
                                    {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a> */}
                                </div>
                            </div>
                            <div className="mt-2">
                                <input ref={passwordRef} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" />
                            </div>
                        </div>

                        <div>
                            <button onClick={handleLogin} type="submit" className="flex w-full justify-center rounded-md bg-[#00AB6B] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#00ab6ccf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
            {
                alert &&
                <div className='absolute top-4 right-4'>
                    {
                        status ?
                            <div className="bg-[#00ab6b] text-sm text-white rounded-md p-4" role="alert">
                                <span className="font-bold">Success</span> alert! {`${message}`}
                            </div> :
                            <div className="bg-red-500 text-sm text-white rounded-md p-4" role="alert">
                                <span className="font-bold">Error</span> alert! {`${message}`}
                            </div>
                    }
                </div>
            }
        </main>

    )
}

export default Login