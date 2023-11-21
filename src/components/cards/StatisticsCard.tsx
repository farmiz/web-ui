import React, { FunctionComponent } from "react";
// import { PieChartIcon, LineChartIcon } from "lucide-react";
import { formatCurrency } from "@/utils";
interface StatisticsCardProps {
  text: string;
  amount: number;
  icon: FunctionComponent
}
const StatisticsCard: React.FC<StatisticsCardProps> = ({ amount, text, icon }) => {
  return (
    <div
      className="p-6 flex items-center justify-between gap-x-4 bg-white rounded-lg hover:bg-primary transition-all group"
      style={{ boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px" }}
    >
      <div className="card-icon p-4 rounded bg-slate-100">
        {React.createElement(icon, {size: 18} as any)}
        {/* <PieChartIcon size={18} className="text-primary" /> */}
      </div>
      <div className="p-6 flex-grow pt-0 pl-0 group-hover:text-white">
        <div className="text-lg font-medium">{formatCurrency(amount)}</div>
        <h1 className="text-sm">{text}</h1>
      </div>
    </div>
  );
};

export default StatisticsCard;
