const CityViewSkeleton = () => {
  return (
    <div className="flex flex-col flex-1">
      {/* Overview */}
      <div className="flex flex-col py-12 items-center">
        <div className="bg-gray-500 h-6 w-72 rounded mb-2 animate-pulse"></div>
        <div className="bg-gray-500 h-4 w-72 rounded mb-12 animate-pulse"></div>
        <div className="bg-gray-500 h-24 w-72 rounded mb-12 animate-pulse"></div>
        <div className="bg-gray-500 h-6 w-72 rounded mb-8 animate-pulse"></div>
        <div className="bg-gray-500 h-12 w-72 rounded animate-pulse"></div>
      </div>

      {/* Hourly */}
      <div className="flex flex-col py-12 px-8 items-center">
        <div className="bg-gray-500 h-24 w-full max-w-screen-md rounded mb-12 animate-pulse"></div>
      </div>

      {/* Weekly */}
      <div className="flex flex-col py-12 px-8 items-center">
        <div className="bg-gray-500 h-24 w-full max-w-screen-md rounded mb-12 animate-pulse"></div>
      </div>
    </div>
  );
};

export default CityViewSkeleton;
