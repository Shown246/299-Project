/* eslint-disable react/prop-types */
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import { CssBaseline } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LuggageOutlinedIcon from "@mui/icons-material/LuggageOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SerProfile from "./SerProfile";
import { useNavigate } from "react-router-dom";

export function SubNavTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: 320, sm: 600, md: 900, lg: 1350 },
        bgcolor: "background.paper"
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Sub-nav One" />
        <Tab label="Sub-nav Two" />
        <Tab label="Sub-nav Three" />
        <Tab label="Sub-nav Four" />
        <Tab label="Sub-nav Five" />
        <Tab label="Sub-nav Six" />
        <Tab label="Sub-nav Seven" />
      </Tabs>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ margin: "0px" }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

export default function VerticalTabs() {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  return (
    <Box display="flex">
      <CssBaseline />
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          bgcolor: "#1f2532",
          top: 0,
          "& .MuiTab-root": {
            color: "white",
            fontWeight: "200",
            textTransform: "none",
            fontSize: "12px"
          },
          overflow: "visible",
          borderRight: 1,
          borderColor: "divider",
          width: "100px",
          height: "100 "
        }}
      >
        <Tab
          label={
            <div  onClick={() => navigate("/")} >
              <HomeIcon />
              <br /> Home
            </div>
          }
          {...a11yProps(0)}
        />
        <Tab
          label={
            <div>
              <LuggageOutlinedIcon />
              <br /> Profile
            </div>
          }
          {...a11yProps(1)}
        />
        <Tab
          label={
            <div>
              <CheckCircleOutlineOutlinedIcon />
              <br /> Approvals
            </div>
          }
          {...a11yProps(2)}
        />
        <Tab
          label={
            <div>
              <InfoOutlinedIcon />
              <br /> Risk
            </div>
          }
          {...a11yProps(2)}
        />
        <Tab
          label={
            <div>
              <ContactPhoneOutlinedIcon />
              <br /> Contact
            </div>
          }
          {...a11yProps(3)}
        />
        <Tab
          label={
            <div>
              <AssignmentOutlinedIcon />
              <br /> Reporting
            </div>
          }
          {...a11yProps(4)}
        />
        <Tab
          label={
            <div>
              <SettingsOutlinedIcon />
              <br /> Admin
            </div>
          }
          {...a11yProps(5)}
        />

      </Tabs>
      <TabPanel value={value} index={0}>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SerProfile />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h2> Approvals</h2>
        <SubNavTabs />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h2>Risk</h2>
        <SubNavTabs />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <h2>Contact</h2>
        <SubNavTabs />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <h2> Reporting</h2>
        <SubNavTabs />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <h2> Admin</h2>
        <SubNavTabs />
      </TabPanel>
    </Box>
  );
}
