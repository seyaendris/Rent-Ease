"use client"

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import { useCallback, useState, useEffect, useRef } from "react"
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
    const menuRef = useRef<HTMLDivElement>(null); // Ref for dropdown container

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen()
        }
        // Open Rent Modal
        rentModal.onOpen()
    }, [currentUser, loginModal, rentModal])

    // Close dropdown when clicking outside or selecting an item
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="relative" ref={menuRef}>
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="hidden md:flex md:gap-2 md:items-center text-sm font-medium py-3 px-4 rounded-full bg-cyan-50 hover:shadow-md hover:shadow-cyan-200 transition cursor-pointer"
                >
                    <p>Rent your home</p>
                    <IoIosHome size={20} className="text-cyan-600" />
                </div>

                <div
                    onClick={toggleOpen}
                    className="py-1 border-[1px] border-neutral-100 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md hover:shadow-cyan-200 transition"
                >
                    <div className="hidden md:hidden">
                        <AiOutlineMenu />
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
                                    onClick={() => {
                                        router.push('/trips')
                                        setIsOpen(false);
                                    }}
                                    label="My Trips"
                                />
                                <MenuItem
                                    onClick={() => {
                                        router.push('/favorites')
                                        setIsOpen(false);
                                    }}
                                    label="My Favorite"
                                />
                                <MenuItem
                                    onClick={() => {
                                        router.push('/reservations')
                                        setIsOpen(false);
                                    }}
                                    label="My Reservations"
                                />
                                <MenuItem
                                    onClick={() => {
                                        router.push('/properties')
                                        setIsOpen(false);
                                    }}
                                    label="My Properties"
                                />
                                <MenuItem
                                    onClick={() => {
                                        rentModal.onOpen()
                                        setIsOpen(false);
                                    }}
                                    label="Rent my home"
                                />
                                <hr />
                                <MenuItem
                                    onClick={() => {
                                        signOut()
                                        setIsOpen(false);
                                    }}
                                    label="Log Out"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={() => {
                                        loginModal.onOpen()
                                        setIsOpen(false);
                                    }}
                                    label="Login"
                                />
                                <MenuItem
                                    onClick={() => {
                                        registerModal.onOpen()
                                        setIsOpen(false);
                                    }}
                                    label="Sign Up"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu
