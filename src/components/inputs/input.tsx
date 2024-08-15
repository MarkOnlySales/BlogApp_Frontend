interface InputProps {
    ref?: any;
    type: string;
    name?: string;
    required: boolean;
    value?: string;
    onChange?: any;
    placeholder?: string;
}

export function Input(props: InputProps) {
    return (
        <div className="mb-2">
            <input type={props.type} name={props.name} required={props.required ?? false} value={props.value} placeholder={props.placeholder} className='relative text-base border border-gray-400 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 rounded-md w-52 min-w-full md:min-w-0 h-8 p-2 hover:shadow-md transition duration-300'></input>
        </div>
    )
}