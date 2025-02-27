import { Suspense, lazy } from "react";
// import CityViewSkeleton from "../components/CityViewSkeleton";

const AsyncCityView = lazy(() => import("../components/AsyncCityView"));

const CityPage = () => {
  return (
    <div>
      {/* <Suspense fallback={<CityViewSkeleton />}> */}
        <AsyncCityView />
      {/* </Suspense> */}
    </div>
  );
};

export default CityPage;
