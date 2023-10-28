import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/table/Table";
import { columns } from "@/components/table/columns";
import { filters } from "@/components/table/data/filters";
import axios from "axios";
import { useMemo } from "react";

const { VITE_BASE_API_URL } = import.meta.env;
async function getData(query?: Record<string, any>) {
  return await axios.request({
    url: `${VITE_BASE_API_URL}/users`,
    method: "get",
    params: query,
  });
}
export default function Example() {
  const columnsToDisplay = useMemo(() => columns, []);
  return (
    <DashboardLayout
      pageTitle="Example page"
      showScrollToTopButton={true}
      pageDescription="Some cool description for the dashboard page"
      showHeader={false}
    >
      <Table
        showExportButton={true}
        title="Discoveries List"
        columns={columnsToDisplay}
        filters={filters}
        fetchQuery={getData}
      />
    </DashboardLayout>
  );
}
