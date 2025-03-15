import { useDaily } from "../services/hooks/useInfo";
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
    <section>
      <div className="flex mt-3 md:mt-7 mb-3 items-center">
        <div className="flex flex-col ml-3">
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
        <ul className="w-full flex flex-col gap-2 px-2">
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
                  style={{ backgroundColor }}
                  className="px-1 md:px-1 py-1 w-auto md:w-auto flex items-start md:items-center gap-0 md:gap-1"
                >
                  <span className="text-xs md:text-sm">{fileName}:</span>
                  <span className="text-xs md:text-sm">
                    {formattedDuration}
                  </span>
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
