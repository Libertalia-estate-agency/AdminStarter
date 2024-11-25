
"use client"
import img1 from "@/public/images/home/img-1.png"
import img2 from "@/public/images/home/img-2.png"
import img3 from "@/public/images/home/img-3.png"
import img4 from "@/public/images/home/img-4.png"
import img5 from "@/public/images/home/img-5.png"
import img6 from "@/public/images/home/img-6.png"

import img from "@/public/images/chart/chart-3.jpg"
import imgr from "@/public/images/avatar/user1.png"

import Image from "next/image"

import { Fragment } from "react"


const data = [
  {
    id: 1,
    name: "Midrand",
    price: "27",
    totalsales: "162",
    image: img
  },
  {
    id: 2,
    name: "Fourways",
    price: "4",
    totalsales: "135",
    image: imgr
  },
  {
    id: 3,
    name: "Sandton",
    price: "17",
    totalsales: "107",
    image: img
  },
  {
    id: 4,
    name: "Centurion",
    price: "3",
    totalsales: "95",
    image: imgr
  },
  {
    id: 5,
    name: "Waterfall City",
    price: "15",
    totalsales: "92",
    image: img
  },
  {
    id: 6,
    name: "Randburg",
    price: "5",
    totalsales: "75",
    image: imgr
  },
  {
    id: 7,
    name: "Bramley",
    price: "2",
    totalsales: "50",
    image: img
  },
  {
    id: 8,
    name: "Hatfield",
    price: "6",
    totalsales: "40",
    image: imgr
  },
  {
    id: 9,
    name: "Montana",
    price: "2",
    totalsales: "30",
    image: img
  },
  {
    id: 10,
    name: "East Rand",
    price: "7",
    totalsales: "20",
    image: imgr
  },
  {
    id: 11,
    name: "Durban",
    price: "2",
    totalsales: "10",
    image: img
  }
]
const TopSell = () => {
  return (
    <Fragment>
      {
        data.map((item, index) => (
          <li
            className="flex justify-between items-center gap-2 border-b border-default-300 py-3 px-6 hover:bg-default-50"
            key={`top-sell-${index}`}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md">
                <Image
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-default-700"> {item.name}</span>
                <span className="text-xs font-medium text-default-600">{item.price} Agents</span>
              </div>
            </div>
            <span className="text-xs text-default-600">{item.totalsales} sales</span>
          </li>
        ))
      }

    </Fragment>
  );
};

export default TopSell;
