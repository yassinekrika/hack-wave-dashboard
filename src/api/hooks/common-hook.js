import commonSerive from "api/services/common-service";
import { useQuery } from "react-query";

const useGetCities = () => {
  return useQuery({
    keepPreviousData: true, //useful for paginated queries by keeping data from previous pages on screen while fetching the next page
    staleTime: 300000_000, //don't refetch previously viewed pages until cache is more than 30 seconds old
    queryKey: ["cities"],
    queryFn: () => commonSerive.getCities(),
  });
};
const useGetTowns = () => {
  return useQuery({
    keepPreviousData: true, //useful for paginated queries by keeping data from previous pages on screen while fetching the next page
    staleTime: 300000_000, //don't refetch previously viewed pages until cache is more than 30 seconds old
    queryKey: ["towns"],
    queryFn: () => commonSerive.getTowns(),
  });
};

// };

export { useGetCities, useGetTowns };