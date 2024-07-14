"use client"


import { signIn } from 'next-auth/react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import toast from 'react-hot-toast'
import Button from '../Button'
import useLoginModal from '@/app/hooks/useLoginModal'
import { useRouter } from 'next/navigation'

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, formState: { errors }} = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

       signIn('credentials', {
        ...data,
        redirect: false,
       })
       .then((callback) => {
          setIsLoading(false);

          if(callback?.ok) {
            toast.success('Logged In Successfully');
            router.refresh();
            loginModal.onClose();
          }

          if(callback?.error) {
            toast.error(callback.error);
            console.log(callback.error)
          }
       })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
                title='Welcome Back'
                subtitle='Login to your account'
                
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
                onClick={() =>{}}
                />
             <Button 
                outline
                label='Continue With Github'
                icon={AiFillGithub}
                onClick={() =>{}}
                />

                <div className='text-neutral-500 text-center mt-2 font-light'>
                    <div className='flex justify-center flex-row items-center gap-2 text-center'>
                        <div className='font-semibold'>
                            Already have an account?
                        </div>
                        <div className='font-medium cursor-pointer hover:underline text-blue-500'>
                            Log In
                        </div>
                    </div>

                </div>
        </div>
    )

  return (
    <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title='Login'
        actionLabel='Continue'
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
  )
}

export default LoginModal