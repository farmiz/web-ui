type IconType = React.ComponentType<{ className?: string }>;
export interface DataFilterProps {
  column: string;
  title: string;
  options: {
    label: string;
    value: string;
    icon?: IconType;
  }[];
  isNumber?: boolean;
  extra?: {
    mainIcon?: IconType;
  }
}
