"use client"

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import { signOut } from "next-auth/react"
import { SafeUser } from "@/app/types"
import useRentModal from "@/app/hooks/useRentModal"
import { useRouter } from "next/navigation"


interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser

}) => {
    const router = useRouter()
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = useState(false)
    const rentModal = useRentModal()

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])

    const onRent = useCallback(() => {
        if(!currentUser) {
            return loginModal.onOpen()
        }

        // Open Rent Modal
        rentModal.onOpen()
    }, [currentUser, loginModal, rentModal])

    return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div
                onClick={onRent}
                className="hidden md:block text-sm font-medium py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                >
                    Rent your home
            </div>

            <div
                onClick={toggleOpen}
                className="md:p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <div className="hidden md:block">
                    <AiOutlineMenu  />
                    </div>
                    
                    <div className=" md:block w-full">
                        <Avatar src={currentUser?.image} />
                    </div>

            </div>
        </div>

        {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                <div className="flex flex-col cursor-pointer">
                {currentUser ? (
                     <>
                     <MenuItem 
                         onClick={() => router.push('/trips')}
                         label="My Trips"
                         />
                     <MenuItem 
                         onClick={() => {}}
                         label="My Favorite"
                         /> 
                     <MenuItem 
                         onClick={() => router.push('/reservations')}
                         label="My Reservations"
                         /> 
                     <MenuItem 
                         onClick={() => {}}
                         label="My Properties"
                         /> 
                     <MenuItem 
                         onClick={rentModal.onOpen}
                         label="Rent my home"
                         /> 
                         <hr />
                     <MenuItem 
                         onClick={() => signOut()}
                         label="Log Out"
                         /> 
                         
                 </>
                        
                    ): (
                        <>
                        <MenuItem 
                            onClick={loginModal.onOpen}
                            label="Login"
                            />
                        <MenuItem 
                            onClick={registerModal.onOpen}
                            label="Sign Up"
                            />    
                    </>

                    )
                    }
                  

                </div>

            </div>
        )}

    </div>
  )
}

export default UserMenu