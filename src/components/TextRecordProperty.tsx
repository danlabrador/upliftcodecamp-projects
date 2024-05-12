interface TextRecordPropertyProps extends React.PropsWithChildren {
  property: string;
  value: string;
}
export const TextRecordProperty = ({ property, value }: TextRecordPropertyProps) => {
  return (
    <div className="flex flex-col gap-1 mb-6">
      <p className="text-gray-500 text-sm">{property}</p>
      <p className="text-black text-base">{value}</p>
    </div>
  );
};
