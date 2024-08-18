import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/inputs/input";
import { useState } from "react";
import { registerAPI } from "@/libs/api_calls";

type FormFields = {
    firstName: string;
    lastName: string;
    username: string;
    password: string
}

const resolver: Resolver<FormFields> = async (values) => {
    const errors = {} as any;

    if (!values.firstName) {
        errors.firstName = {
            type: "required",
            message: "First name is required.",
        };
    }

    if (!values.lastName) {
        errors.lastName = {
            type: "required",
            message: "Last name is required.",
        };
    }

    if (!values.username) {
        errors.username = {
            type: "required",
            message: "Username is required.",
        };
    }

    if (!values.password) {
        errors.password = {
            type: "required",
            message: "Password is required.",
        };
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
    }
}


const Register = () => {

    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [showError, setShowError] = useState(false);

    const { register, handleSubmit, formState: { errors} } = useForm<FormFields>({
        resolver,
    });

    const registerUser: SubmitHandler<FormFields> = async (data) => {
        const response = await registerAPI(data);

        if (response.status === 'success') {
            navigate('/');
        } else {
            setError(response.message);
            setShowError(true);
        }
    }

    return (
        <>
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <div className="border rounded-lg w-2/3 h-4/6 flex flex-col bg-gray-600 bg-opacity-15 py-14 px-10 justify-center">
                <h1 className="text-2xl mb-3 font-bold">Sign UP</h1>
                <p className="font-semibold text-gray-700 text-opacity-85">Log in with your data that you entered during your registration</p>
            
                <form method="POST" className="w-full" onSubmit={handleSubmit(registerUser)}>
                    <div className="flex gap-4">
                        <div className="w-full h-[40px] my-8">
                            <h2 className="font-semibold">Username</h2>
                            <Input 
                                register={register}
                                placeholder="Username" 
                                type="text" 
                                name="username"
                                required
                                color="bg-gray-100"
                            />
                            {<p className={errors.username ? "pl-4 text-start font-semibold text-red-500 text-sm" : "hidden"}>{errors.username?.message}</p>}
                        </div>

                        <div className="w-full h-[40px] my-8">
                            <h2 className="font-semibold">Password</h2>
                            <Input 
                                register={register}
                                placeholder="Password" 
                                type="password" 
                                name="password"
                                required
                                color="bg-gray-100"
                            />
                            {<p className={errors.password ? "pl-4 text-start font-semibold text-red-500 text-sm" : "hidden"}>{errors.password?.message}</p>}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-full h-[40px] my-8">
                            <h2 className="font-semibold">First Name</h2>
                            <Input
                                register={register}
                                placeholder="First Name"
                                type="text"
                                name="firstName"
                                required
                                color="bg-gray-100"
                            />
                            {<p className={errors.firstName ? "pl-4 text-start font-semibold text-red-500 text-sm" : "hidden"}>{errors.firstName?.message}</p>}
                        </div>
                        <div className="w-full h-[40px] my-8">
                            <h2 className="font-semibold">Last Name</h2>
                            <Input
                                register={register}
                                placeholder="Last Name"
                                type="text"
                                name="lastName"
                                required
                                color="bg-gray-100"
                            />
                            {<p className={errors.lastName ? "pl-4 text-start font-semibold text-red-500 text-sm" : "hidden"}>{errors.lastName?.message}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-8 mb-4">
                        <button type="submit" className="w-full h-10 bg-blue-500 hover:bg-blue-600 font-medium text-white transition duration-500 rounded-md">Sign Up</button>
                        <button type="button" className="w-full h-10 border-blue-500 border-[2px] hover:bg-blue-200 font-medium text-blue-500 transition duration-500 rounded-md" onClick={() => navigate('/')}>Log In</button>
                    </div>
                </form>
                <div className="h-4">
                    {showError && error && (
                        <p className="relative text-center font-semibold text-red-500 text-sm animate-pulse">{error}</p>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default Register 