import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import backgroundImage from "@images/intro-bg.jpg";
import blogLogo from "@images/blog-logo.png";
import { Input } from "@components/inputs/input";
import { useState } from "react";


type FormFields = {
    email: string;
    password: string;
};

const resolver: Resolver<FormFields> = async (values) => {
    return {
        values: values.email !== "" && values.password !== "",
        errors: {
            email: {
                type: "required",
            },
            password: {
                type: "required",
            },
        },
    }
}


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
        resolver,
    });

    const login: SubmitHandler<FormFields> = (data) => {
        console.log(data);
    }
    

    return (
        <div className="w-screen h-screen flex flex-row flex-wrap">
            <img src={backgroundImage} alt="intro-bg" className="w-1/2 h-full object-cover"></img>
            <div className="w-1/2 h-full text-center">
                <img src={blogLogo} className="w-80 h-80 top-10 ml-auto mr-auto" alt="blog Logo"></img>
                <div className="max-w-sm h-2/5 bg-blue-200 border-2 rounded-lg mt-20 ml-auto mr-auto shadow-md hover:shadow-2xl transition duration-300 p-10">
                    <h2 className="text-lg font-bold">Login Account</h2>
                        <span className={`relative top-2 text-red-500 text-base mb-1 mt-4 border border-red-500 py-px px-6 ${errors.email || errors.password ? "visible" : "invisible"}`}>
                            {errors.email?.message || errors.password?.message}
                        </span>
                    <div className="m-5">
                        <form method="POST" onSubmit={handleSubmit(login)}>
                            <div className="relative placeholder:flex flex-col justify-start text-start">
                                <h3 className="text-base font-medium">Email</h3>
                                <Input 
                                {...register("email", {
                                    required: "Email is required.",
                                    pattern: {
                                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                        message: "Invalid email address."
                                    }
                                })}
                                placeholder="Enter your email here" 
                                type="text" 
                                name="email"
                                required
                                />
                            </div>
                            <div className="flex flex-col justify-start text-start">
                                <h3 className="text-base font-medium">Password</h3>
                                <Input 
                                {...register("password")}
                                placeholder="Enter your password here" 
                                type="password" 
                                name="password"
                                required
                                 />
                            </div>

                            <div className="flex flex-col justify-center content-center text-center gap-6">
                                <button type="submit" className=" mx-auto bg-blue-500 hover:bg-blue-600 w-2/3 h-10 rounded-lg font-bold text-white" name="login" >Login</button>
                                <a href="" className="text-base font-semibold">Sign Up</a>
                            </div> 
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;