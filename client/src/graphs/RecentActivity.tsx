import React from "react";

interface RecentActivityProps {
  activity: {
    name: string;
    updatedAt: string;
  }[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activity }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <section className="mt-5">
      <div className="w-full border border-primary">
        <h3 className="text-black font-bold bg-primary p-2">
          Recent Repo Activity:
        </h3>
        <ul className="p-2">
          {activity.map((item, index) => (
            <li key={index} className="activity-item">
              <span className="repo-name">{item.name}</span>
              <span className="text-primary">{formatDate(item.updatedAt)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
