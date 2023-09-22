import { useEffect, useState } from "react";
import { Box } from '@mantine/core';
import { ASSETS_URL } from "constants/api";
import {
    MantineReactTable,
    useMantineReactTable
  } from "mantine-react-table";
import {
  ActionIcon,
  Flex,
  Text,  
  Tooltip,
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import DropZone from "components/DropZone/DropZone";
import { useFormik } from "formik";
import { useCreateUser } from "api/hooks/user-hook";



function TableResources({
  useGetItems,
  columns,
  deleteMutate,
  dataName,
  queryParams,
  ...otherProps
}) {
  // const [globalFilter, setGlobalFilter] = useState("");

  const [sorting, setSorting] = useState([]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  

  const { data, isError, isFetching, isLoading, refetch } = useGetItems({
    paginate: 1,
    per_page: pagination.pageSize,
    page: pagination.pageIndex + 1,
    sort_by: sorting[0]?.id,
    ascending: !sorting[0]?.desc,
    ...queryParams
  });
  useEffect(() => {
    refetch();
  }, [pagination, sorting]);

  //this will depend on your API response shape
  const fetchedElements = data?.data[dataName]?.data ?? [];
  const totalRowCount = data?.data[dataName]?.total ?? 0;


  const mutation = deleteMutate();

  //DELETE action
  const openDeleteConfirmModal = (row) =>
    modals.openConfirmModal({
      title: "Are you sure you want to delete this user?",
      children: (
        <Text>
          Are you sure you want to delete {row.original.name} ? This action
          cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        notifications.show({
          title: `Deleting ${row.original.id}..`,
          message: "Hey there, your code is awesome! 🤥",
          loading: true,
          autoClose: false,
          id: `delete ${row.original.name}`,
        });
        const data = await mutation.mutateAsync(row.original.id);
        if (!data.data.success) {
          return notifications.hide("delete");
        }
        notifications.update({
          title: "Deleted Successfully",
          message: `${row.original.name} Deleted`,
          autoClose: 2000,
          color: "teal",
          id: `delete ${row.original.name}`,
          icon: <IconCheck size="1rem" />,
        });
      },
    });

  //Manage MRT state that we want to pass to our API
  const [columnFilters, setColumnFilters] = useState(
    []
  );

  const [columnFilterFns, setColumnFilterFns] = //filter modes
    useState(
      Object.fromEntries(
        columns.map(({ accessorKey }) => [accessorKey, "contains"])
      )
  ); //default to "contains" for all columns

  const formik = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      password: "",
      confirm_password: "",
      last_name: "",
      birthday: "",
      city_id: 1,
      town_id: 1,
      address: "",
      email: "",
      phone_number: "",
      active: "1",
      role_id: "2",
      image_id: null
    },
    onSubmit: async (values) => {
      const { active, role_id, confirm_password, ...others } = values;
      await createUserMutation.mutateAsync({
        active: active === "1",
        role_id: parseInt(role_id),
        ...others,
      });
    },
  });

  const onAllUploaded = (images)=>{
    const id = images[0]?.id;
    formik.values.image_id = id;
  }

  const setIsUploading = ()=>{

  }

  const isUploading = ()=>{

  }

  const createUserMutation = useCreateUser();

  const table = useMantineReactTable({

    columns,
    data: fetchedElements, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    editDisplayMode: "modal",
    enableColumnFilterModes: false,
    columnFilterModeOptions: ["contains", "startsWith", "endsWith"],
    initialState: {
      density: "xs", //set default density to compact
    },
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    enableEditing: false,
    mantineToolbarAlertBannerProps: isError
      ? {
          color: "red",
          children: "Error loading data",
        }
      : undefined,
    onColumnFilterFnsChange: setColumnFilterFns,
    onColumnFiltersChange: setColumnFilters,
    // onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    renderTopToolbarCustomActions: () => (
      <Tooltip label="Refresh Data">
        <ActionIcon onClick={() => refetch()}>
          <IconRefresh />
        </ActionIcon>
      </Tooltip>
    ),
 

    renderDetailPanel: ({row}) => {
        return (
            <DropZone 
              onAllUploaded={onAllUploaded}
              setIsUploading={setIsUploading}
              isMultiple={true}
            />
        )
    },

    renderEditRowModalContent: () => (
      <>{/* //TODO */}</>
    ),
    renderCreateRowModalContent: () => (
      <>{/* //TODO */}</>
    ),
    rowCount: totalRowCount,
    enableFullScreenToggle: false,
    state: {
      columnFilterFns,
      columnFilters,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      sorting,
    },
    positionActionsColumn: "last",
    ...otherProps,
  });

  return <MantineReactTable table={table} />;
}

export default TableResources;