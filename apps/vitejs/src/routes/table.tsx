import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link, useLoaderData } from "react-router-dom";

import { type PetType } from "@acme/gen-swag";

const PetTable: React.FC = () => {
  const { pets } = useLoaderData() as { pets: PetType[] };

  const table = useReactTable({
    data: pets,
    getCoreRowModel: getCoreRowModel<PetType>(),
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
    </div>
  );
};

export default PetTable;
