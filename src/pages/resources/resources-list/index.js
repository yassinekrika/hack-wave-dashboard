import { Badge } from "@mantine/core";
import { useMemo } from "react";
import TableResources from "components/tables/mrt/TableResources";
import { useDeleteResource, useGetResource } from "api/hooks/resources-hook";

function ResourceList () {
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 50,
      },
      {
        accessorKey: "subject.subject_name",
        header: "Subject Name",
      },
      {
        accessorKey: "subject.speciality.speciality_name",
        header: "Speciality",
      }
    ],
    []
  );
  return (
    <>
      <TableResources
        columns={columns}
        useGetItems={useGetResource}
        deleteMutate={useDeleteResource}
        dataName="subjects"
      />
    </>
  );
}

export default ResourceList;