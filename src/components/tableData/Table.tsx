interface TableProps {
  children: React.ReactNode;
}
const Table: React.FC<TableProps> = ({ children }) => {
  return (
    <div className="table-container p-5 bg-white rounded border h-full min-h-[400px]">{children}</div>
  );
};

export default Table;
