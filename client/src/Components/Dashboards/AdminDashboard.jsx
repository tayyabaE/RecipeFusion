import React,{useState} from "react";
import "./AdminDashboard.css";
import * as Icons from "react-icons/fa6";
import Chart from "react-apexcharts";
import Sidebar from "../Dashboards/Sidebar.jsx"
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";


const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];


function AdminDashboard() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Sidebar />
      
    <div className="admin-dashboard" style={{ flexGrow: 1, padding: "20px"}}>
      
      <div className="row jc-between">
        <h3 className="greeting">Welcome </h3>
        <h4>Admin</h4>
      </div>

      <div className="cards-container jc-evenly">
        <div className="card row jc-between">
          <div className="card-left">
            <h4 className="card-heading">Total Users</h4>
            <p className="count">1200</p>
          </div>
          <div className="card-right">
            <Icons.FaUser className="icons card-icons" />
          </div>
        </div>
        <div className="card row jc-between">
          <div className="card-left">
            <h4 className="card-heading">Recipes</h4>
            <p className="count">85</p>
          </div>
          <div className="card-right">
            <Icons.FaReceipt className="icons card-icons" />
          </div>
        </div>
        <div className="card row jc-between">
          <div className="card-left">
            <h4 className="card-heading">Reviews</h4>
            <p className="count">230</p>
          </div>
          <div className="card-right">
            <Icons.FaStar className="icons card-icons" />
          </div>
        </div>
      </div>

      <div className="dashboard-content">
       <BarChart/>
       <ChartFunc/>
      </div>
      </div>
    </div>
  );
}



function BarChart(){
  return(
    <div className="barchart">
    <h3 className="barchart-header">
      <Icons.FaStar className="icons-colored"/> Reviews
    </h3>
    <div className="barchart-container">
      <Chart
        type="bar"
        width={"100%"}
        height={300}
        series={[{ data: [65, 25, 10] }]}
        options={{
          plotOptions: {
            bar: {
              columnWidth: "45%", 
            },
          },
          colors: ["#bf4c0d", "#bf4c0d", "#bf4c0d"],
          theme: { mode: "light" },
          xaxis: {
            tickPlacement: "on",
            categories: ["Positive", "Neutral", "Negative"],
            labels: {
              style: {
                fontSize: 14,
                fontWeight: "550",
                colors: ["#bf4c0d","#bf4c0d","#bf4c0d"],
              },
            },
          },
          yaxis: {
            labels: {
              formatter: (val) => `${val}%`,
              style: {
                fontSize: 14,
                fontWeight: "550",
                colors: ["#bf4c0d"],
              },
            },
          },
          legend: {
            show: true,
            position: "right",
            labels: {
              colors: "#000",
              useSeriesColors: false,
              fontSize: 14,
            },
          },
          dataLabels: {
            enabled: true,
            formatter: (val) => `${val}%`,
            style: {
              colors: ["#ffffff"],
              fontSize: "14px",
            },
          },
          chart:{
            toolbar:{
              show:false
            }
          }
        }}
      />
    </div>
  </div>
  )
}

function ChartFunc() {
  return ( 
    <div className="chart-container">
      <h3 className="chart-title">Recipe Generation</h3>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd"/>
          <XAxis dataKey="name" stroke="#555" tick={{ fill: "#bf4c0d", fontSize:14, fontWeight:550 }} />
          <YAxis stroke="#555" tick={{ fill: "#bf4c0d", fontSize:14, fontWeight:550 }} />
          <Tooltip />
          <Area type="basis" dataKey="uv" stackId="1" stroke="#8884d8" fill="url(#colorUv)" fillOpacity={1} />
          <Area type="basis" dataKey="pv" stackId="1" stroke="#82ca9d" fill="url(#colorPv)" fillOpacity={1} />
          <Area type="basis" dataKey="amt" stackId="1" stroke="#ffc658" fill="url(#colorAmt)" fillOpacity={1} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}




function FilterPanel() {
  const [selectedFilter, setSelectedFilter] = useState("");

  const filters = [
    { label: "Vegan", icon: <Icons.FaLeaf className="icons-colored vegan" /> },
    { label: "Gluten-Free", icon: <Icons.FaBreadSlice className="filter-icon gluten-free" /> },
    { label: "Low-Carb", icon: <Icons.FaCarrot className="filter-icon low-carb" /> },
    { label: "High-Protein", icon: <Icons.FaDrumSteelpan className="filter-icon high-protein" /> },
  ];
  
  return (
    <div className="filter-panel">
    <h3 className="filter-header">
      <Icons.FaFilterCircleDollar className="icons-colored" /> Filters
    </h3>
    <div className="filter-dropdown">
      <select
        className="custom-dropdown"
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
      >
        <option value="">Select a Filter</option>
        {filters.map((filter, index) => (
          <option key={index} value={filter.label}>
            {filter.label}
          </option>
        ))}
      </select>
    </div>
  </div>
  );
}




export default AdminDashboard;
