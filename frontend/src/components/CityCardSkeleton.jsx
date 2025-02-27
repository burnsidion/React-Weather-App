const CityCardSkeleton = () => {
  return (
    <div className="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md animate-pulse">
      <div className="flex flex-col flex-1 gap-2">
        <div className="bg-gray-500 h-6 w-1/2 rounded"></div>
        <div className="bg-gray-500 h-4 w-2/5 rounded"></div>
      </div>
      <div className="flex flex-col items-end flex-1 gap-2">
        <div className="bg-gray-500 h-6 w-12 rounded"></div>
        <div className="bg-gray-500 h-4 w-20 rounded"></div>
      </div>
    </div>
  );
};

export default CityCardSkeleton;
