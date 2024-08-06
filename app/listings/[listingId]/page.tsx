import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById"
import EmptyState from "@/app/components/EmptyState"
import { Listing } from '@prisma/client';
import ListingClient from "./ListingClient";

interface Iparams {
    listingId?: string
}

const ListingPage = async ({ params }: {params: Iparams}) => {
    const listing = await getListingById(params)
    const currentUser = await getCurrentUser()

    if(!listing) {
        return (
            <EmptyState />
        )
    }
  return (
    <ListingClient 
        listing={listing}
        currentUser={currentUser}
        />
  )
}

export default ListingPage
