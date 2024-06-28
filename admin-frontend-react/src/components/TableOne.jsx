import { useEffect, useState } from "react";
import Filter from "./Filter";
import { baseUrl, fetchData } from "../utils/helper";
import { toast } from "react-toastify";

const TableOne = () => {
  const [currentData, setCurrentData] = useState(5);
  const [currentFilter, setCurrentFilter] = useState({
    region: {
      value: "",
      type: "asc",
    },
    topic: {
      value: "",
      type: "asc",
    },
    intensity: {
      value: "",
      type: "asc",
    },
    relevance: {
      value: "",
      type: "asc",
    },
    likelihood: {
      value: "",
      type: "asc",
    },
  });

  const [currentApi, setCurrentApi] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      setLoading(true);
      const data = await fetchData(
        `${baseUrl}api/getdata?limit=${currentData}`
      );
      setData(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGetData = () => {
    setCurrentData((prev) => prev + 5);
  };

  const getFilteredData = async () => {
    try {
      const data = await fetchData(
        `${baseUrl}api/getdata?skip=0&limit=${currentData}&${currentApi}=${currentFilter[currentApi]?.type}`
      );
      console.log(data);
      setData(data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleFilter = (e) => {
    setCurrentApi(e.target.innerText.toLowerCase());
    setCurrentFilter((prev) => ({
      ...prev,
      [e.target.innerText.toLowerCase()]: {
        value: e.target.innerText?.toLowerCase(),
        type:
          prev[e.target.innerText.toLowerCase()].type === "asc" ? "dsc" : "asc",
      },
    }));
    getFilteredData();
  };

  useEffect(() => {
    getData();
  }, [currentData]);

  useEffect(() => {
    getFilteredData();
  }, [currentFilter]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Channels
      </h4>

      <div className="flex flex-col py-2">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm flex items-center gap-1 font-medium uppercase xsm:text-base">
              <div onClick={handleFilter} className="cursor-pointer">
                Region
              </div>
              <div>{currentFilter.region.type == "asc" ? "⬆️" : "⬇️"}</div>
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm flex items-center gap-1 font-medium uppercase xsm:text-base">
              <div onClick={handleFilter} className="cursor-pointer">
                Topic
              </div>
              <div>{currentFilter.topic.type == "asc" ? "⬆️" : "⬇️"}</div>
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm flex items-center gap-1 font-medium uppercase xsm:text-base">
              <div onClick={handleFilter} className="cursor-pointer">
                Intensity
              </div>
              <div>{currentFilter.intensity.type == "asc" ? "⬆️" : "⬇️"}</div>
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm flex items-center gap-1 font-medium uppercase xsm:text-base">
              <div onClick={handleFilter} className="cursor-pointer">
                Relevance
              </div>
              <div>{currentFilter.relevance.type == "asc" ? "⬆️" : "⬇️"}</div>
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm flex items-center gap-1 font-medium uppercase xsm:text-base">
              <div onClick={handleFilter} className="cursor-pointer">
                Likelihood
              </div>
              <div>{currentFilter.likelihood.type == "asc" ? "⬆️" : "⬇️"}</div>
            </h5>
          </div>
        </div>

        {data.length > 0 &&
          data.map((item, index) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 ${
                index === data.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={item.id}
            >
              <div className="flex items-center justify-start gap-3 p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {item?.region || "Not Found!"}
                </p>
              </div>

              <div className="flex items-center justify-start p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {item?.topic || (
                    <span className="text-red-400">Not Found!</span>
                  )}
                </p>
              </div>

              <div className="flex items-center justify-start p-2.5 xl:p-5">
                <p className="text-meta-3">
                  {item?.intensity || (
                    <span className="text-red-400">Not Found!</span>
                  )}
                </p>
              </div>

              <div className="hidden items-center justify-start p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">
                  {item?.relevance || (
                    <span className="text-red-400">Not Found!</span>
                  )}
                </p>
              </div>

              <div className="hidden items-center justify-evenly p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">
                  {item?.likelihood || (
                    <span className="text-red-400">Not Found!</span>
                  )}{" "}
                </p>
              </div>
            </div>
          ))}
        <button
          onClick={handleGetData}
          className="bg-primary px-4 py-2 rounded-md w-fit text-white mx-auto"
        >
          {!loading ? (
            <span>See More</span>
          ) : (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-white border-t-transparent"></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default TableOne;
