import { useEffect, useRef, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  HeaderGroup,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/ui/table";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/ui/command";
// import { Checkbox } from "../ui/ui/checkbox";
import { Button } from "../ui/ui/button";


interface Props {
  data: any[];
  columns: ColumnDef<any, any>[];
  tableRef: any;
  compact?: boolean;
}

export default function DataTable({
  data: initialData,
  columns: initialColumns,
  tableRef,
  compact,
}: Props) {
  const [data, setData] = useState(initialData);
  const [columns, setColumns] = useState(initialColumns);
  const [editingCell, setEditingCell] = useState<{ rowId: string; colId: string } | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [collapsedColumns, setCollapsedColumns] = useState<Set<string>>(new Set());
  // const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set(selectedRow.map((row) => row.id)));
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeHeaderColumn, setActiveHeaderColumn] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  // useEffect(() => {
  //   const selected = initialData
  //     .filter((row) => selectedRows.has(row.id))
  //     .map((row) => ({ id: row.id, email: row.email }));

  //   setSelectedRow(selected);
  // }, [selectedRows, initialData, setSelectedRow]);


  //   const handleSelectRow = (rowId: string, isChecked: boolean) => {
  //     setSelectedRows((prevSelected) => {
  //       const updatedSelected = new Set(prevSelected);
  //       if (isChecked) {
  //         updatedSelected.add(rowId);
  //       } else {
  //         updatedSelected.delete(rowId);
  //       }
  //       return updatedSelected;
  //     });
  //   };

  const handleSubmit = (values: any[]) => {
    const filteredRows = table.getRowModel().rows.filter((row) => {
      const value = row.getValue(activeHeaderColumn || "");
      return values.includes(value);
    });
    setFilteredData(filteredRows);
  };
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const toggleDropdown = (colId: string, headerId: string) => {
    setActiveColumn((prev) => (prev === colId ? null : colId));
    if (activeHeaderColumn === headerId) {
      setActiveHeaderColumn(null);
    } else {
      setActiveHeaderColumn(headerId);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem('tableData');
    const storedColumns = localStorage.getItem('tableColumns');
    const storedCollapsed = localStorage.getItem('collapsedColumns');

    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      setData(initialData);
    }

    if (storedColumns) {
      setColumns(JSON.parse(storedColumns));
    } else {
      setColumns(initialColumns);
    }

    if (storedCollapsed) {
      setCollapsedColumns(new Set(JSON.parse(storedCollapsed)));
    }
  }, [initialData, initialColumns]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveColumn(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // const handleSelectAll = (select: boolean) => {
  //   const allRows = table.getRowModel().rows.map((row) => row.original); // Access the original data
  //   if (select) {
  //     // Select all rows and map them to 'id' and 'email'
  //     const selected = allRows.map((row) => ({
  //       id: row.id,
  //       email: row.email,
  //     }));
  //     setSelectedRows(new Set(selected.map((row) => row.id))); // Update local selectedRows (Set of ids)
  //     setSelectedRow(selected); // Pass selected rows with 'id' and 'email' to parent
  //   } else {
  //     // Deselect all rows
  //     setSelectedRows(new Set());
  //     setSelectedRow([]); // Clear parent selectedRow state
  //   }
  // };


  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const updatedColumns = Array.from(columns);
    const [movedColumn] = updatedColumns.splice(source.index, 1);
    updatedColumns.splice(destination.index, 0, movedColumn);

    setColumns(updatedColumns);
    // localStorage.setItem("tableColumns", JSON.stringify(updatedColumns)); // Save to local storage
  };

  const sortColumn = (colId: string, order: 'asc' | 'desc') => {
    const sortedData = [...data].sort((a, b) => {
      const aValue = a[colId];
      const bValue = b[colId];

      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });

    setData(sortedData);
    // localStorage.setItem("tableData", JSON.stringify(sortedData)); // Save to local storage
  };

  const addColumn = (position: 'left' | 'right', colId: string) => {
    const newColumn: ColumnDef<any, any> = {
      id: `new_column_${Math.random().toString(36).substring(7)}`, // Use `id` instead of `accessorKey`
      header: 'New Column',
      cell: () => 'New Value', // Removed `row` since it's not being used
    };

    const colIndex = columns.findIndex((col) => col.id === colId); // Use `id` instead of `accessorKey`
    const updatedColumns = [...columns];

    if (position === 'left') {
      updatedColumns.splice(colIndex, 0, newColumn);
    } else {
      updatedColumns.splice(colIndex + 1, 0, newColumn);
    }

    setColumns(updatedColumns);
  };

  const collapseColumn = (colId: string) => {
    setCollapsedColumns(prev => {
      const updated = new Set(prev);
      updated.has(colId) ? updated.delete(colId) : updated.add(colId);
      return updated;
    });
  };

  const handleAction = (action: string, colId: string) => {
    switch (action) {
      case 'sort-asc':
        sortColumn(colId, 'asc');
        break;
      case 'sort-desc':
        sortColumn(colId, 'desc');
        break;
      case 'add-left':
        addColumn('left', colId);
        break;
      case 'add-right':
        addColumn('right', colId);
        break;
      case 'collapse':
        collapseColumn(colId);
        break;
      default:
        break;
    }
  };

  const handleDoubleClick = (rowId: string, colId: string, initialValue: string) => {
    setEditingCell({ rowId, colId });
    setEditingValue(initialValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(e.target.value);
  };

  const handleSaveEdit = (rowId: string, colId: string) => {
    const updatedData = data.map((row) => {
      if (row.id === rowId) {
        return { ...row, [colId]: editingValue };
      }
      return row;
    });

    setData(updatedData);
    // localStorage.setItem("tableData", JSON.stringify(updatedData)); // Save to local storage
    setEditingCell(null); // Exit editing mode
  };

  const handleSaveHeaderEdit = (headerId: string) => {
    const updatedColumns = columns.map((col) =>
      col.id === headerId ? { ...col, header: editingValue } : col
    );

    setColumns(updatedColumns);
    // localStorage.setItem("tableColumns", JSON.stringify(updatedColumns)); // Save to local storage
    setEditingCell(null); // Exit editing mode
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowId: string | null,
    colId: string
  ) => {
    if (e.key === 'Enter') {
      if (rowId) {
        handleSaveEdit(rowId, colId);
      } else {
        handleSaveHeaderEdit(colId);
      }
    }
  };


  return (

    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided: any) => (
          <Table
            ref={(el) => {
              tableRef.current = el; // Assign the ref to tableRef
              provided.innerRef(el); // Call the innerRef from the provided object
            }}
            className="w-full border py-4 px-6 border-gray-300"
            {...provided.droppableProps}
          >
            <TableHeader className="bg-gray-100 border-b border-gray-300">
              <TableRow>
                {/* <TableHead className="border-r border-gray-300">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === table.getRowModel().rows.length }
                    onChange={(e) => handleSelectAll(e.target.checked) }
                    className="mx-auto rounded-lg w-4 h-4"
                    style={{
                      accentColor: 'black',
                    }}
                  />
                </TableHead> */}
                {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                  headerGroup.headers.map((header, index) => (
                    <Draggable key={header.id} draggableId={header.id} index={index}>
                      {(provided: any) => (

                        <TableHead
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`text-gray-700  font-medium relative border-r border-gray-300 ${compact ? "py-4 px-6" : "py-2 px-4"}`}

                        >
                          <div className="flex justify-between">
                            {editingCell && editingCell.rowId === "header" && editingCell.colId === header.id ? (
                              <input
                                type="text"
                                value={editingValue}
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleKeyDown(e, null, header.id)}
                                onBlur={() => handleSaveHeaderEdit(header.id)}
                                className="border border-gray-300 rounded px-2"
                                autoFocus

                              />
                            ) : (
                              flexRender(header.column.columnDef.header, header.getContext())
                            )}
                            <button
                              onClick={() => {
                                toggleDropdown(header.id, headerGroup.id);
                                setActiveHeaderColumn(header.id);
                              }}
                              className="ml-2 text-gray-500 hover:text-gray-700 rounded-md"
                            >
                              ▼
                            </button>
                          </div>

                          {activeColumn === header.id && (
                            <div
                              ref={dropdownRef}
                              className="absolute top-full w-64 left-0 mt-2 bg-white shadow-lg rounded-md border border-gray-300 z-10"
                            >
                              <Command>
                                <CommandList>
                                  <CommandGroup>
                                    <CommandItem
                                      onSelect={() => handleAction("sort-asc", header.id)}
                                    >
                                      Sort Ascending (A-Z)
                                    </CommandItem>
                                    <CommandItem
                                      onSelect={() => handleAction("sort-desc", header.id)}
                                    >
                                      Sort Descending (Z-A)
                                    </CommandItem>
                                    <CommandItem
                                      onSelect={() => handleAction("add-left", header.id)}
                                    >
                                      Add Column Left
                                    </CommandItem>
                                    <CommandItem
                                      onSelect={() => handleAction("add-right", header.id)}
                                    >
                                      Add Column Right
                                    </CommandItem>
                                    <CommandItem
                                      onSelect={() => handleAction("collapse", header.id)}
                                    >
                                      {collapsedColumns.has(header.id)
                                        ? "Expand"
                                        : "Collapse"} Column
                                    </CommandItem>
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                              {/* Show only values for the active column */}
                              {activeColumn && activeHeaderColumn === header.id && (
                                <div>

                                  <Command>
                                    <CommandInput placeholder="Search..." />
                                    <CommandList>
                                      <CommandEmpty>No framework found.</CommandEmpty>
                                      <CommandGroup className="w-auto h-auto overflow-y-auto">
                                        {
                                          Array.from(new Set(table.getRowModel().rows.map((row) => row.getValue(header.id) as string))) // Cast to string
                                            .filter((value) => value)
                                            .map((uniqueValue, index) => (
                                              <CommandItem key={index} className="cursor-pointer flex gap-2 items-start">
                                                <input
                                                  type="checkbox"
                                                  checked={checkedValues.includes(uniqueValue)}
                                                  onChange={(e) => {
                                                    if (e.target.checked) {
                                                      setCheckedValues([...checkedValues, uniqueValue]);
                                                    } else {
                                                      setCheckedValues(checkedValues.filter((value) => value !== uniqueValue));
                                                    }
                                                  }}
                                                  className="w-4 h-4 text-black"
                                                  style={{
                                                    accentColor: 'black',
                                                  }}
                                                />
                                                {uniqueValue}
                                              </CommandItem>
                                            ))
                                        }
                                      </CommandGroup>

                                    </CommandList>
                                  </Command>
                                  <div className="flex justify-end mt-1 p-2">
                                    <Button onClick={() => handleSubmit(checkedValues)}>Ok</Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </TableHead>

                      )}
                    </Draggable>
                  ))
                ))}
                {provided.placeholder}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(filteredData.length > 0 ? filteredData : table.getRowModel().rows).length ? (
                (filteredData.length > 0 ? filteredData : table.getRowModel().rows).map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-b rounded-md border-gray-300"
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {/* <TableCell className="border-r rounded-md border-gray-300">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(row.id)  }
                        onChange={(e) => handleSelectRow(row.id, e.target.checked)}

                        className="mx-auto rounded-xl w-4 h-4"
                        style={{
                          accentColor: 'black',
                        }}
                      />
                    </TableCell> */}

                    {row.getVisibleCells().map((cell: any) => (

                      <TableCell
                        className={`font-semibold  border border-gray-300 ${compact ? "py-4 px-6" : "py-2 px-4"}`}
                        key={cell.id}
                        style={{
                          width: collapsedColumns.has(cell.column.id) ? "1px" : "auto",
                        }}
                        onDoubleClick={() =>
                          handleDoubleClick(
                            row.id,
                            cell.column.id,
                            cell.getValue() as string
                          )
                        }
                      >
                        {editingCell &&
                          editingCell.rowId === row.id &&
                          editingCell.colId === cell.column.id ? (
                          <input
                            type="text"
                            value={editingValue}
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleKeyDown(e, row.id, cell.column.id)}
                            onBlur={() => handleSaveEdit(row.id, cell.column.id)}
                            className="w-40 border border-gray-300 rounded px-2"
                            autoFocus
                          />
                        ) : (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                      </TableCell>

                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        )}
      </Droppable>
    </DragDropContext>
  );
}
