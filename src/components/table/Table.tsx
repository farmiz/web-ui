import DataTable from "./DataTable";
import { columns } from "@/components/table/columns";
import data from "@/components/table/data/tasks.json";
import Container from "../Container";

interface TableProps {
  showExportButton?: boolean;
  title?: string
}
const Table: React.FC<TableProps> = ({ showExportButton = false, title }) => {
  return (
    <>
      <Container>
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground mt-1">
              Here's a list of all <span className="font-bold">{title && title.split(" ")[0].toLowerCase()}</span> in farmiz!
            </p>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data}
          showExportButton={showExportButton}
        />
      </Container>
    </>
  );
};
export default Table;
