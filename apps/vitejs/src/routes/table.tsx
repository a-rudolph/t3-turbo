import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type Table,
} from "@tanstack/react-table";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

import { type PetType } from "@acme/gen-swag";

const PetTable: React.FC = () => {
  const { pets } = useLoaderData() as { pets: PetType[] };

  const table = useReactTable({
    data: pets,
    getCoreRowModel: getCoreRowModel<PetType>(),
    getPaginationRowModel: getPaginationRowModel(),
    columns: [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Category",
        accessorKey: "category.name",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Actions",
        cell: ({ row }) => <Link to={`/pets/${row.original.id}`}>View</Link>,
      },
    ],
  });

  return (
    <div id="detail">
      <BackButton />
      <h1>Pet Table</h1>
      <table>
        <thead>
          <tr>
            {table
              .getHeaderGroups()
              .map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <th {...header}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                )),
              )}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination table={table} />
    </div>
  );
};

export default PetTable;

export const Pagination = ({ table }: { table: Table<PetType> }) => {
  const pageCount = table.getPageCount();
  const currentPageIndex = table.getState().pagination.pageIndex;
  const maxButtons = 5;
  const halfMaxButtons = Math.floor(maxButtons / 2);

  let startPageIndex = Math.max(currentPageIndex - halfMaxButtons, 0);
  const endPageIndex = Math.min(startPageIndex + maxButtons - 1, pageCount - 1);
  if (endPageIndex - startPageIndex < maxButtons - 1) {
    startPageIndex = Math.max(endPageIndex - maxButtons + 1, 0);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        marginTop: "1rem",
      }}
    >
      <button
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
      >
        prev
      </button>
      {startPageIndex > 0 && (
        <button onClick={() => table.setPageIndex(0)}>1</button>
      )}
      {startPageIndex > 1 && <span>...</span>}
      {Array.from(
        { length: endPageIndex - startPageIndex + 1 },
        (_, i) => i + startPageIndex,
      ).map((pageIndex) => (
        <button
          key={pageIndex}
          disabled={currentPageIndex === pageIndex}
          onClick={() => table.setPageIndex(pageIndex)}
        >
          {pageIndex + 1}
        </button>
      ))}
      {endPageIndex < pageCount - 2 && <span>...</span>}
      {endPageIndex < pageCount - 1 && (
        <button onClick={() => table.setPageIndex(pageCount - 1)}>
          {pageCount}
        </button>
      )}
      <button
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
      >
        next
      </button>
    </div>
  );
};

const BackButton = () => {
  const navigate = useNavigate();
  return <button onClick={() => navigate(-1)}>back</button>;
};
