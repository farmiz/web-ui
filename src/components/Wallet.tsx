import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Wallet = () => {
  return (
    <div className="p-4 min-h-[70px] border-b hover:bg-gray-50 flex justify-between" role="button">
      <div className="avatar flex gap-4">
        <Avatar className="h-10 w-10 outline-none">
          <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
          <AvatarFallback>CB</AvatarFallback>
        </Avatar>
        <div className="info">
          <h1 className="text-sm font-medium">MTN mobile money</h1>
          <p className="text-[13px]">4,500.00</p>
        </div>
      </div>
      <div className="wallet-type">
        <p className="text-sm font-medium">card</p>
      </div>
    </div>
  );
};

export default Wallet;
