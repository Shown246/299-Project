import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import PackageCard from "./PackageCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MeetGuides from "./MeetGuides";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [cardsData, setCardsData] = useState([]);
  useEffect(() => {
    axios
      .get("https://ph-assignment12-server.vercel.app/packages")
      .then((res) => {
        setCardsData(res.data.slice(0, 3));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mt-10">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Our Packages" {...a11yProps(1)} />
            <Tab label="Meet Our Tour Guides" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="flex w-full justify-center items-center">
            <iframe
              width="800"
              height="400"
              src="https://www.youtube.com/embed/Cn4G2lZ_g2I?si=PFRW1VjrbkVZwh7h"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="flex flex-col">
            <div className="flex flex-wrap justify-center gap-4">
              {cardsData.map((card, index) => (
                <PackageCard key={index} {...card} />
              ))}
            </div>
            <button
              onClick={() => {
                navigate("/allPackages");
              }}
              className="block mx-auto mt-12 bg-genoa text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-flamingo hover:text-white  transition duration-300 ease-in-out"
            >
              All Packages
            </button>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <MeetGuides />
        </CustomTabPanel>
      </Box>
    </div>
  );
}
