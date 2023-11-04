import Container from "@/components/Container";
import DashboardLayout from "@/components/dashboard/Layout";

const CreateUserScreen = () => {
  return (
    <DashboardLayout pageTitle="Create User">
      <Container className="border">
        <h1>Users</h1>
      </Container>
    </DashboardLayout>
  );
};

export default CreateUserScreen;
