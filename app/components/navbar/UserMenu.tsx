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
import { IoIosHome } from "react-icons/io"


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
                className="hidden md:flex md:gap-2 md:items-center text-sm font-medium py-3 px-4 rounded-full bg-cyan-50 hover:shadow-md hover:shadow-cyan-200  transition cursor-pointer"
                >
                    <p>Rent your home</p>
                    <IoIosHome size={20} className="text-cyan-600" />
                    
            </div>

            <div
                onClick={toggleOpen}
                className=" py-1   border-[1px] border-neutral-100 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md hover:shadow-cyan-200 transition"
                >
                    <div className="hidden md:hidden">
                    <AiOutlineMenu  />
                    </div>
                    
                    <div className="md:block w-full">
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
                         onClick={() => router.push('/favorites')}
                         label="My Favorite"
                         /> 
                     <MenuItem 
                         onClick={() => router.push('/reservations')}
                         label="My Reservations"
                         /> 
                     <MenuItem 
                         onClick={() => router.push('/properties')}
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