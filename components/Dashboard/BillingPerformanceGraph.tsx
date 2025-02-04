import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useDarkMode } from "@/context/darkModeContext";

const data = [
  { month: "Jan", value: 0 },
  { month: "Feb", value: 20 },
  { month: "Mar", value: 10 },
  { month: "Apr", value: 30 },
  { month: "Jun", value: 25 },
  { month: "Jul", value: 70 },
  { month: "Aug", value: 45 },
  { month: "Sep", value: 30.5 },
  { month: "Oct", value: 80 },
  { month: "Nov", value: 90 },
  { month: "Dec", value: 100 },
]

const BillingPerformanceGraph = () => {
  const darkMode = useDarkMode();
  return (
    <div className="bg-cdneutral-white dark:bg-transparent dark:border p-4 rounded-lg shadow-md my-6">
      <div className="flex justify-between mb-2">
        <h3 className="font-clashSemiBold text-cdneutral-black dark:text-cdneutral-white mb-2">Billing Performance</h3>
        <Select defaultValue="monthly">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="month"
              stroke="#888888"
              fontSize={12}
              color="red"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#000', border: "none", borderRadius: "8px", color: `${darkMode ? '#fff' : '#000'}` }}
              cursor={{ stroke: "#8B5CF6", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#8B5CF6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BillingPerformanceGraph;
