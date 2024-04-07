import React from "react";
import { DatePicker } from "../DatePicker";
import ButtonWithIcon from "../ButtonWithIcon";
import { ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import { ActionButtonProps } from "@/interfaces";

interface HeaderTitleProps {
  pageTitle: string;
  pageDescription?: string;
  showPageExporter?: boolean;
  actionButtons?: ActionButtonProps;
}
const HeaderTitle: React.FC<HeaderTitleProps> = ({
  pageTitle,
  pageDescription,
  showPageExporter,
  actionButtons,
}) => {
  return (
    <div className="mb-3 lg:flex items-center justify-between sm:block">
      <div className="title sm:mb-3">
        <h6 className="font-semibold text-2xl">{pageTitle}</h6>
        <p className="text-sm">{pageDescription || ""}</p>
      </div>
      {showPageExporter && (
        <div className="exporter flex items-center justify-between gap-3 sm:justify-normal">
          <DatePicker />
          <ButtonWithIcon text="Export">
            <ArrowDown size={18} />
          </ButtonWithIcon>
        </div>
      )}
      {actionButtons && (
        <Button
          className="px-8 py-3 uppercase min-w-[200px] rounded-sm"
          onClick={actionButtons.createButton?.onClick }
        >
          {actionButtons.createButton?.name}
        </Button>
      )}
    </div>
  );
};

export default HeaderTitle;
