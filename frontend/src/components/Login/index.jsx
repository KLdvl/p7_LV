import React, {useState} from 'react';
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import '../../styles/login.scss';


const Log = () => {
    const [signUpModal, setSignUpModal] = useState(false);
    const [signInModal, setSignInModal] = useState(true);

    const handleModals = (e) => {
        if (e.target.id === "register-btn") {
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login-btn") {
            setSignInModal(true);
            setSignUpModal(false);
        }
    }

    return (
        <div className="connexion-form">
            <div className="form-container">
                <ul>
                    <li>
                        <button onClick={handleModals} id="register-btn"
                                className={signUpModal ? "active-btn" : null}>
                            S'inscrire
                        </button>
                    </li>
                    <li>
                        <button onClick={handleModals} id="login-btn" className={signInModal ? "active-btn" : null}>
                            Se connecter
                        </button>
                    </li>
                </ul>
                {signUpModal && <SignUpForm/>}
                {signInModal && <SignInForm/>}
            </div>
        </div>
    );
};

export default Log;