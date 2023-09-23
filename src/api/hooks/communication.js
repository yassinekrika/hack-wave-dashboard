import CommunicationService from "api/services/communication-service";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useGetEmails = (params) => {
  return useQuery({
    keepPreviousData: true, //useful for paginated queries by keeping data from previous pages on screen while fetching the next page
    staleTime: 30_000, //don't refetch previously viewed pages until cache is more than 30 seconds old
    queryKey: ["communication"],
    queryFn: () => CommunicationService.getEmails(params),
  });
};

function useDeleteEmailMutation() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (communicationId) => CommunicationService.deleteEmail(communicationId),
      onSuccess: (data) => {
        if (data?.data?.success) {
          queryClient.invalidateQueries(["communication"]);
        }
      },
    });
}

const useSendEmail = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (user) => {
      return CommunicationService.sendEmail(user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );
};

export {useGetEmails, useDeleteEmailMutation, useSendEmail }