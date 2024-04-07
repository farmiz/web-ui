import { FC, ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { FetchLoader } from "./FetchLoader";

interface DrawerProps {
  loading?: boolean;
  title: string;
  description: string;
  open?: boolean;
  children?: ReactNode;
  handleDrawerClose: () => void;
}
const Drawer: FC<DrawerProps> = ({
  open,
  loading,
  description,
  title,
  children,
  handleDrawerClose,
}) => {
  return (
    <Sheet
      open={open}
      defaultOpen={open}
      onOpenChange={() => {
        if (loading) return;
        handleDrawerClose();
      }}
    >
      <SheetContent className="sm:max-w-[450px] w-full overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <FetchLoader />
          </div>
        ) : (
          <div>
            <SheetHeader className="mt-10">
              <SheetTitle className="text-center text-xl">{title}</SheetTitle>
              <SheetDescription>{description}</SheetDescription>
            </SheetHeader>
            {children}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
