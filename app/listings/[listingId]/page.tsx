import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById"
import EmptyState from "@/app/components/EmptyState"
import { Listing, Reservation } from '@prisma/client';
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface Iparams {
    listingId?: string
}

const ListingPage = async ({ params }: {params: Iparams}) => {
    const listing = await getListingById(params)
    const Reservations = await getReservations(params)
    const currentUser = await getCurrentUser()

    if(!listing) {
        return (
            <EmptyState />
        )
    }
  return (
    <ListingClient 
        listing={listing}
        reservations={Reservations}
        currentUser={currentUser}
        />
  )
}

export default ListingPage
