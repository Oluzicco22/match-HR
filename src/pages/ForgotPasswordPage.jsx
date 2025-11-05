import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Logo from "../assets/matchHr-logo.svg";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({email: ""});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (value) => {
        if (!value) return "Email is required";
        const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return rx.test(value) ? "" : "Enter a valid email address";
    };

    const onEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setErrors({email: validateEmail(value)});
    };

    const isFormValid = email !== "" && errors.email === "";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailError = validateEmail(email);
        setErrors({email: emailError});
        if (emailError || isSubmitting) return;

        try {
            setIsSubmitting(true);
            await new Promise((res) => setTimeout(res, 1000));
            navigate("/create-password");
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="home-bg min-h-screen px-12 py-10">
            <img className="w-auto" src={Logo} alt="mh-Logo"/>
            <div className="flex flex-col mt-30">
                <div className="grid text-center gap-2 mb-16">
                    <h1 className="text-[#333333] font-medium text-2xl">
                        Forgot your password?
                    </h1>
                    <p className="text-[#8E8E8E] font-normal text-center w-[22%] mx-auto leading-[30px]">
                        Don’t worry! We have got you covered. Input your mail to reset your password
                    </p>
                </div>
            </div>

            <div className="w-2/3 mx-auto grid gap-7">
                <form onSubmit={handleSubmit} className="w-1/2 mx-auto flex flex-col gap-7">
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email-input" className="text-[#333333] font-medium">
                            Email
                        </label>
                        <input
                            id="email-input"
                            type="email"
                            value={email}
                            onChange={onEmailChange}
                            placeholder="example@gmail.com"
                            className={`w-full px-6 py-3 border rounded-2xl font-light text-[#3A3A3A] transition ${
                                errors.email === "" && email !== ""
                                    ? "border-green-500"
                                    : errors.email
                                        ? "border-red-500"
                                        : "border-[#BBBBBB]"
                            }`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Reset Button */}
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`w-full text-white font-medium text-lg rounded-2xl py-3 transition-all ${
                            isFormValid
                                ? "bg-[#2274D3] hover:bg-[#1E65BA] cursor-pointer active:scale-[0.98]"
                                : "bg-[#86B5EC99] cursor-not-allowed scale-[0.98]"
                        }`}
                    >
                        Reset Password
                    </button>
                </form>

                {/* Bottom Text */}
                <div className="flex items-center justify-center gap-3 mt-2">
                    <p className="text-lg font-light text-[#8E8E8E] whitespace-nowrap">
                        Remember your password?{" "}
                        <a href="/login" className="text-[#2274D3] text-lg font-medium hover:text-[#1E65BA]">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default ForgotPasswordPage;
