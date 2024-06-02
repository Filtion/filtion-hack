"use client";

import React from "react";
import { Comic_Neue } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
// import animations from "../../WXM/assets/animations/index";
//import getDeviceHistory from "../../WXM/wxmApi";
import homepageImage from "../components/assets/homepageImage.png";
import placeholder from "../components/assets/placeholder.jpg";
// import { Player } from "@lottiefiles/react-lottie-player";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import LoginPage from "~~/components/LoginPage";

const weatherTestData = [
  {
    date: "2021-12-21",
    tz: "Europe/Athens",
    hourly: [
      {
        timestamp: "2022-03-04T00:00:00+02:00",
        temperature: 12.10000038,
        humidity: 34,
        precipitation: 0,
        wind_speed: 2.962400198,
        wind_gust: 3.569999933,
        wind_direction: 192,
        pressure: 1025.47937,
        uv_index: 0,
        feels_like: 12.10000038,
        icon: "partly_cloudy_day",
        precipitation_accumulated: 14.10000022,
        dew_point: 8.23010032,
        solar_irradiance: 30.10655737704918,
      },
    ],
  },
];

const comicBold = Comic_Neue({ subsets: ["latin"], weight: "700" });
const comic = Comic_Neue({ subsets: ["latin"], weight: "400" });

const testData = [
  {
    id: 1,
    title: "Get your dream destination with our travel guide",
    category: "Travel",
    tags: ["travel"],
    image: placeholder,
    date: new Date(),
  },
] as const;

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  // change weatherTestData for getDeviceHistory()
  const weatherData = weatherTestData[0].hourly[0];
  const date = new Date(weatherData.timestamp);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = days[date.getDay()];
  // const icon = weatherData.icon;
  // const weatherIcon = animations[icon];

  if (!connectedAddress) {
    return <LoginPage />;
  }

  return (
    <div className="flex flex-grow w-full bg-zinc-900">
      <div className="flex flex-col px-10 gap-6 flex-grow max-w-[1200px] mx-auto my-4">
        <div className="flex items-center gap-6 w-2/3 -mb-14 mt-8 max-w-[900px]">
          <h1 className="capitalize text-white font-bold text-4xl">My posts</h1>
          <Link href="/search" className="btn btn-sm bg-[#0390FD] text-white border border-[#0390FD] text-xs">
            Create a new post
          </Link>
        </div>
        <div className="flex gap-10">
          {testData.map(blog => {
            return (
              <div
                key={blog.id}
                className="mt-14 mb-10 relative w-2/3 max-w-[900px] h-[400px] bg-[url('../components/assets/placeholder.jpg')] bg-cover bg-no-repeat bg-center rounded-lg"
              >
                <div className="inline-block absolute top-5 right-5 max-w-[40%]">
                  <p className={`${comic.className} bg-white rounded-md m-0 py-1 px-2`}>{blog.category}</p>
                  <p
                    className={`bg-white rounded-md m-0 py-1 px-2 text-xl flex flex-wrap font-bold ${comicBold.className}`}
                  >
                    {blog.title}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="w-1/4 max-w-[400px] flex flex-col gap-10">
            <div className="w-full bg-[#96b9bf] rounded-lg">
              <div>
                <div className="flex gap-8 bg-[#84a5aa] p-4 rounded-t-lg font-bold">
                  <div>{dayOfWeek}</div>
                  <span>
                    {date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="py-4 px-5">
                  <p className="font-bold text-3xl my-3">{Math.round(weatherData.temperature)} °C</p>
                  <div className="flex justify-between">
                    <div>
                      <div>Humidity: {weatherData.humidity}%</div>
                      <div>Wind: {Math.round(weatherData.wind_speed)} mph</div>
                      <div>Precipitation: {weatherData.precipitation}%</div>
                    </div>
                    {/* <Player src={weatherIcon} autoplay loop style={{ height: "80px", width: "80px" }}></Player> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-white w-full h-full rounded-lg">
              <Image
                src={homepageImage}
                width={400}
                height={400}
                alt="decorative image of face"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
