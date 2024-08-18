import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerAPI } from "@/libs/api_calls";
import TextField from '@mui/material/TextField';
import { useMutation } from "@tanstack/react-query";


type FormFields = {
    firstName: string;
    lastName: string;
    username: string;
    password: string
}


const Register = () => {

    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [showError, setShowError] = useState(false);

    const { mutate: registerUser } = useMutation({
        mutationFn: registerAPI,
    })

    const { register, handleSubmit, formState: { errors} } = useForm<FormFields>();

    useEffect(() => {
        if (error) {
        setShowError(true);
        const timer = setTimeout(() => {
            setShowError(false);
            setError(null)
        }, 2000); // 2 seconds in milliseconds

        return () => clearTimeout(timer);
        }
    }, [error]);

    const submitHandler: SubmitHandler<FormFields> = async (data) => {
        registerUser(data, {
            onError: (error: any) => {
                setError(error.message)
            },
            onSuccess: (data) => {
                if (data.status === 'error') return setError(data.message)
                navigate('/')
            }})
    }

    return (
        <>
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-bg-overall">
            <div className="border rounded-lg w-2/3 h-4/6 flex flex-col bg-gray-300 bg-opacity-50 border-none py-14 px-10 justify-center">
                <h1 className="text-2xl mb-3 font-bold">Sign UP</h1>
                <p className="font-semibold text-gray-700 text-opacity-85">Log in with your data that you entered during your registration</p>
            
                <form method="POST" className="w-full" onSubmit={handleSubmit(submitHandler)}>
                    <div className="flex gap-4">
                        <div className="w-full h-[40px] my-8">
                            <TextField
                                {...register("username", {
                                    required: "Username is required",
                                    minLength: {
                                        value: 6,
                                        message: "Username must be at least 6 characters long"
                                    }
                                })}
                                fullWidth
                                id="outlined-helper-text"
                                label="Username"
                                InputLabelProps={{
                                    sx: {
                                      fontSize: "14px",
                                      fontWeight: "bold"
                                    },
                                  }}
                                error={!!errors.username}
                                helperText={errors.username ? errors.username.message : ""}
                            />
                        </div>

                        <div className="w-full h-[40px] my-8">
                            <TextField
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters long"
                                    }
                                })}
                                fullWidth
                                id="outlined-error-helper-text"
                                label="Password"
                                InputLabelProps={{
                                    sx: {
                                      fontSize: "14px",
                                      fontWeight: "bold"
                                    },
                                  }}
                                error={!!errors.password}
                                helperText={errors.password ? errors.password.message : ""}
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-full h-[40px] my-8">
                            <TextField
                                {...register("firstName", {
                                    required: "First Name is required",
                                })}
                                fullWidth
                                id="outlined-helper-text"
                                label="First Name"
                                InputLabelProps={{
                                    sx: {
                                      fontSize: "14px",
                                      fontWeight: "bold"
                                    },
                                  }}
                                error={!!errors.firstName}
                                helperText={errors.firstName ? errors.firstName.message : ""}
                            />
                        </div>
                        <div className="w-full h-[40px] my-8">
                            <TextField
                                {...register("lastName", {
                                    required: "Last Name is required",
                                })}
                                fullWidth
                                id="outlined-helper-text"
                                label="Last Name"
                                InputLabelProps={{
                                    sx: {
                                      fontSize: "14px",
                                      fontWeight: "bold"
                                    },
                                  }}
                                error={!!errors.lastName}
                                helperText={errors.lastName ? errors.lastName.message : ""}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-8 mb-4">
                        <button type="submit" className="w-full h-10 bg-blue-600 hover:bg-blue-700 font-medium text-white transition duration-500 rounded-md">Sign Up</button>
                        <button type="button" className="w-full h-10 border-blue-600 border-[2px] hover:bg-blue-200 font-medium text-blue-600 transition duration-500 rounded-md" onClick={() => navigate('/')}>Log In</button>
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