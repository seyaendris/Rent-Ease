"use client"

import useCountries from "@/app/hooks/useCountries"
import { SafeUser } from "@/app/types"
import { Listing, Reservation } from "@prisma/client"
import { useRouter } from "next/navigation"

interface ListingCardProps {
    data: Listing
    reservation?: Reservation
    onAction?: (id: any) => void
    disabled?: boolean
    actionLabel?: string
    actionId?: string
    currentUser?: SafeUser | null
}


const ListingCard:React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId,
    currentUser
}) => {
    const router = useRouter()
    const { getByValue } = useCountries()
  return (
    <div>
      
    </div>
  )
}

export default ListingCard
