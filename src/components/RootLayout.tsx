import { Toaster } from "sonner";
import { useTheme } from "./ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <div className="main-container">
      {children}
      <Toaster
        theme={theme}
        closeButton={true}
        expand={true}
        visibleToasts={3}
        duration={6000}
      />
    </div>
  );
}
