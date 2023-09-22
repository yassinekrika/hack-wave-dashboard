import { Badge } from "@mantine/core";
import AdvancedTableCrud from "../../../components/tables/mrt/AdvancedTableCrud";
import { useMemo } from "react";
import { useDeleteStudentMutation, useGetStudents } from "api/hooks/user-hook";

function StudentList () {
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
      <AdvancedTableCrud
        columns={columns}
        useGetItems={useGetStudents}
        deleteMutate={useDeleteStudentMutation}
        dataName="students"
      />
    </>
  );
}

export default StudentList;