import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

import { type PetType } from "@acme/gen-swag";

const PetTable: React.FC = () => {
  const { pets } = useLoaderData() as { pets: PetType[] };

  const navigate = useNavigate();

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
      <button onClick={() => navigate(-1)}>{"< Back"}</button>
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
        <p>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default PetTable;
