import express, { json } from "express";
import { get } from "axios";
import cors from "cors";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(json());

app.get("/api/dashboard", async (req, res) => {
  try {
    const [githubProfile, githubRepos, customApiData] = await Promise.all([
      get(`https://api.github.com/users/${process.env.GITHUB_USERNAME}`, {
        headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
      }),

      get(`https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`, {
        headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
      }),

      get(process.env.CUSTOM_API_URL),
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

    // Combine everything into a single response object
    const dashboardData = {
      profile,
      repos,
      customData: customApiData.data,
      chartData: {
        languageDistribution: Object.entries(languageStats).map(
          ([language, count]) => ({
            language,
            count,
          }),
        ),
        recentActivity: activityTimeline,
        // Add any other derived chart data you need
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
e;
