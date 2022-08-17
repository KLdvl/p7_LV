import React, {useState} from 'react';
import axios from 'axios';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailInvalid, setEmailInvalid] = useState('')
    const [passwordInvalid, setPasswordInvalid] = useState('')

    const handleSignup = (e) => {
        e.preventDefault();
        setEmailInvalid('')
        setPasswordInvalid('')

        const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        if (!emailRegex.test(email)) return setEmailInvalid("L'adresse e-mail est invalide")

        axios({
            method: "post",
            mode: "cors",
            url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
            data: {
                email: email,
                password: password
            }
        })
            .then((res) => {
                localStorage.setItem('user', JSON.stringify(res.data));
                window.location = "/profil"
            })
            .catch((err) => {
                if (err.response.status === 400) return setPasswordInvalid(err.response.data.message)
                if (err.response.status === 500) return setEmailInvalid("L'adresse e-mail existe déjà")
            })
    }

    return (
        <form action="" onSubmit={handleSignup} id="sign-up-form">
            <label htmlFor="email">Email</label>
            <input type="text"
                   name="email"
                   id="email"
                   onChange={(e) => setEmail(e.target.value)}
                   value={email}
            />
            <div className="email-error">{emailInvalid}</div>
            <label htmlFor="password">Mot de passe</label>
            <input type="password"
                   name="password"
                   id="password"
                   onChange={(e) => setPassword(e.target.value)}
                   value={password}
            />
            <div className="password-error">{passwordInvalid}</div>
            <input type="submit" value="S'enregistrer"/>
        </form>
    );
};

export default SignUpForm;