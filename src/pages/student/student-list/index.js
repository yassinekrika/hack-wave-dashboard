import { Badge } from "@mantine/core";
import TableCRUD from "../../../components/tables/mrt/TableCrud";
import { useMemo } from "react";
import { useDeleteStudentMutation, useGetStudents } from "api/hooks/user-hook";

function StudentList () {
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 50,
      },
      {
        accessorKey: "username",
        header: "User Name",
      },
      {
        accessorKey: "phone_number",
        header: "Phone number",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "city",
        header: "City",
        enableEditing: false,
        accessorFn: ({ city }) => (
          <>{city?.name}</>
        ),
      },
      {
        accessorKey: "active",
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
        useGetItems={useGetStudents}
        deleteMutate={useDeleteStudentMutation}
        dataName="users"
      />
    </>
  );
}

export default StudentList;