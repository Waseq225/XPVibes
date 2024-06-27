import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import Header from '../components/Header'

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function registerUser(ev) {
        // ev.prevantDefault();
        axios.get('http://localhost:4000/test')
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <Header />
            <div className="mt-4 grow flex items-center justify-around">
                <div className="mb-64">
                    <h1 className="text-4xl text-center mb-4">Register</h1>
                    <form className="max-w-md mx-auto " onSubmit={registerUser} >
                        <input type="text" className="custom-input"
                            placeholder="John Doe"
                            value={name}
                            onChange={ev => setName(ev.target.value)} />
                        <input type="email" className="custom-input"
                            placeholder={'your@email.com'}
                            value={email}
                            onChange={ev => setEmail(ev.target.value)} />
                        <input type="password" className="custom-input"
                            placeholder="password"
                            value={password}
                            onChange={ev => setPassword(ev.target.value)} />
                        <button className="primary" >Register</button>
                        <div className="text-center py-2 text-gray-500">
                            Already a member? <Link className='underline text-black' to={'/login'}>Login</Link>
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
}