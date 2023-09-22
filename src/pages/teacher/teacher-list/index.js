import { Badge } from "@mantine/core";
import { useMemo } from "react";
import { useDeleteUserMutation, useGetUsers } from "api/hooks/user-hook";
import TableCRUD from "components/tables/mrt/TableCrud";

function TeacherList () {
  const columns = useMemo(
    () => [
      {
        accessorKey: "user.id",
        header: "Id",
        enableEditing: false,
        size: 50,
      },
      {
        accessorKey: "user.username",
        header: "User Name",
      },
      {
        accessorKey: "user.phone_number",
        header: "Phone number",
      },
      {
        accessorKey: "user.email",
        header: "Email",
      },
      {
        accessorKey: "user.city.name",
        header: "City",
        enableEditing: false,
      },
      {
        accessorKey: "user.active",
        header: "Active",
        size: 50,
        Cell: ({ renderedCellValue }) => {
          return (
            <>
              {renderedCellValue ? (
                <Badge
                  color="cyan"
                  size="lg"
                  variant="dot"
                  radius="md"
                  sx={{ fontSize: 12 }}
                >
                  Active
                </Badge>
              ) : (
                <Badge
                  color="red"
                  size="lg"
                  variant="dot"
                  radius="md"
                  sx={{ fontSize: 12 }}
                >
                  Not Active
                </Badge>
              )}
            </>
          );
        },
      },
    ],
    []
  );
  return (
    <>
      <TableCRUD
        columns={columns}
        useGetItems={useGetUsers}
        deleteMutate={useDeleteUserMutation}
        dataName="users"
        queryParams={{role_id: 4}}
      />
    </>
  );
}

export default TeacherList;