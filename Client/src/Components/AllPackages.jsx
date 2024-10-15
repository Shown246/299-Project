import { useState, useEffect } from "react";
import axios from "axios";
import PackageCard from "./PackageCard";

const AllPackages = () => {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    axios
      .get("https://ph-assignment12-server.vercel.app/packages")
      .then((res) => {
        setPackages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container90 my-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((item, index) => (
          <PackageCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default AllPackages;
