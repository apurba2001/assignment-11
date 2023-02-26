import { useState } from 'react'

const Player = () => {
    const [login, setLogin] = useState(true)
    const [formData, setFormData] = useState({})
    const handleForm = (e) =>{
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div>
                {
                    login ? (
                        <>
                            <input name='email' type='text' placeholder='Email' onChange={handleForm} />
                            <input name='password' type='text' placeholder='Password' onChange={handleForm} />
                            <button >Login</button>
                        </>
                    ) :
                        <>
                            <input name='name' type='text' placeholder='Name' onChange={handleForm} />
                            <input name='email' type='text' placeholder='Email' onChange={handleForm} />
                            <input name='password' type='text' placeholder='Password' onChange={handleForm} />
                            <button >SignUp</button>
                        </>
                }
                <p style={{ color: 'blue', textDecoration: 'underline', cursor: "pointer" }} onClick={() => setLogin(pre => !pre)}>{login ? 'Not have an account Signup' : "Already have an account Login"} </p>
            </div>
        </div>
    )
}

export default Player