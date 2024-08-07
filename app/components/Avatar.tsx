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
        className="rounded-full w-12 md:w-7"
        height={30}
        width={30}
        alt="Avatar"
        src={src || "/images/user.png"}
        
        />
  )
}

export default Avatar