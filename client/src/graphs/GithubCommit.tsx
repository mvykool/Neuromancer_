import React, { useEffect } from "react";
import { useInfo } from "../services/hooks/useInfo";
import { useQueryClient } from "@tanstack/react-query";
import CyberpunkCommitChart from "./Chart";

const GitHubDashboard = () => {
  const { data, isLoading, error, refetch } = useInfo();
  const queryClient = useQueryClient();

  // Check for date changes periodically
  useEffect(() => {
    const checkForNewDay = () => {
      const storedDate = localStorage.getItem("currentViewDate");
      const today = new Date().toISOString().split("T")[0];

      if (storedDate !== today) {
        // Day has changed since last load - invalidate cache and refetch
        localStorage.setItem("currentViewDate", today);
        // Fixed: Use object syntax for invalidateQueries in TanStack Query
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
        refetch();
      }
    };

    // Initial check
    checkForNewDay();

    // Set up interval check (every minute)
    const interval = setInterval(checkForNewDay, 60000);

    return () => clearInterval(interval);
  }, [queryClient, refetch]);

  // Manual refresh handler
  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-black text-green-400 p-6 rounded-lg border border-green-700">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-2 w-24 bg-green-400 rounded mb-3"></div>
          <div className="h-2 w-32 bg-green-400 rounded mb-3"></div>
          <div className="h-2 w-28 bg-green-400 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-red-500 p-4 border border-red-700 rounded">
        <p>Error loading dashboard data: {error.message}</p>
        <button
          onClick={handleRefresh}
          className="mt-2 px-4 py-2 bg-red-900 text-white rounded hover:bg-red-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <CyberpunkCommitChart
        data={data?.chartData.dailyCommits || []}
        loading={isLoading}
        username="mvykool"
      />

      <div className="mt-4 text-xs text-gray-500">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default GitHubDashboard;
