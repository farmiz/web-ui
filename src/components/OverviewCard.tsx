import { MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FC } from "react";

interface OverviewCardProps {
  title: string;
  value: number;
  icon?: any;
  showEllipsis?: boolean;
  className?: string;
}
const OverviewCard: FC<OverviewCardProps> = ({
  title,
  value,
  className,
  showEllipsis = true,
}) => {
  return (
    <Card className={`bg-transparent shadow-none bg-white ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {showEllipsis && <MoreVertical size={18} />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-light">{value}</div>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
