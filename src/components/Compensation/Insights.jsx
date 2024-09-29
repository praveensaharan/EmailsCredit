import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const COLORS = ["#4A90E2", "#50E3C2", "#F5A623", "#D0021B", "#B8E986"];

// Format the salary in lakhs or crores
const formatSalary = (value) => {
  if (value >= 100) {
    return `${(value / 100).toFixed(2)} Cr`; // Convert to Crores if greater than or equal to 100
  }
  return `${value.toFixed(2)} Lac`; // Otherwise, return in Lakhs
};

// Optional custom tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-2 rounded shadow-lg">
        <p className="font-semibold">{`Salary: ${formatSalary(
          payload[0].value
        )}`}</p>
      </div>
    );
  }
  return null;
};

export default function Insights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pricemailbackend.vercel.app/compensation-stats/"
        );
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-4 animate-pulse">
        <div className="h-40 bg-gray-200 rounded"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-white bg-red-600 rounded-md">
        Failed to load insights. Please try again later.
      </div>
    );
  }

  const { experienceStats, salaryRanges, top15Companies } = data;

  // Salary Distribution Data
  const salaryRangeData = Object.entries(salaryRanges).map(
    ([range, count]) => ({
      range,
      count,
    })
  );

  // Box Plot Data Preparation
  const boxPlotData = [
    {
      level: "Entry",
      min: experienceStats.entry.min,
      q1: experienceStats.entry.median - 5,
      median: experienceStats.entry.median,
      q3: experienceStats.entry.median + 5,
      max: experienceStats.entry.max,
    },
    {
      level: "Mid",
      min: experienceStats.mid.min,
      q1: experienceStats.mid.median - 10,
      median: experienceStats.mid.median,
      q3: experienceStats.mid.median + 10,
      max: experienceStats.mid.max,
    },
    {
      level: "Senior",
      min: experienceStats.senior.min,
      q1: experienceStats.senior.median - 15,
      median: experienceStats.senior.median,
      q3: experienceStats.senior.median + 15,
      max: experienceStats.senior.max,
    },
    {
      level: "Senior+",
      min: experienceStats.seniorPlus.min,
      q1: experienceStats.seniorPlus.median - 15,
      median: experienceStats.seniorPlus.median,
      q3: experienceStats.seniorPlus.median + 15,
      max: experienceStats.seniorPlus.max,
    },
  ];

  // Top Companies Data
  const topCompaniesData = Object.entries(top15Companies).map(
    ([company, count]) => ({
      company,
      count,
    })
  );

  return (
    <div className="p-6 bg-gray-100 text-gray-900 space-y-12">
      <h2 className="text-4xl font-extrabold mb-8 text-blue-700">
        Salary Insights
      </h2>

      {/* Salary Distribution */}
      <div className="bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-xl">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Salary Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salaryRangeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill={COLORS[1]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Box Plot for Salary by Experience Level */}
      <div className="bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-xl">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Salary by Experience Level
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={boxPlotData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="level" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="median" fill={COLORS[2]} />
            {boxPlotData.map((entry, index) => (
              <React.Fragment key={index}>
                <ReferenceLine
                  y={entry.q1}
                  stroke="red"
                  strokeDasharray="3 3"
                />
                <ReferenceLine
                  y={entry.q3}
                  stroke="green"
                  strokeDasharray="3 3"
                />
                <ReferenceLine
                  y={entry.min}
                  stroke="blue"
                  strokeDasharray="3 3"
                />
                <ReferenceLine
                  y={entry.max}
                  stroke="blue"
                  strokeDasharray="3 3"
                />
              </React.Fragment>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Companies by Count */}
      <div className="bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-xl">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Top Companies by Count
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topCompaniesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="company" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill={COLORS[0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// import React, { useEffect, useState, useMemo } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   ReferenceLine,
//   Cell,
// } from "recharts";
// import { motion } from "framer-motion";
// import { Spin } from "antd"; // Import Spin from Ant Design

// const COLORS = {
//   primary: "#4056a1",
//   secondary: "#f13c20",
//   accent: "#d79922",
//   light: "#efe2ba",
//   muted: "#c5cbe3",
//   background: "hsl(210, 100%, 6%)",
//   foreground: "hsl(180, 100%, 90%)",
//   card: "hsl(210, 100%, 12%)",
// };

// const formatSalary = (value) => {
//   if (value >= 100) {
//     return `₹${(value / 100).toFixed(2)} Cr`;
//   }
//   return `₹${value.toFixed(2)} Lac`;
// };

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-card p-4 rounded-lg shadow-lg border border-muted">
//         <p className="text-foreground font-semibold">{label}</p>
//         <p className="text-accent">{`${payload[0].name}: ${formatSalary(
//           payload[0].value
//         )}`}</p>
//       </div>
//     );
//   }
//   return null;
// };

// export default function Insights() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeChart, setActiveChart] = useState("salaryDistribution");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://pricemailbackend.vercel.app/compensation-stats/"
//         );
//         const result = await response.json();
//         setData(result);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const chartData = useMemo(() => {
//     if (!data) return {};

//     const { experienceStats, salaryRanges, top15Companies } = data;

//     const salaryRangeData = Object.entries(salaryRanges).map(
//       ([range, count]) => ({
//         range,
//         count,
//       })
//     );

//     const boxPlotData = [
//       {
//         level: "Entry",
//         min: experienceStats.entry.min,
//         q1: experienceStats.entry.median - 5,
//         median: experienceStats.entry.median,
//         q3: experienceStats.entry.median + 5,
//         max: experienceStats.entry.max,
//       },
//       {
//         level: "Mid",
//         min: experienceStats.mid.min,
//         q1: experienceStats.mid.median - 10,
//         median: experienceStats.mid.median,
//         q3: experienceStats.mid.median + 10,
//         max: experienceStats.mid.max,
//       },
//       {
//         level: "Senior",
//         min: experienceStats.senior.min,
//         q1: experienceStats.senior.median - 15,
//         median: experienceStats.senior.median,
//         q3: experienceStats.senior.median + 15,
//         max: experienceStats.senior.max,
//       },
//       {
//         level: "Senior+",
//         min: experienceStats.seniorPlus.min,
//         q1: experienceStats.seniorPlus.median - 15,
//         median: experienceStats.seniorPlus.median,
//         q3: experienceStats.seniorPlus.median + 15,
//         max: experienceStats.seniorPlus.max,
//       },
//     ];

//     const topCompaniesData = Object.entries(top15Companies)
//       .map(([company, count]) => ({
//         company,
//         count,
//       }))
//       .sort((a, b) => b.count - a.count)
//       .slice(0, 10);

//     return { salaryRangeData, boxPlotData, topCompaniesData };
//   }, [data]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-background">
//         <Spin size="large" tip="Loading insights..." />{" "}
//         {/* Use Spin from Ant Design */}
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="p-6 text-foreground bg-destructive rounded-lg">
//         Failed to load insights. Please try again later.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background text-foreground p-6 space-y-8">
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="text-4xl font-bold mb-6 text-center text-accent"
//       >
//         Salary Insights
//       </motion.h1>

//       <div className="flex justify-center space-x-4 mb-8">
//         {["salaryDistribution", "experienceLevel", "topCompanies"].map(
//           (chart) => (
//             <motion.button
//               key={chart}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setActiveChart(chart)}
//               className={`px-4 py-2 rounded-full ${
//                 activeChart === chart
//                   ? "bg-primary text-foreground"
//                   : "bg-card text-muted hover:bg-muted hover:text-foreground"
//               } transition-colors duration-200`}
//             >
//               {chart === "salaryDistribution"
//                 ? "Salary Distribution"
//                 : chart === "experienceLevel"
//                 ? "Experience Level"
//                 : "Top Companies"}
//             </motion.button>
//           )
//         )}
//       </div>

//       <motion.div
//         key={activeChart}
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.3 }}
//         className="bg-card shadow-lg rounded-lg p-6"
//       >
//         {activeChart === "salaryDistribution" && (
//           <>
//             <h2 className="text-2xl font-semibold mb-4 text-accent">
//               Salary Distribution
//             </h2>
//             <ResponsiveContainer width="100%" height={400}>
//               <BarChart data={chartData.salaryRangeData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={COLORS.muted} />
//                 <XAxis dataKey="range" tick={{ fill: COLORS.foreground }} />
//                 <YAxis tick={{ fill: COLORS.foreground }} />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Bar dataKey="count" fill={COLORS.primary}>
//                   {chartData.salaryRangeData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS.primary}
//                       opacity={(index + 1) * 0.2}
//                     />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </>
//         )}

//         {activeChart === "experienceLevel" && (
//           <>
//             <h2 className="text-2xl font-semibold mb-4 text-accent">
//               Salary by Experience Level
//             </h2>
//             <ResponsiveContainer width="100%" height={400}>
//               <BarChart data={chartData.boxPlotData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={COLORS.muted} />
//                 <XAxis dataKey="level" tick={{ fill: COLORS.foreground }} />
//                 <YAxis tick={{ fill: COLORS.foreground }} />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Bar dataKey="median" fill={COLORS.primary} />
//                 {chartData.boxPlotData.map((entry, index) => (
//                   <React.Fragment key={index}>
//                     <ReferenceLine
//                       y={entry.q1}
//                       stroke={COLORS.secondary}
//                       strokeDasharray="3 3"
//                     />
//                     <ReferenceLine
//                       y={entry.q3}
//                       stroke={COLORS.accent}
//                       strokeDasharray="3 3"
//                     />
//                     <ReferenceLine
//                       y={entry.min}
//                       stroke={COLORS.muted}
//                       strokeDasharray="3 3"
//                     />
//                     <ReferenceLine
//                       y={entry.max}
//                       stroke={COLORS.muted}
//                       strokeDasharray="3 3"
//                     />
//                   </React.Fragment>
//                 ))}
//               </BarChart>
//             </ResponsiveContainer>
//           </>
//         )}

//         {activeChart === "topCompanies" && (
//           <>
//             <h2 className="text-2xl font-semibold mb-4 text-accent">
//               Top Companies by Count
//             </h2>
//             <ResponsiveContainer width="100%" height={400}>
//               <BarChart data={chartData.topCompaniesData} layout="vertical">
//                 <CartesianGrid strokeDasharray="3 3" stroke={COLORS.muted} />
//                 <XAxis type="number" tick={{ fill: COLORS.foreground }} />
//                 <YAxis
//                   dataKey="company"
//                   type="category"
//                   tick={{ fill: COLORS.foreground }}
//                   width={100}
//                 />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Bar dataKey="count" fill={COLORS.primary}>
//                   {chartData.topCompaniesData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS.primary}
//                       opacity={(index + 1) * 0.1}
//                     />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </>
//         )}
//       </motion.div>
//     </div>
//   );
// }
