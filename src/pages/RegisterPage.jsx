import React, {useState} from 'react';
import Logo from "../assets/matchHr-logo.svg";
import GoogleLogo from "../assets/g-sign-in.svg";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6";
import {GoDotFill} from "react-icons/go";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({email: ""});
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        number: false,
        uppercase: false,
        specialChar: false,
    });

    // Email Validation Function
    const validateEmail = (value) => {
        if (!value) return "Email is required";
        const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return rx.test(value) ? "" : "Enter a valid email address";
    };
    // Email Handler
    const onEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setErrors((prev) => ({...prev, email: validateEmail(value)}));
    };

    // Password Validation Function
    const validatePassword = (value) => {
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/\d/.test(value)) return "Password must contain at least one number";
        if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
        if (!/[@$!%*?&]/.test(value)) return "Password must contain at least one special character";
        return "";
    };

    // Password Handler
    const onPasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        setPasswordValidations({
            length: value.length >= 8,
            number: /\d/.test(value),
            uppercase: /[A-Z]/.test(value),
            specialChar: /[@$!%*?&]/.test(value),
        });

        setErrors((prev) => ({...prev, password: validatePassword(value)}));
    };

    //Form Valid Check
    const isFormValid =
        email !== "" &&
        errors.email === "" &&
        password !== "" &&
        passwordValidations.length &&
        passwordValidations.number &&
        passwordValidations.uppercase &&
        passwordValidations.specialChar;


    // Form Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailError = validateEmail(email);
        const passError = validatePassword(password);
        setErrors({email: emailError, password: passError});

        if (emailError || passError) {
            // focus the first invalid field (optional UX)
            if (emailError) {
                const el = document.getElementById("email-input");
                if (el) el.focus();
            } else {
                const el = document.getElementById("password-input");
                if (el) el.focus();
            }
            return;
        }

        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            // Simulate API call (replace with real API)
            await new Promise((res) => setTimeout(res, 1400));
            // success - replace with redirect / toast as needed
            alert("Account created successfully!");

            // optionally clear form:
            setEmail("");
            setPassword("");
            setPasswordValidations({length: false, number: false, uppercase: false});
            setErrors({email: "", password: ""});
        } catch (err) {
            console.error(err); // This uses the variable so ESLint is happy
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
                    <h1 className="text-[#333333] font-medium text-2xl">Welcome to Match HR</h1>
                    <p className="text-[#8E8E8E] font-normal">Create an account to continue</p>
                </div>
            </div>

            <div className="w-2/3 mx-auto grid gap-7">
                <form onSubmit={handleSubmit} className="w-1/2 mx-auto flex flex-col gap-6">
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-[#333333] font-medium">Email</label>
                        <input
                            id="email-input"
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={onEmailChange}
                            className={`w-full px-6 py-3 border border-[#BBBBBB] rounded-2xl font-light text-[#3A3A3A] transition 
                                ${
                                errors.email === "" && email !== ""
                                    ? "border-green-500" // Green when valid and not empty
                                    : errors.email
                                        ? "border-red-500" // Red when invalid
                                        : "border-[#BBBBBB]" // Default gray when untouched/typing
                            }
                            `}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2 relative">
                        <label htmlFor="password" className="text-[#333333] font-medium">Password</label>
                        <input
                            id="password-input"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={onPasswordChange}
                            placeholder="Create your password"
                            className={`w-full px-6 py-3 border border-[#BBBBBB] rounded-2xl font-light text-[#3A3A3A] transition
                             ${
                                password &&
                                passwordValidations.length &&
                                passwordValidations.number &&
                                passwordValidations.uppercase &&
                                passwordValidations.specialChar

                                    ? "border-green-500"
                                    : password
                                        ? "border-red-500"
                                        : "border-[#BBBBBB]"
                            }   
                             `}
                        />
                        <button className="text-[#8E8E8E] font-normal absolute top-12 right-6 cursor-pointer transition"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaRegEyeSlash size={20}/> : <FaRegEye size={20}/>}
                        </button>
                    </div>

                    {/* Password Conditions */}
                    {password !== "" && (
                        <div className="flex flex-col gap-3 mb-2">
                            <div className="flex gap-2 items-center">
                                <GoDotFill
                                    className={`transition-colors duration-200
                                    ${
                                        password === ""
                                            ? "opacity-0"
                                            : passwordValidations.length
                                                ? "text-[#32E539]"
                                                : "text-[#FF3B3B]"
                                    }`}
                                    size={20}
                                />
                                <span
                                    className={`font-light text-sm transition-colors duration-200
                                    ${
                                        password === ""
                                            ? "opacity-0"
                                            : passwordValidations.length
                                                ? "text-[#32E539]"
                                                : "text-[#FF3B3B]"
                                    }`}
                                >
                                    At least eight characters
                                </span>
                            </div>

                            <div className="flex gap-2 items-center">
                                <GoDotFill
                                    className={`transition-colors duration-200
                                    ${
                                        password === ""
                                            ? "opacity-0"
                                            : passwordValidations.number
                                                ? "text-[#32E539]"
                                                : "text-[#FF3B3B]"
                                    }
                                `}
                                    size={20}
                                />
                                <span
                                    className={`font-light text-sm transition-colors duration-200
                                    ${
                                        password === ""
                                            ? "opacity-0"
                                            : passwordValidations.number
                                                ? "text-[#32E539]"
                                                : "text-[#FF3B3B]"
                                    }
                                `}
                                >
                                    At least one number
                                </span>
                            </div>

                            <div className="flex gap-2 items-center">
                                <GoDotFill
                                    className={`transition-colors duration-200
                                    ${
                                        password === ""
                                            ? "opacity-0"
                                            : passwordValidations.uppercase
                                                ? "text-[#32E539]"
                                                : "text-[#FF3B3B]"
                                    }
                                `}
                                    size={20}
                                />
                                <span
                                    className={`font-light text-sm transition-colors duration-200
                                    ${
                                        password === ""
                                            ? "opacity-0"
                                            : passwordValidations.uppercase
                                                ? "text-[#32E539]"
                                                : "text-[#FF3B3B]"
                                    }
                                `}
                                >
                                    At least one uppercase letter
                                </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <GoDotFill
                                    className={`transition-colors duration-200 ${
                                        password === ""
                                            ? "opacity-0"
                                            : passwordValidations.specialChar
                                                ? "text-[#32E539]"
                                                : "text-[#FF3B3B]"
                                    }`}
                                    size={20}
                                />
                                <span
                                    className={`font-light text-sm transition-colors duration-200 ${
                                        password === ""
                                            ? "opacity-0"
                                            : passwordValidations.specialChar
                                                ? "text-[#32E539]"
                                                : "text-[#FF3B3B]"
                                    }`}
                                >
                                    At least one special character
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`w-full mx-auto text-white font-medium text-lg rounded-2xl mt-4 py-3 transition-all
                            ${isFormValid
                            ? "bg-[#2274D3] hover:bg-[#1E65BA] cursor-pointer active:scale-[0.98]"
                            : "bg-[#86B5EC99] cursor-not-allowed scale-[0.98]"
                        }`}
                    >
                        Create account
                    </button>
                </form>

                <div className="w-1/2 mx-auto">
                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="flex-1 h-px bg-[#A4A4A4]"></span>
                        <p className="text-base text-[#8E8E8E] whitespace-nowrap">Or sign in with</p>
                        <span className="flex-1 h-px bg-[#A4A4A4]"></span>
                    </div>

                    {/* Google Button */}
                    <a
                        href="#"
                        className="group relative flex items-center justify-center gap-3 w-full py-2 border border-gray-200 rounded-2xl bg-white
                                 hover:border-gray-300 hover:shadow-md hover:-translate-y-1 active:scale-[0.97] transition-all duration-200 overflow-hidden"
                    >
                        {/* Google Logo */}
                        <img
                            src={GoogleLogo}
                            alt="Google"
                            className="transform transition-all duration-300 group-hover:-translate-y-6 group-hover:rotate-90 group-hover:opacity-0"
                        />

                        {/* Hover Text */}
                        <span className="absolute transform translate-y-6 opacity-0 transition-all duration-300
                               group-hover:translate-y-0 group-hover:opacity-100 text-lg font-medium text-[#777777]">
                            Continue with Google
                         </span>
                    </a>

                    <div className="flex items-center justify-center gap-3 mt-4">
                        <p className="text-lg font-light text-[#8E8E8E] whitespace-nowrap">Have an account? <a
                            href="/login" className="text-[#2274D3] text-lg font-medium hover:text-[#1E65BA]">
                            Sign in
                        </a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default RegisterPage