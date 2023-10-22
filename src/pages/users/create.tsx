import Container from "@/components/Container";
import DashboardLayout from "@/components/dashboard/Layout";

const CreateUser = () => {
  return (
    <DashboardLayout pageTitle="Create User">
      <Container className="border">
        <h1>Users</h1>
      </Container>
    </DashboardLayout>
  );
};

export default CreateUser;
