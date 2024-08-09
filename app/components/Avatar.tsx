"use client"

import Image from "next/image"

interface AvatarProps {
  src: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({
  src
}) => {
    
  return (
    <Image 
        className={`rounded-full ${src ? 'w-12' : 'w-[75px]'} md:w-10`}
        height={30}
        width={50}
        alt="Avatar"
        src={src || "/images/user.png"}
        
        />
  )
}

export default Avatar