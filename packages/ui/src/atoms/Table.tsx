"use client"

import React from "react"

export interface ITableColumnDef<T> {
  header: string
  accessor: (row: T) => React.ReactNode
}

export interface ITable<T> {
  data: T[]
  columns: ITableColumnDef<T>[]
  wrapperClassName?: string
}

export function Table<T>({ data, columns, wrapperClassName = "" }: ITable<T>) {
  return (
    <div className={`overflow-x-auto overflow-y-auto ${wrapperClassName}`}>
      <table className="table table-pin-rows table-zebra w-full">
        <thead>
          <tr>
            {columns.map((column, idx) => (
              <th key={idx} className="bg-base-200 shadow-sm z-20">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col, idx) => (
                  <td key={idx}>{col.accessor(row)}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>no data...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

Table.displayName = "Table"
