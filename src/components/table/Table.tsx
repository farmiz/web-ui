import DataTable from "./DataTable";
import Container from "../Container";
import { DataTableProps } from "@/interfaces/tables";
import { memo } from "react";

interface TableProps extends DataTableProps<any, any> {
  title: string;
}

const Table = ({
  showExportButton = false,
  title,
  columns,
  actionButtons,
  filters,
  fetchQuery,
  data,
  paginator,
  allowRowSelect,
  searchSelectionOptions,
  selectedDocuments,
  showSearchSelection,
}: TableProps) => {
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
          actionButtons={actionButtons}
          filters={filters}
          fetchQuery={fetchQuery}
          data={data}
          paginator={paginator}
          allowRowSelect={allowRowSelect}
          selectedDocuments={selectedDocuments}
          searchSelectionOptions={searchSelectionOptions}
          showSearchSelection={showSearchSelection}
        />
      </Container>
    </>
  );
};

export default memo(Table);
