import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import backgroundImage from "@images/intro-bg.jpg";
import blogLogoLabel from "@images/blog-logo-label.png";
import { Input } from "@components/inputs/input";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "@/libs/api_calls";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";


type FormFields = {
    username: string;
    password: string;
};

const resolver: Resolver<FormFields> = async (values) => {
    const errors = {} as any;

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
    };
}


const Login = () => {

    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (error) {
        setShowError(true);
        const timer = setTimeout(() => {
            setShowError(false);
        }, 2000); // 2 seconds in milliseconds

        return () => clearTimeout(timer);
        }
    }, [error]);

    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
        resolver,
    });


    const { mutate: login } = useMutation({
        mutationFn: loginAPI,
      })

    const submitHandler: SubmitHandler<FormFields> = async (data) => {
        login(data, {
            onSuccess: (data) => {
                if(data.status === 'error') return setError(data.error);

                sessionStorage.setItem("accessToken", data.accessToken);
                sessionStorage.setItem("refreshToken", data.refreshToken);
                sessionStorage.setItem("user", JSON.stringify(data.user));
            },
            onError: (error) => {
                setError(error.message);
            }
        })
    }
    

    return (
        <div className="w-screen h-screen flex flex-row flex-wrap">
            <img src={backgroundImage} alt="intro-bg" className="w-1/2 h-full object-cover"></img>
            <div className="w-1/2 h-full text-center">
                <div className="w-full h-1/2 flex flex-col items-center justify-end">
                    <img src={blogLogoLabel} className="w-80 h-80 top-10 ml-auto mr-auto" alt="blog Logo"></img>
                </div>
                <div className="w-full h-1/2 px-20 flex flex-col items-center">
                    <h1 className="text-3xl text-center mb-8 font-semibold">Sign in to Blogosphere</h1>
                    <form method="POST" onSubmit={handleSubmit(submitHandler)} className="w-2/3 max-w-full">
                        <div className="w-full h-[40px] mb-8">
                            <Input 
                            register={register}
                            placeholder="Username" 
                            type="text" 
                            name="username"
                            required
                            rounded={true}
                            />
                            {<p className={errors.username ? "pl-4 text-start font-semibold text-red-500 text-sm" : "hidden"}>{errors.username?.message}</p>}
                        </div>
                        
                        <div className="w-full h-[40px] mb-8">
                            <Input 
                            register={register}
                            placeholder="Password" 
                            type="password" 
                            name="password"
                            required
                            rounded={true}
                                />
                            {errors.password && <p className="pl-4 text-start font-semibold text-red-500 text-sm">{errors.password.message}</p>}
                            {showError && error && (
                                <p className="text-center font-semibold text-red-500 text-sm animate-pulse">{error}</p>
                            )}
                        </div>
                        
                        <button type="submit" className="mx-auto rounded-full bg-blue-500 hover:bg-blue-600 w-full h-10 font-bold text-white" name="login">Log In</button>
                    </form>
                    <p className="mt-5 text-gray-500 font-medium">Don't have an account? <a onClick={() => navigate('/register')} className="text-primary font-semibold cursor-pointer">Sign Up now</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;