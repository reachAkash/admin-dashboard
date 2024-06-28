import React, { act, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { baseUrl, fetchData } from "../utils/helper";

const ChartOne = () => {
  const [data, setData] = useState();
  const [year, setYear] = useState([]);
  const [relevance, setRelevance] = useState([]);
  const [Intensity, setIntensity] = useState([]);
  const [activeYear, setActiveYear] = useState("start_year");

  const options = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Montserrat, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "smooth", // Changed from "straight" to "smooth"
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: "category",
      categories: year,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      max: 50,
    },
  };

  const handleGetFilteredYear = async (value) => {
    getData(`${baseUrl}api/getdata?limit=12&${value}=asc`);
  };

  const handleActiveYear = (e) => {
    setActiveYear(e.target.id);
    handleGetFilteredYear(e.target.id);
  };

  const getData = async (url) => {
    console.log(url);
    try {
      const data = await fetchData(url);
      setData(data.data);
      filterData(data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const filterData = (data) => {
    const yearFiltered = [];
    const relevanceFiltered = [];
    const intensityFiltered = [];
    data?.forEach((item) => {
      if (activeYear == "start_year") {
        yearFiltered.push(item?.start_year || 2001);
      } else {
        yearFiltered.push(item?.end_year || 2047);
      }
      relevanceFiltered.push(item?.relevance || 0);
      intensityFiltered.push(item?.intensity || 0);
    });
    setYear(yearFiltered);
    setRelevance(relevanceFiltered);
    setIntensity(intensityFiltered);
  };
  useEffect(() => {
    filterData(data);
  }, [activeYear]);

  useEffect(() => {
    getData(`${baseUrl}api/getdata?limit=12`);
  }, []);

  const series = [
    {
      name: "Relevance",
      data: relevance,
    },
    {
      name: "Intensity",
      data: Intensity,
    },
  ];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-36 md:min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Relevance</p>
            </div>
          </div>
          <div className="flex min-w-36 md:min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Intensity</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button
              onClick={handleActiveYear}
              id="start_year"
              className={`rounded ${
                activeYear == "end_year"
                  ? "bg-white hover:shadow-card cursor-pointer"
                  : "cursor-not-allowed"
              }  py-1 px-3 text-xs font-medium text-black`}
            >
              Start Year
            </button>
            <button
              onClick={handleActiveYear}
              id="end_year"
              className={`rounded ${
                activeYear == "start_year"
                  ? "bg-white hover:shadow-card cursor-pointer"
                  : "cursor-not-allowed"
              } py-1  px-3 text-xs font-medium text-black `}
            >
              End Year
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
