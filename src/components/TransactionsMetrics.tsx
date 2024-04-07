
const TransactionsMetrics = () => {
  return (
    <div className="p-5 border-gray-800 border-2 bg-white min-h-[320px] rounded flex gap-3 flex-col">
      <div className="mb-4 border-b border-dotted pb-3 flex justify-between">
        <div>
          <p>
            <span className="text-sm">Customer: </span>
            <span className="text-[12px] ">Rexford Asamoah</span>
          </p>
          <p className="text-xs text-gray-500 font-light">
            Created: Dec 18 2023, 1:50 PM
          </p>
        </div>
        <div className="status">
          <span className="text-sm bg-green-50 text-green-600 p-2">
            Success
          </span>
        </div>
      </div>
      <div className="text-center">
        <h1 className="font-bold text-2xl my-2">GHS 200.00</h1>
        <p className="mb-2">d4b2c722-7769-4275-8909-11b114c28463</p>
        <span className="p-1 bg-gray-200 text-primary text-xs">
          Fee: 1.23
        </span>
        <p className="my-2 text-xs"><span className="font-bold">Paid via:</span> Mobile Money </p>
        <p className="text-sm">054 **** 678</p>
      </div>
      <div className="flex items-end justify-between flex-1">
        <div className="rounded-full border-primary border-2 p-[0.15rem]">
          <span className="w-2 h-2 bg-primary block rounded-full"></span>
        </div>
        <div className="rounded-full border-primary border-2 p-[0.15rem]">
          <span className="w-2 h-2 bg-primary block rounded-full"></span>
        </div>
      </div>
    </div>
  );
};

export default TransactionsMetrics;
