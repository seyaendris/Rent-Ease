import axios from "axios";
import { useRouter } from "next/navigation";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import getCurrentUser from '@/app/actions/getCurrentUser';
import LoginModal from '../components/modals/LoginModal';
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";


interface IUseFavorite {
    listingId: string
    currentUser?: SafeUser | null
}

const useFavorite = ({
    listingId,
    currentUser
}: IUseFavorite) => {
    const router = useRouter()
    const LoginModal = useLoginModal()

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || []

        return list.includes(listingId)
    }, [currentUser, listingId])

    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation()

        if(!currentUser) {
            return LoginModal.onOpen()
        }

        try {
            let request

            if(hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`)
            }
            else {
                request = () => axios.post(`/api/favorites/${listingId}`)
            }

            await request()
            router.refresh()
            // toast.success('Success')
        } catch (error) {
            toast.error('Something went erong')
        }
}, [currentUser, hasFavorited, LoginModal, listingId, router])

return {
    hasFavorited,
    toggleFavorite
}
}

export default useFavorite