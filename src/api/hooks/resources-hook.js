import resourceService from "api/services/resources";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useGetResource = (params) => {
  return useQuery({
    keepPreviousData: true, //useful for paginated queries by keeping data from previous pages on screen while fetching the next page
    staleTime: 30_000, //don't refetch previously viewed pages until cache is more than 30 seconds old
    queryKey: ["resources"],
    queryFn: () => resourceService.getResources(params),
  });
};

function useDeleteResource () {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (communicationId) => resourceService.deleteResource(communicationId),
      onSuccess: (data) => {
        if (data?.data?.success) {
          queryClient.invalidateQueries(["subject"]);
        }
      },
    });
}

const useCreateResource = () => {
    const queryClient = useQueryClient();
    return useMutation(
      (user) => {
        return resourceService.createResource(user);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["subject"]);
        },
      }
    );
  };
  

export {useCreateResource, useDeleteResource, useGetResource }