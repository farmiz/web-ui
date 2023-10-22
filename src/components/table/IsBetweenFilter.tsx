import { Input } from "../ui/input";

const IsBetweenFilter = () => {
  return (
    <div className="flex gap-2 items-center justify-between">
      <Input type="number" className="h-10" />
      <span>and</span>
      <Input type="number" className="h-10" />
    </div>
  );
};

export default IsBetweenFilter;
