import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteLisings from "../actions/getFavoriteListings";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async() => {
    const listings = await getFavoriteLisings();
    const currentUser = await getCurrentUser();

    if(listings.length === 0){
        return (
            <ClientOnly>
              <EmptyState
                title="No favorites found"
                subtitle="Looks like you have no favorite listings."
              ></EmptyState>
            </ClientOnly>
          );
    }

    return (
        <ClientOnly>
            <FavoritesClient
                listings={listings}
                currentUser={currentUser}
            >
            </FavoritesClient>

        </ClientOnly>
    );

};
export default ListingPage;
