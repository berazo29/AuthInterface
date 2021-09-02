import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring'


const LoginForm = () => {
    let person = {email:"foo@mail.com", password:"1234"}
    let mgsList = {
        0: "Empty values are invalid",
        1: "Invalid username/password",
    }
    const [state, toggle] = useState(false)
    const { x } = useSpring({
        from: { x: 0 },
        x: state ? 1: 0,
        config: { duration: 900 }
    })
    const messageAnimation = {
        scale: x.to({
            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
            output: [1, 0.97, 1.1, 0.97, 1.1, 1],
        }),
    }
    const [isVisible, setIsVisible] = useState(false)
    const [msg, setMessage] = useState("");


    const handleFormSubmit = (e) => {
        e.preventDefault();

        let email = e.target.elements.email?.value;
        let password = e.target.elements.password?.value;

        if (person.email === email && person.password === password){
            console.log(email, password)
            setIsVisible(false)
            setMessage("")
        }else {
            console.log("Get out here");
            if (email === '' || password === ''){
                setMessage(mgsList[0])
            }else {
                setMessage(mgsList[1])
            }
            setIsVisible(true)
            toggle(!state)
        }
    };
    return (
        <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Log in to your account
                </h1>

                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='email'
                            placeholder='Your Email'
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            placeholder='Your Password'
                        />
                    </div>
                    {isVisible ? <animated.div style={messageAnimation}><span className={'text-sm text-red'}>{msg}</span></animated.div>: null}
                    <div className='flex justify-center items-center mt-6'>
                        <button
                            className={`bg-green py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
