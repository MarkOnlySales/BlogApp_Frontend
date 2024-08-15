interface InputProps {
    type: string;
    name?: string;
    required: boolean;
    value?: string;
    onChange?: any;
    placeholder?: string;
    register: any;
}

export function Input({ register, name, type, required, value, placeholder, onChange }: InputProps) {
    return (
        <div className="mb-2 h-full">
            <input
                {...register(name, { required })}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder} 
                className='min-w-full h-full bg-gray-100 rounded-full pl-5 focus:outline-none focus:ring-0 hover:shadow-md transition duration-300'
            />
        </div>
    )
}