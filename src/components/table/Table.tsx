import DataTable from "./DataTable";
import { columns } from "@/components/table/columns";
import data  from "@/components/table/data/tasks.json";
export default function Table() {
  return (
    <>
      <div className="md:hidden"></div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex bg-white min-h-[400px]">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Users List</h2>
            <p className="text-muted-foreground">
              Here's a list of all users in farmiz!
            </p>
          </div>
        </div>
        <DataTable columns={columns} data={data}/>
      </div>
    </>
  );
}
