import { useState } from 'react';
import { VscEyeClosed, VscEye } from 'react-icons/vsc';

interface InputProps {
    type: string;
    name?: string;
    required: boolean;
    value?: string;
    onChange?: any;
    placeholder?: string;
    register: any;
    rounded?: boolean;
    color?: string;
}

export function Input({ register, name, type, required, value, placeholder, onChange, rounded = false, color = 'bg-gray-200'}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const inputClasses = `min-w-full h-full ${color} pl-5 focus:outline-none focus:ring-0 hover:shadow-md transition duration-300 ${rounded ? 'rounded-full' : 'rounded-lg'}`;
    
    return (
        <div className="relative mb-2 h-full">
            <input
                {...register(name, { required })}
                type={showPassword ? 'text' : type}
                value={value}
                onChange={onChange}
                placeholder={placeholder} 
                className={inputClasses}
            />
            {type === 'password' && (
                <span 
                    onClick={togglePasswordVisibility} 
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                >
                    {showPassword ? <VscEyeClosed color='gray' size="20" /> : <VscEye color='gray' size="20" />}
                </span>
            )}
        </div>
    )
}