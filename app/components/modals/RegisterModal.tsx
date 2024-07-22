"use client"

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import toast from 'react-hot-toast'
import Button from '../Button'
import { signIn } from 'next-auth/react'

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, formState: { errors }} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error("Something went wrong!")
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const toggle = useCallback(() => {
        registerModal.onClose()
        loginModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
                title='Welcome to RentEase'
                subtitle='Create an account!'
                
                />

            <Input 
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                type='text'
                required
                />
             <Input 
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                type='text'
                required
                />
             <Input 
                id='password'
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors}
                type='password'
                required
                />
        </div>
    );

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button 
                outline
                label='Continue With Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
                />
             <Button 
                outline
                label='Continue With Github'
                icon={AiFillGithub}
                onClick={() => signIn('github')}
                />

                <div className='text-neutral-500 text-center mt-2 font-light'>
                    <div className='flex justify-center flex-row items-center gap-2 text-center'>
                        <div className='font-semibold'>
                            Already have an account?
                        </div>
                        <div
                            onClick={toggle} 
                            className='font-medium cursor-pointer hover:underline text-blue-500'>
                            Log In
                        </div>
                    </div>

                </div>
        </div>
    )

  return (
    <Modal 
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title='Register'
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
  )
}

export default RegisterModal