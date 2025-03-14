import { useDaily } from "../services/hooks/useDaily.ts";
import { FileType } from "../types/types";
import { languages } from "../utils/codingTracker";
import { excludeFileTypes } from "../utils/exculeTypes";
import { formatDuration } from "../utils/fortmatDuration";

const DailyCoding = () => {
  const { data: data, isLoading, error } = useDaily();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data[0]);

  const dailyData = data[0];

  const hasValidFileTypes =
    dailyData?.file_types?.length > 0 &&
    dailyData.file_types.some(
      (file: FileType) => !excludeFileTypes.includes(file.type),
    );

  return (
    <section className=" border-4 border-gray-400 p-2">
      <div className="flex items-center justify-around">
        <img src="/nvim.jpeg" alt="" className="object-cover h-24 w-24 p-2" />

        <div className="flex flex-col">
          <span className="text-primary text-2xl">ℕ𝕖𝕠𝕍𝕚𝕞</span>
          <p className="text-white text-sm">Coding Session:</p>
          <p className="text-white text-sm tracking-wide">
            {dailyData.total_duration
              ? formatDuration(dailyData.total_duration)
              : "Session has not started"}
          </p>
        </div>
      </div>
      {isLoading && <div>Showing cached data...</div>}
      <div className="w-full">
        <ul className="w-full flex flex-col gap-2 mt-4 ">
          {hasValidFileTypes ? (
            dailyData?.file_types.map((file: FileType, index: number) => {
              const fileInfo = languages.find(
                (info) => info.type === file.type,
              );
              const fileName = fileInfo ? fileInfo.name : file.type;
              const backgroundColor = fileInfo ? fileInfo.color : "#0000";
              const formattedDuration = formatDuration(file.duration);
              if (!formattedDuration) return null;
              return (
                <li
                  key={index}
                  style={{ border: `2px solid ${backgroundColor}` }}
                  className="flex justify-between items-center"
                >
                  <p className="text-white flex gap-2 tracking-normal text-sm">
                    <span>{fileName}:</span>
                    <span>{formattedDuration}</span>
                  </p>
                  <div className="w-2/6 h-5" style={{ backgroundColor }}></div>
                </li>
              );
            })
          ) : (
            <div>
              <ul className="flex flex-wrap gap-2">
                <li className="rounded-lg px-1 md:px-1 py-1 w-auto md:w-auto flex items-start md:items-center gap-0 md:gap-1 bg-[#4d8ddb] text-xs md:text-sm">
                  TSX 1h - 20 mins
                </li>
              </ul>
            </div>
          )}
        </ul>
      </div>
    </section>
  );
};

export default DailyCoding;
