import { useNavigate } from "react-router";
import { Button } from "../../components/Button";
import Charts from "./components/Charts";
import OverviewAnalyticsChart from "./components/OverviewAnalyticsChart";
import RecentCompletedReminders from "./components/RecentCompletedReminders";

const DashboardData = [
  { id: 1, reminder: "Sample reminder 1", date: "2026-5-10" },
  { id: 2, reminder: "Sample reminder 2", date: "2026-5-20" },
  { id: 3, reminder: "Sample reminder 3", date: "2026-5-30" },
  { id: 4, reminder: "Sample reminder 4", date: "2026-6-29" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const navigateToLogs = () => {
    navigate("/logs");
  };
  return (
    <div className="p-6 w-full flex flex-col gap-4">
      <div className="py-6">
        <p className="text-2xl fond-bold ">Admin Dashboard</p>
      </div>
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <div className="flex justify-between bg-gray-100 px-4 py-2 border-b border-gray-300 font-bold">
          <span>Upcoming reminders</span>
          <span></span>
        </div>
        <div className="flex flex-col">
          {DashboardData.map((item) => (
            <div
              key={item.id}
              className="flex justify-between px-4 py-2 border-b border-gray-300 last:border-b-0"
            >
              <p className="text-left">{item.reminder}</p>
              <p className="text-right">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 ">
        <Button variant="teritary" label="System Status" />
        <Button onClick={navigateToLogs} variant="teritary" label="View Logs" />
      </div>
      <div>
        <Charts />
      </div>
      <div>
        <RecentCompletedReminders />
      </div>
      <OverviewAnalyticsChart />
    </div>
  );
};

export default Dashboard;
