import Drawer from "@/components/Drawer";
import TransactionsMetrics from "@/components/TransactionsMetrics";
import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/table/Table";
import { Button } from "@/components/ui/button";
import { filters, transactionColumn } from "@/dataTable/transactions";
import { useAppSelector } from "@/hooks/useStoreActions";
import { fetchTransactions } from "@/store/transactionSlice/actions";
import { Download } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

const TransactionsListScreen = () => {
  const transactionStore = useAppSelector("transactions");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [{}, setSelectedDiscovery] = useState<Record<string, any>>({});
  const columnsToDisplay = useMemo(() => transactionColumn, []);
  const [loading, setLoading] = useState(false);

  const handleDrawerClose = useCallback(() => {
    setOpenDrawer(false);
  }, []);
  const handleRowClick = (data: any) => {
    setOpenDrawer(true);
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };
  return (
    <DashboardLayout pageTitle="Transactions">
      <Table
        handleRowClick={handleRowClick}
        showExportButton={true}
        title="Transactions List"
        columns={columnsToDisplay}
        fetchQuery={fetchTransactions}
        filters={filters}
        allowRowSelect={true}
        data={transactionStore.transactions}
        paginator={transactionStore.paginator}
      />
      <Drawer
        description="Details of the transaction"
        title="Transaction Details"
        open={openDrawer}
        loading={loading}
        handleDrawerClose={handleDrawerClose}
      >
        <div className="my-4">
          <TransactionsMetrics />
        </div>
        <div className="flex flex-col gap-4">
          <Button className="flex items-center gap-3">
            <Download size={18} />
            <span>Download</span>
          </Button>
          <Button className="bg-gray-50 border text-primary hover:bg-white">
            Send
          </Button>
        </div>
      </Drawer>
    </DashboardLayout>
  );
};

export default TransactionsListScreen;
