import DataTable from "./DataTable";
import Container from "../Container";
import { DataTableProps } from "@/interfaces/tables";

interface TableProps<TData, TValue> extends DataTableProps<TData, TValue> {
  title: string;
}

const Table = <TData, TValue>({
  showExportButton = false,
  title,
  columns,
  useActionButton,
  filters,
  fetchQuery
}: TableProps<TData, TValue>) => {
  return (
    <>
      <Container>
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground mt-1">
              Here's a list of all 
              <span className="font-bold mx-1">
                {title && title.split(" ")[0].toLowerCase()}
              </span>
               in farmiz!
            </p>
          </div>
        </div>
        <DataTable
          columns={columns}
          showExportButton={showExportButton}
          useActionButton={useActionButton}
          filters={filters}
          fetchQuery={fetchQuery}
        />
      </Container>
    </>
  );
};

export default Table;
