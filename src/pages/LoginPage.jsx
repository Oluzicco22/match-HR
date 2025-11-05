import React, {useState} from "react";
import Logo from "../assets/matchHr-logo.svg";
import GoogleLogo from "../assets/g-sign-in.svg";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({email: ""});
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    // Simple Email Validation
    const validateEmail = (value) => {
        if (!value) return "Email is required";
        const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return rx.test(value) ? "" : "Enter a valid email address";
    };

    const onEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setErrors((prev) => ({...prev, email: validateEmail(value)}));
    };

    // Simple Password Rule (Only check if at least 8 chars)
    const validatePassword = (value) => {
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        return "";
    };

    const onPasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setErrors((prev) => ({...prev, password: validatePassword(value)}));
    };

    // Enable Button only when valid
    const isFormValid =
        email !== "" &&
        errors.email === "" &&
        password !== "" &&
        password.length >= 8;

    // Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailError = validateEmail(email);
        const passError = validatePassword(password);
        setErrors({email: emailError, password: passError});

        if (emailError || passError) return;
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            await new Promise((res) => setTimeout(res, 1200));
            // after fake API success
            localStorage.setItem("isLoggedIn", "true");
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="home-bg min-h-screen px-12 py-10 gap-16">
            <img className="w-auto" src={Logo} alt="mh-Logo"/>
            <div className="flex flex-col">
                <div className="grid text-center gap-2 mb-16">
                    <h1 className="text-[#333333] font-medium text-2xl">Welcome back to Match HR</h1>
                    <p className="text-[#8E8E8E] font-normal">Enter your details to sign into your account</p>
                </div>
            </div>

            <div className="w-2/3 mx-auto grid gap-7">
                <form onSubmit={handleSubmit} className="w-1/2 mx-auto flex flex-col gap-7">
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email-input" className="text-[#333333] font-medium">Email</label>
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

                    {/* Password */}
                    <div className="flex flex-col gap-2 relative">
                        <label htmlFor="password-input"
                               className="text-[#333333] font-medium flex justify-between">Password</label>
                        <input
                            id="password-input"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={onPasswordChange}
                            placeholder="enter password"
                            className={`w-full px-6 py-3 border rounded-2xl font-light text-[#3A3A3A] transition ${
                                password.length >= 6 ? "border-green-500" : password ? "border-red-500" : "border-[#BBBBBB]"
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-12 right-6 text-[#8E8E8E]"
                        >
                            {showPassword ? <FaRegEyeSlash size={20}/> : <FaRegEye size={20}/>}
                        </button>
                    </div>

                    {/* Remember Me & Forgot Password*/}
                    <div className="flex items-center justify-between mb-6 -mt-2">
                        <label className="flex items-center gap-3 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                className="peer h-5 w-5 appearance-none border border-[#777777] transition-all duration-200 checked:bg-none checked:border-[#32E539] flex items-center justify-center"
                            />
                            {/* Check Icon */}
                            <svg
                                className="absolute w-5 h-5 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-200 stroke-[#32E539]"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M3 7L6 10L11 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="sharp"/>
                            </svg>
                            <span
                                className="text-[#8E8E8E] font-light text-sm peer-checked:text-[#3A3A3A] peer-checked:font-normal transition">Remember me</span>
                        </label>
                        <a href="/forgot-password"
                           className="text-[#2274D3] font-light text-sm hover:text-[#1E65BA] hover:font-normal">
                            Forgot password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`w-full text-white font-medium text-lg rounded-2xl py-3 transition-all ${
                            isFormValid
                                ? "bg-[#2274D3] hover:bg-[#1E65BA] cursor-pointer active:scale-[0.98]"
                                : "bg-[#86B5EC99] cursor-not-allowed scale-[0.98]"
                        }`}
                    >
                        Sign in
                    </button>
                </form>

                {/* Divider */}
                <div className="w-1/2 mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="flex-1 h-px bg-[#A4A4A4]"></span>
                        <p className="text-base text-[#8E8E8E] whitespace-nowrap">Or sign in with</p>
                        <span className="flex-1 h-px bg-[#A4A4A4]"></span>
                    </div>

                    {/* Google Button */}
                    <a
                        href="#"
                        className="group relative flex items-center justify-center gap-3 w-full py-2 border border-gray-200 rounded-2xl bg-white hover:border-gray-300 hover:shadow-md hover:-translate-y-1 active:scale-[0.97] transition-all duration-200 overflow-hidden"
                    >
                        <img
                            src={GoogleLogo}
                            alt="Google"
                            className="transform transition-all duration-300 group-hover:-translate-y-6 group-hover:rotate-90 group-hover:opacity-0"
                        />
                        <span
                            className="absolute transform translate-y-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 text-lg font-medium text-[#777777]">
                             Continue with Google
                         </span>
                    </a>
                    <div className="flex items-center justify-center gap-3 mt-4">
                        <p className="text-lg font-light text-[#8E8E8E] whitespace-nowrap">Don't have an account? <a
                            href="/register" className="text-[#2274D3] text-lg font-medium hover:text-[#1E65BA]">
                            Create account
                        </a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
