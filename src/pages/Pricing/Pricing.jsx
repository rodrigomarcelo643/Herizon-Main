import React, { useState } from "react";
import Crown from "../../assets/images/crown2.png";
import Star from "../../assets/images/star2.png";
import Like from "../../assets/images/like.png";
import Rocket from "../../assets/images/rocket.png"
const data = [
  {
    id: 1,
    name: "Free",
    price: "",
    image: Like,
    description: "For small businesses that need a simple solution.",
    features: [
      "Limited AI assistant access (3 prompts/day) ",
    ],
    f2:[
        "View-only mentor directory"
        
    ],
    f3: [
        "1 learning badge available"
    ], 
    link: "https://www.google.com",
  },
  {
    id: 2,
    name: "Basic",
    price: "₱ 199.99",
    image: Star,
    description: "For small businesses that need a simple solution.",
    features: [
      "Up to 5 users",
      "15 AI assistant prompts/day"
    ],
    f2:[
        "View-only mentor directory"
        
    ],
    f3: [
        "1 learning badge available"
    ],
    link: ""
  },
  {
    id: 3,
    name: "Premium ",
    image: Crown,
    price: "₱ 499.99",
    description: "For small businesses that need a simple solution.",
    features: ["Unlimited AI assistant access"],
    f2:[
        "View-only mentor directory"
        
    ],
    f3: [
        "1 learning badge available"
    ],
    link: "",
  },
];
export default function Pricing() {
  const [display, setFullDisplay] = useState(false);
  const [display2, setFullDisplay2] = useState(false);
  const [display3, setFullDisplay3] = useState(false);

  return (
    <>
      <div className="p-4">
        <h1 className="text-center text-4xl text-gray-900 mt-10 ">
          Choose Your Plan
        </h1>
        <h2 className="text-center text-md">
          Chose a plan that works best for you and your team 
        </h2>
        <div className="flex justify-end relative top-[-60px] right-50 mb-[-70px]"> <img src={Rocket} className=""/></div>
        <div className="grid grid-cols-1gap-6 mt-10  p-4 md:grid-cols-3 gap-4">
          {data.map((i) => (
            <div
              key={i}
              className="block  items-center gap-2 border-2 h-[400px] p-4 bg-gray-400  border-white rounded-[20px] px-6 py-3 hover:bg-gray-600 text-black hover:text-white text-sm"
            >
              <div className="flex">
                 <div className="py-3 px-4 bg-[#edededad] rounded-2xl mr-2 ml-3 ">
                  <img src={i.image} alt="" className="w-10   h-10" />
                </div>
                <div className="block">
                <span className="text-2xl relative mt-3">{i.name}</span>
                  <h1>
                {" "}
                <span className="text-2xl">{i.price} /Month</span>
              </h1>
                </div>
              </div>
              <div className="mt-12 "></div>
              <h1 className="text-[15px] mb-3">✓ {i.features} </h1>
              <h1 className="text-[15px] mb-3">✓ {i.f2} </h1>
              <h1 className="text-[15px] mb-3">✓ {i.f3} </h1>
              <button className="bg-g px-4 py-4 rounded-full text-white  cursor-pointer bg-[#817773] w-full mt-20 text-xl hover:bg-black/80 transition-all duration-300">
                Choose Plan{" "}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
