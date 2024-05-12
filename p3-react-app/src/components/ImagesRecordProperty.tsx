interface ImagesRecordPropertyProps extends React.PropsWithChildren {
  property: string;
  images: {
    src: string;
    alt: string;
  }[];
}
export const ImagesRecordProperty = ({ property, images }: ImagesRecordPropertyProps) => {
  return (
    <div className="flex flex-col gap-1 mb-6">
      <p className="text-gray-500 text-sm">{property}</p>
      <div className='flex flex-wrap gap-2'>
        {images.map((image, idx) => (
          <img
            key={`screenshot-${idx}`}
            src={image.src}
            alt={image.alt}
            className="w-full h-auto rounded-md border border-gray-200" />
        ))}
      </div>
    </div>
  );
};
