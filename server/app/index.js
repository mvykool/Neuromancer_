const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/dashboard", async (req, res) => {
  try {
    const [githubProfile, githubRepos, customApiData] = await Promise.all([
      axios.get(`https://api.github.com/users/${process.env.GITHUB_USERNAME}`),
      axios.get(
        `https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`,
      ),
      axios.get(process.env.CODING_TRACKER),
    ]);

    const profile = {
      username: githubProfile.data.login,
      name: githubProfile.data.name,
      avatar: githubProfile.data.avatar_url,
      followers: githubProfile.data.followers,
      following: githubProfile.data.following,
      publicRepos: githubProfile.data.public_repos,
    };

    const repos = githubRepos.data.map((repo) => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      updatedAt: repo.updated_at,
    }));

    const languageStats = repos.reduce((acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {});

    const activityTimeline = repos
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 10)
      .map((repo) => ({
        name: repo.name,
        updatedAt: repo.updatedAt,
      }));

    // Process coding stats data
    const codingStats = customApiData.data;

    // Calculate coding language distribution
    const languageDistribution = codingStats.reduce((acc, day) => {
      day.file_types.forEach((type) => {
        acc[type.type] = (acc[type.type] || 0) + type.duration;
      });
      return acc;
    }, {});

    // Calculate daily coding time
    const dailyCodingTime = codingStats.map((day) => ({
      date: day._id,
      duration: day.total_duration,
    }));

    // Combine everything into a single response object
    const dashboardData = {
      profile,
      repos,
      codingStats: {
        dailyData: codingStats,
        totalMinutesCoded: codingStats.reduce(
          (sum, day) => sum + day.total_duration,
          0,
        ),
        averageDailyMinutes: Math.round(
          codingStats.reduce((sum, day) => sum + day.total_duration, 0) /
            codingStats.length,
        ),
      },
      chartData: {
        // GitHub data
        languageDistribution: Object.entries(languageStats).map(
          ([language, count]) => ({
            language,
            count,
          }),
        ),
        recentActivity: activityTimeline,

        // Coding stats data
        codingLanguageDistribution: Object.entries(languageDistribution).map(
          ([language, minutes]) => ({
            language,
            minutes,
          }),
        ),
        dailyCodingTime,
      },
    };

    // Send the combined data to the client
    res.json(dashboardData);
  } catch (error) {
    console.error("Dashboard API Error:", error);
    res.status(500).json({
      error: "Failed to fetch dashboard data",
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
