import { useEffect, useMemo, useState } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Flex,
  Menu,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconUserCircle,
  IconSend,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react"; 
import { IconRefresh } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import dayjs from "dayjs";

function TableInlineCRUD({
  useGetItems,
  columns,
  deleteMutate,
  dataName,
  name,
  setSelectdRow,
  ...otherProps
}) {
  // const [globalFilter, setGlobalFilter] = useState("");

  const [rowSelection, setRowSelection] = useState({});

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
  });
  useEffect(() => {
    refetch();
  }, [pagination, sorting]);

  //this will depend on your API response shape
  const fetchedElements =  data?.data[dataName]?.data ?? [];
  const totalRowCount = data?.data[dataName]?.total ?? 0;


  useEffect(()=>{
    if(!setSelectdRow) return;
    const keys = Object.keys(rowSelection);
    if(keys.length) {
      setSelectdRow(fetchedElements[keys[0]-1]);
    }
  }, [rowSelection]);

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

  const table = useMantineReactTable({
    columns,
    data: fetchedElements, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    columnFilterModeOptions: ["contains", "startsWith", "endsWith"],
    initialState: {
      density: "xs", //set default density to compact
    },
    createDisplayMode: "row", // ('modal', and 'custom' are also available)
    editDisplayMode: "row", // ('modal', 'cell', 'table', and 'custom' are also available)
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    enableEditing: true,
    /*mantineToolbarAlertBannerProps: isError
      ? {
          color: "red",
          children: "Error loading data",
        }
      : undefined,*/
    onColumnFilterFnsChange: setColumnFilterFns,
    onColumnFiltersChange: setColumnFilters,
    // onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,

    /*renderRowActions: ({ row, table }) => (
      <Flex gap="md" sx={{ width: "50px" }}>
        <Tooltip label="Edit">
          <ActionIcon onClick={() => table.setEditingRow(row)}>
            <EditFilled style={{ fontSize: 18 }} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete">
          <ActionIcon
            color="red"
            onClick={() => {
              openDeleteConfirmModal(row);
            }}
          >
            <DeleteFilled style={{ fontSize: 18 }} />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),*/

    renderEditRowModalContent: ({ row, table, internalEditComponents }) => (
      <>{/* //TODO */}</>
    ),
    renderCreateRowModalContent: ({ row, table, internalEditComponents }) => (
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

      // isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
    },

    enableRowActions: true,
    positionActionsColumn: "last",
    onRowSelectionChange: {setRowSelection},//connect internal row selection state to your own
    state:{rowSelection},
    getRowId: (row) => row.id,
    mantineToolbarAlertBannerProps: isError
      ? {
          color: "red",
          children: "Error loading data",
        }
      : undefined,
    // mantineTableProps: { sx: { background: "red" } },
    // onCreatingRowCancel: () => setValidationErrors({}),
    // onCreatingRowSave: handleCreateUser,
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="Edit">
          <ActionIcon onClick={() => table.setEditingRow(row)}>
            <IconEdit />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete">
          <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <>
        <Button
          onClick={() => {
            table.setCreatingRow(true); //simplest way to open the create row modal with no default values
            //or you can pass in a row object to set default values with the `createRow` helper function
            // table.setCreatingRow(
            //   createRow(table, {
            //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
            //   }),
            // );
          }}
        >
          Create New {name}
        </Button>
        <Tooltip label="Refresh Data">
          <ActionIcon onClick={() => refetch()}>
            <IconRefresh />
          </ActionIcon>
        </Tooltip>
      </>
    ),
    enableColumnOrdering: true,
    enablePinning: true,
    enableGrouping: true,
    enableMultiRowSelection: false, //use radio buttons instead of checkboxes
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    mantineTableBodyRowProps: ({ row }) => {
    return ({
      onClick: row.getToggleSelectedHandler(),
      sx: { cursor: 'pointer' },
    })},

    ...otherProps,
  });

  return <MantineReactTable table={table} />;
}

export default TableInlineCRUD;