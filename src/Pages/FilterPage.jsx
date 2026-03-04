import React, { use, useState } from "react";
import { CiMap } from "react-icons/ci";
import { FaGlobeAsia } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdLocationCity, MdOutlineFilterAltOff } from "react-icons/md";
import { useLoaderData, useSearchParams } from "react-router-dom";

export const FilterPage = () => {
  let data = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const province = searchParams.get("province") || "";
  const district = searchParams.get("district") || "";
  const regency = searchParams.get("regency") || "";

  const selected_province = data.provinces.find(i => i.id === Number(province));
  const selected_regency = data.regencies.find(i => i.id === Number(regency));
  const selected_district = data.district.find(i => i.id === Number(district));

  function handleChange(key, value) {
    let newParams = {
      province,
      regency,
      district,
    };
    if (key === "province") {
      newParams = { province: value, regency: "", district: "" };
    }
    if (key === "regency") {
      newParams = { province, regency: value, district: "" };
    }
    if (key === "district") {
      newParams = { province, regency, district: value };
    }
    setSearchParams(newParams, { replace: true });
  }

  let selectCollection = [
    {
      title: "PROVINSI",
      icon: <CiMap className="text-gray-400" size={20} />,
      option: data.provinces,
      value: province,
      eventKey: "province",
    },
    {
      title: "KOTA/KABUPATEN",
      icon: <MdLocationCity className="text-gray-400" size={20} />,
      option: data.regencies.filter(
        item => item.province_id === Number(province),
      ),
      value: regency,
      eventKey: "regency",
    },
    {
      title: "KECAMATAN",
      icon: <IoLocationOutline className="text-gray-400" size={20} />,
      option: data.district.filter(item => item.regency_id === Number(regency)),
      value: district,
      eventKey: "district",
    },
  ];

  let breadctumbsItem = [
    selected_province,
    selected_regency,
    selected_district,
  ].filter(Boolean);

  const renderRegion = [
    {
      title: "PROVINSI",
      value: selected_province,
      style: "text-5xl",
    },
    {
      title: "KOTA/KABUPTATEN",
      value: selected_regency,
      style: "text-5xl",
    },
    {
      title: "KECAMATAN",
      value: selected_district,
      style: "text-4xl",
    },
  ];

  console.log(searchParams);

  let filterActive = province || regency || district;

  console.log(filterActive);
  return (
    <div className="flex min-h-screen font-roboto">
      {/* Sidebar */}
      <div className="py-4 px-8 border space-y-16 min-w-80">
        <div className="flex items-center gap-3 my-2">
          <div className="bg-blue-100 rounded-xl p-2">
            <FaGlobeAsia className="text-blue-500" size={18} />
          </div>
          <h3 className="font-semibold text-lg">Frontend Asessment</h3>
        </div>
        <div className="space-y-5">
          <p className="text-gray-400 text-[10px] tracking-[0.2em] uppercase font-bold">
            Filter Wilayah
          </p>

          <div className="flex flex-col gap-8">
            {selectCollection.map((item, index) => (
              <div key={index} className="flex flex-col gap-3">
                <label
                  htmlFor=""
                  className="uppercase text-xs font-bold text-gray-500">
                  {item.title}
                </label>
                <div className="flex border-2 border-gray-400 justify-between p-3 gap-2 rounded-2xl items-center text-gray-500">
                  {item.icon}
                  <select
                    onChange={e => {
                      handleChange(item.eventKey, e.target.value);
                    }}
                    value={item.value}
                    className="bg-white flex-1 text-sm text-gray-700 font-semibold">
                    <option value="">Pilih {item.title}</option>
                    {item.option.map((item, index) => (
                      <option
                        key={index}
                        value={item.id}
                        className=" w-full bg-none">
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                setSearchParams({});
              }}
              className={`flex w-full uppercase items-center mt-5 text-xs justify-center border-2 font-semibold rounded-2xl text-gray-700 p-3 tracking-[0.1em] hover:border-blue-500 hover:bg-blue-50  ${filterActive ? "border-blue-500 bg-blue-50" : "border-gray-400"}`}>
              <MdOutlineFilterAltOff size={20} />
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <nav className="border-b py-7 w-full px-6">
          <div className="flex gap-3 items-center">
            <p className="text-xs text-gray-400 font-bold">Indonesia</p>
            {breadctumbsItem.map((item, index) => {
              let isLast = breadctumbsItem.length - 1 === index;
              return (
                <div
                  key={index}
                  className="text-xs flex items-center gap-3 text-gray-400 font-bold">
                  <IoIosArrowForward />
                  <span className={`${isLast ? "text-blue-400" : ""}`}>
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </nav>
        <main className="flex-1 flex items-center justify-around py-14">
          <div className="flex-1 flex flex-col justify-center h-full">
            {renderRegion.map((item, index) => (
              <div
                key={index}
                className={`text-center flex flex-col items-center ${index !== renderRegion.length - 1 ? "flex-1" : ""} justify-center`}>
                <div className="space-y-3 flex-1">
                  <p className="text-blue-300 uppercase font-semibold text-xs tracking-[0.3em]">
                    {item.title}
                  </p>
                  <h2 className={`${item.style} font-bold text-sm`}>
                    {item.value ? item.value.name : ""}
                  </h2>
                </div>
                {index !== renderRegion.length - 1 && (
                  <div className="flex items-center flex-1">
                    <FaArrowDownLong size={20} className="text-gray-300 " />
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
