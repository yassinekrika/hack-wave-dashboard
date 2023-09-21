import userService from "api/services/user-service";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useGetStudents = (params) => {
  return useQuery({
    keepPreviousData: true, //useful for paginated queries by keeping data from previous pages on screen while fetching the next page
    staleTime: 30_000, //don't refetch previously viewed pages until cache is more than 30 seconds old
    queryKey: ["users"],
    queryFn: () => userService.getStudents(params),
  });
};

function useDeleteStudentMutation() {
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

const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (user) => {
      return userService.creatStudent(user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );
};

export { useCreateStudent, useGetStudents, useDeleteStudentMutation };