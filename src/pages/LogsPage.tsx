import { useState } from "react";
import { InputField } from "../components/InputFiled";

const LogsData = [
  { id: 1, reminder: "Sample logs 1", date: "2026-5-10" },
  { id: 2, reminder: "Sample logs 2", date: "2026-5-20" },
  { id: 3, reminder: "Sample logs 3", date: "2026-5-30" },
  { id: 4, reminder: "Sample logs 4", date: "2026-6-29" },
  { id: 5, reminder: "Call a friend", date: "2026-5-10" },
  { id: 6, reminder: "Sample friend 2", date: "2026-5-20" },
  { id: 7, reminder: "Sample friend 3", date: "2026-5-30" },
  { id: 8, reminder: "Sample friend 4", date: "2026-6-29" },
  { id: 9, reminder: "Birthday wish", date: "2026-5-10" },
  { id: 10, reminder: "Attend meetin", date: "2026-5-20" },
  { id: 11, reminder: "Travel for office work", date: "2026-5-30" },
  { id: 12, reminder: "This is a reminder", date: "2026-6-29" },
];

const LogsPage = () => {
  const [searchValue, setSearchValue] = useState("");

  const filterData = LogsData.filter((data) =>
    data.reminder.toLowerCase().includes(searchValue.toLowerCase()),
  );
  return (
    <div className="p-6 w-full flex flex-col gap-4">
      <InputField
        placeholder="Search logs"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <div className="flex justify-between bg-gray-100 px-4 py-2 border-b border-gray-300 font-bold">
          <span>Logs</span>
          <span></span>
        </div>
        <div className="flex flex-col">
          {filterData.map((item) => (
            <div
              key={item.id}
              className="flex justify-between px-4 py-2 border-b border-gray-300 last:border-b-0"
            >
              <p className="text-left">{item.reminder}</p>
              <p className="text-right">{item.date}</p>
            </div>
          ))}
        </div>
        {filterData.length < 1 && (
          <p className="mt-2 flex justify-center items-center">
            No items found on log history
          </p>
        )}
      </div>
    </div>
  );
};

export default LogsPage;
