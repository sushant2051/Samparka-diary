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

const reminderStats = [
  { period: "1 Week", count: 4 },
  { period: "1 Month", count: 10 },
  { period: "3 Months", count: 22 },
];

const contactStats = [
  { period: "1 Week", count: 3 },
  { period: "1 Month", count: 12 },
  { period: "1 Year", count: 45 },
];

const COLORS = ["#3b82f6", "#22c55e", "#f97316"]; // blue, green, orange

const Charts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Upcoming Reminders */}
      <div className="border border-gray-200 rounded-md p-4">
        <p className="font-bold mb-4">Upcoming Reminders</p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={reminderStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
              {reminderStats.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* New Contacts */}
      <div className="border border-gray-200 rounded-md p-4">
        <p className="font-bold mb-4">New Contacts</p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={contactStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
              {contactStats.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
