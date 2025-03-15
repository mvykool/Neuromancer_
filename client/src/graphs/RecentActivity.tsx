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
    <div className="w-2/6 p-2">
      <h3 className="text-primary">Recent Activity</h3>
      <ul className="activity-list">
        {activity.map((item, index) => (
          <li key={index} className="activity-item">
            <span className="repo-name">{item.name}</span>
            <span className="text-primary">{formatDate(item.updatedAt)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
