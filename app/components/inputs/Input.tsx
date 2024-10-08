"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
    id: string;
    label: string;
    type: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    max?: number;  // Add max prop
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    formatPrice,
    required,
    max,
    register,
    errors,
}) => {
    return (
        <div className="w-full relative">
            {formatPrice && (
                <BiDollar size={24} className="text-neutral-700 absolute top-5 left-2" />
            )}
            <input 
                id={id}
                disabled={disabled}
                {...register(id, { 
                    required,
                    max: max ? { value: max, message: `Value cannot exceed $${max} per night` } : undefined  
                })}
                placeholder=" "
                type={type}
                className={`peer w-full pb-1 pt-6 font-semibold bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${formatPrice ? 'pl-9' : 'pl-4'} ${errors[id] ? 'border-rose-500' : 'border-neutral-300'} ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}`} 
            />
            <label className={`absolute text-md font-semibold duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${formatPrice ? 'left-9' : 'left-4'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors[id] ? 'text-rose-500' : 'text-zinc-600'}`}>
                {label}
            </label>
            {errors[id]?.message && (
                <span className="text-red-500 text-sm">
                    {typeof errors[id]?.message === 'string' ? errors[id]?.message : String(errors[id]?.message)}
                </span>
            )}
        </div>
    );
}


export default Input