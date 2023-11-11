import { Row, flexRender } from "@tanstack/react-table";
import { TableCell, TableRow } from "../ui/table";

interface TableBodyItemProps<TData> {
  row: Row<TData>;
}
function TableBodyItem<TData>({ row }: TableBodyItemProps<TData>) {
  return (
    <TableRow  data-state={row.getIsSelected() && "selected"}>
      {row && row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default TableBodyItem;
