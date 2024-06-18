import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login"></EmptyState>
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    userId:currentUser.id
  })

  if(reservations.length === 0){
    return (
        <ClientOnly>
            <EmptyState title="No trips found" subtitle="Looks like you havent reserved any trips/"/>
        </ClientOnly>
    );
  }

  return (
  <ClientOnly>
     <TripsClient reservations={reservations} currentUser={currentUser}></TripsClient>
  </ClientOnly>
 )
};

export default TripsPage;