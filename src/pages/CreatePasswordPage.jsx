import React, {useState} from "react";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6";
import Logo from "../assets/matchHr-logo.svg";

const CreatePasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({password: "", confirmPassword: ""});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Password Validation
    const validatePassword = (value) => {
        const rules = [
            {regex: /.{8,}/, message: "At least 8 characters"},
            {regex: /[A-Z]/, message: "At least one uppercase letter"},
            {regex: /\d/, message: "At least one number"},
            {regex: /[@$!%*?&]/, message: "At least one special character"},
        ];
        for (let rule of rules) {
            if (!rule.regex.test(value)) return rule.message;
        }
        return "";
    };

    const validateConfirmPassword = (value) => {
        if (!value) return "Confirm password is required";
        if (value !== password) return "Passwords do not match";
        return "";
    };

    const onPasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setErrors((prev) => ({
            ...prev,
            password: validatePassword(value),
            confirmPassword:
                confirmPassword && value !== confirmPassword
                    ? "Passwords do not match"
                    : "",
        }));
    };

    const onConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setErrors((prev) => ({
            ...prev,
            confirmPassword: validateConfirmPassword(value),
        }));
    };

    const isFormValid =
        password &&
        confirmPassword &&
        errors.password === "" &&
        errors.confirmPassword === "";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const passwordError = validatePassword(password);
        const confirmPasswordError = validateConfirmPassword(confirmPassword);

        setErrors({password: passwordError, confirmPassword: confirmPasswordError});

        if (passwordError || confirmPasswordError || isSubmitting) return;

        try {
            setIsSubmitting(true);
            await new Promise((res) => setTimeout(res, 1200));
            alert("Password successfully created!");
            setPassword("");
            setConfirmPassword("");
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
                    <h1 className="text-[#333333] font-medium text-2xl">Create new password</h1>
                    <p className="text-[#8E8E8E] font-normal text-center w-[25%] mx-auto leading-[30px]">
                        Set your new password below. Make sure it meets all the security requirements.
                    </p>
                </div>
            </div>

            <div className="w-2/3 mx-auto grid gap-7">
                <form onSubmit={handleSubmit} className="w-1/2 mx-auto flex flex-col gap-7">
                    {/* Password */}
                    <div className="flex flex-col gap-2 relative">
                        <label htmlFor="password-input" className="text-[#333333] font-medium">
                            New Password
                        </label>
                        <input
                            id="password-input"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={onPasswordChange}
                            placeholder="Enter new password"
                            className={`w-full px-6 py-3 border rounded-2xl font-light text-[#3A3A3A] transition ${
                                errors.password === "" && password !== ""
                                    ? "border-green-500"
                                    : errors.password
                                        ? "border-red-500"
                                        : "border-[#BBBBBB]"
                            }`}
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-5 top-[50px] text-[#8E8E8E] cursor-pointer text-lg"
                        >
              {showPassword ? <FaRegEyeSlash/> : <FaRegEye/>}
            </span>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col gap-2 relative">
                        <label htmlFor="confirm-password-input" className="text-[#333333] font-medium">
                            Confirm Password
                        </label>
                        <input
                            id="confirm-password-input"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={onConfirmPasswordChange}
                            placeholder="Re-enter password"
                            className={`w-full px-6 py-3 border rounded-2xl font-light text-[#3A3A3A] transition ${
                                errors.confirmPassword === "" && confirmPassword !== ""
                                    ? "border-green-500"
                                    : errors.confirmPassword
                                        ? "border-red-500"
                                        : "border-[#BBBBBB]"
                            }`}
                        />
                        <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-5 top-[50px] text-[#8E8E8E] cursor-pointer text-lg"
                        >
              {showConfirmPassword ? <FaRegEyeSlash/> : <FaRegEye/>}
            </span>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`w-full text-white font-medium text-lg rounded-2xl py-3 transition-all ${
                            isFormValid
                                ? "bg-[#2274D3] hover:bg-[#1E65BA] cursor-pointer active:scale-[0.98]"
                                : "bg-[#86B5EC99] cursor-not-allowed scale-[0.98]"
                        }`}
                    >
                        Create Password
                    </button>
                </form>

                {/* Back to Sign in */}
                <div className="flex items-center justify-center gap-2 mt-2">
                    <a
                        href="/login"
                        className="text-[#2274D3] text-lg font-medium hover:text-[#1E65BA] flex items-center gap-1"
                    >
                        <span className="text-xl">←</span> Back to Sign in
                    </a>
                </div>
            </div>
        </main>
    );
};

export default CreatePasswordPage;
