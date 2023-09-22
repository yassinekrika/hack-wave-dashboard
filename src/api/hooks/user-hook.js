import userService from "api/services/user-service";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useGetUsers = (params) => {
  return useQuery({
    keepPreviousData: true, //useful for paginated queries by keeping data from previous pages on screen while fetching the next page
    staleTime: 30_000, //don't refetch previously viewed pages until cache is more than 30 seconds old
    queryKey: ["users"],
    queryFn: () => userService.getUsers(params),
  });
};

function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId) => userService.deletStudent(userId),
    onSuccess: (data) => {
      if (data?.data?.success) {
        queryClient.invalidateQueries(["users"]);
      }
    },
  });
}

const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (user) => {
      return userService.creatUser(user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );
};

export { useCreateUser, useGetUsers, useDeleteUserMutation };