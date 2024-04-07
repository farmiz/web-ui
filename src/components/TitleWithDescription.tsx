const TitleWithDescription = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col my-4">
      <p className="font-medium text-[10px]">{title}</p>
      <p className="text-[14px]">{description}</p>
    </div>
  );
};

export default TitleWithDescription;
