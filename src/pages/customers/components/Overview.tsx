import Container from "@/components/Container";
import OverviewCard from "@/components/OverviewCard";
import DataTable from "@/components/table/DataTable";
import { customerColumns } from "@/dataTable/customers";
import { UserProps } from "@/store/userSlice/types";
import { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
interface CustomerOverviewProps {
  overviewData: {
    totalActiveUsers: number;
    totalInactiveUsers: number;
    customers: UserProps[];
  };
}

const Overview: FC<CustomerOverviewProps> = ({ overviewData }) => {
  const columnsToDisplay = useMemo(() => customerColumns, []);

  const navigate = useNavigate();
  const customerOverviewCardData = [
    {
      title: "Total Customers",
      value: overviewData.totalActiveUsers + overviewData.totalInactiveUsers,
    },
    {
      title: "Active Customers",
      value: overviewData.totalActiveUsers,
    },
    {
      title: "Inactive Customers",
      value: overviewData.totalInactiveUsers,
    },
  ];
  const handleRowClick = (data: any) => {
    navigate(`/customers/${data._id}`);
  };

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 my-5">
        {customerOverviewCardData.map((card, index) => {
          return (
            <OverviewCard title={card.title} value={card.value} key={index} />
          );
        })}
      </div>
      <Container>
        <DataTable
          handleRowClick={handleRowClick}
          columns={columnsToDisplay}
          data={overviewData.customers}
          showSelectColumns={false}
        />
      </Container>
    </div>
  );
};

export default Overview;
