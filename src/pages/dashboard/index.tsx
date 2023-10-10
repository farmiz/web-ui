import StatisticsCard from "@/components/cards/StatisticsCard";
import DashboardLayout from "@/components/dashboard/Layout";
import { LineChartIcon, PieChartIcon } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout
    pageTitle="Dashboard"
    showScrollToTopButton={true}
    pageDescription="Some cool description for the dashboard page"
    showPageExporter={true}
  >
    <div className="mt-5">
      <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-8">
        <div
          className="col-span-2"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <StatisticsCard amount={7200}  text="Total sponsorship" icon={PieChartIcon} />
            <StatisticsCard amount={7200}  text="Total sponsorship" icon={LineChartIcon} />
          </div>
        </div>
        <div className="bg-red-200">Second Col</div>
      </div>
    </div>
  </DashboardLayout>
  )
}

export default Dashboard