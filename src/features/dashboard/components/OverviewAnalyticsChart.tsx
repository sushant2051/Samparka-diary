import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

type AnalyticsItem = {
  name: string;
  count: number;
  color: string;
};

type FilterType = "week" | "month" | "year";

const analyticsData: Record<FilterType, AnalyticsItem[]> = {
  week: [
    { name: "Reminders", count: 5, color: "#2563eb" },
    { name: "Contacts", count: 3, color: "#16a34a" },
    { name: "Notes", count: 7, color: "#f59e0b" },
    { name: "Emergency", count: 2, color: "#dc2626" },
  ],
  month: [
    { name: "Reminders", count: 18, color: "#2563eb" },
    { name: "Contacts", count: 12, color: "#16a34a" },
    { name: "Notes", count: 24, color: "#f59e0b" },
    { name: "Emergency", count: 6, color: "#dc2626" },
  ],
  year: [
    { name: "Reminders", count: 120, color: "#2563eb" },
    { name: "Contacts", count: 45, color: "#16a34a" },
    { name: "Notes", count: 210, color: "#f59e0b" },
    { name: "Emergency", count: 20, color: "#dc2626" },
  ],
};

type TooltipPayloadItem = {
  payload: AnalyticsItem;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadItem[];
};

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;
  const data = payload[0].payload;

  return (
    <div className="bg-white border border-gray-200 rounded-md px-3 py-2 shadow-md text-sm">
      <div className="flex items-center gap-2">
        <span
          className="w-3 h-3 rounded-sm"
          style={{ backgroundColor: data.color }}
        />
        <p className="font-medium">{data.name}</p>
      </div>
      <p className="text-gray-600 ml-5">Count: {data.count}</p>
    </div>
  );
};

const ChartLegend = ({ items }: { items: AnalyticsItem[] }) => {
  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {items.map((item) => (
        <div key={item.name} className="flex items-center gap-2 text-sm">
          <span
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-gray-700">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

const OverviewAnalyticsChart = () => {
  const [filter, setFilter] = useState<FilterType>("week");
  const data = analyticsData[filter];

  return (
    <div className="border border-gray-200 rounded-md p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <p className="font-bold text-lg">Overview Analytics</p>
        <div className="flex gap-2">
          {[
            { label: "7D", value: "week" },
            { label: "Month", value: "month" },
            { label: "Year", value: "year" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value as FilterType)}
              className={`px-3 py-1 rounded-md text-sm font-medium border
                ${
                  filter === tab.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <ChartLegend items={data} />
    </div>
  );
};

export default OverviewAnalyticsChart;
