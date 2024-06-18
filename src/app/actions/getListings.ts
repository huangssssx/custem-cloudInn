import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  batchroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      batchroomCount,
      startDate,
      endDate,
      locationValue,
      category
    } = params;
    let query: any = {};

    console.log("#########getListing params:",params);

    if (userId) {
      query.userId = userId;
    }


    if(category){
        query.category = category;
    }

    if(guestCount){
        //qte:假如roomCount===3. 则其意义是 SELECT * FROM listings WHERE roomCount >= 3;
        query.guestCount = {
            gte:+guestCount
        }
    }

    if(roomCount){
        //qte:假如roomCount===3. 则其意义是 SELECT * FROM listings WHERE roomCount >= 3;
        query.roomCount = {
            gte:+roomCount
        }
    }


    if(batchroomCount){
        //qte:假如roomCount===3. 则其意义是 SELECT * FROM listings WHERE roomCount >= 3;
        query.batchroomCount = {
            gte:+batchroomCount
        }
    }

    if(locationValue){
        //qte:假如roomCount===3. 则其意义是 SELECT * FROM listings WHERE roomCount >= 3;
        query.locationValue = locationValue;
    }

    if(startDate !== endDate){
        query.NOT = {
            reservations:{
                some:{
                    OR:[
                        {
                            endDate:{gte:startDate},
                            startDate:{lte:startDate}
                        },
                        {
                            startDate:{lte:endDate},
                            endDate:{gte:endDate}
                        }
                    ]
                }
            }
        }
    }
    const listings = await prisma.listing.findMany({
        where: query,
        orderBy: {
          createdAt: "desc",
        },
      });
      
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
