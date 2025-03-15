/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

const NeuralDevDashboard = () => {
  const [activeSection, setActiveSection] = useState("matrix");

  // Hardcoded skill matrix data
  const skillMatrix = {
    dimensions: [
      "Technical Breadth",
      "Technical Depth",
      "Architecture",
      "Problem Solving",
      "Collaboration",
      "Self-Management",
    ],
    stages: [
      "Awareness",
      "Understanding",
      "Application",
      "Mastery",
      "Teaching",
      "Innovation",
    ],
    data: [
      [3, 4, 2, 5, 3, 4], // Technical Breadth progression across stages
      [2, 4, 5, 3, 2, 1], // Technical Depth
      [4, 3, 3, 2, 1, 0], // Architecture
      [5, 5, 4, 4, 3, 2], // Problem Solving
      [3, 4, 4, 3, 5, 1], // Collaboration
      [4, 5, 5, 3, 2, 1], // Self-Management
    ],
  };

  // Hardcoded knowledge nodes
  const knowledgeNodes = [
    { id: 1, name: "React", size: 18, connections: [2, 3, 6] },
    { id: 2, name: "JavaScript", size: 22, connections: [1, 3, 4, 8] },
    { id: 3, name: "TypeScript", size: 16, connections: [1, 2, 4] },
    { id: 4, name: "Node.js", size: 14, connections: [2, 3, 5, 7] },
    { id: 5, name: "Express", size: 12, connections: [4, 7] },
    { id: 6, name: "Redux", size: 10, connections: [1] },
    { id: 7, name: "MongoDB", size: 13, connections: [4, 5] },
    { id: 8, name: "CSS", size: 15, connections: [2, 9] },
    { id: 9, name: "HTML", size: 19, connections: [8] },
  ];

  // Hardcoded augmentation paths
  const augmentations = [
    {
      path: "Neural Architecture",
      level: 3,
      nextMilestone: "System Design Mastery",
      progress: 68,
    },
    {
      path: "Data Structure Enhancement",
      level: 4,
      nextMilestone: "Advanced Algorithms",
      progress: 42,
    },
    {
      path: "Interface Augmentation",
      level: 2,
      nextMilestone: "Animation Frameworks",
      progress: 85,
    },
    {
      path: "Backend Integration",
      level: 3,
      nextMilestone: "Microservice Architecture",
      progress: 29,
    },
  ];

  // Hardcoded learning fragments
  const learningFragments = [
    {
      id: 1,
      topic: "Custom React Hooks",
      lastAccessed: "3 days ago",
      importance: "high",
    },
    {
      id: 2,
      topic: "GraphQL Schema Design",
      lastAccessed: "1 week ago",
      importance: "medium",
    },
    {
      id: 3,
      topic: "CSS Grid Layouts",
      lastAccessed: "yesterday",
      importance: "high",
    },
    {
      id: 4,
      topic: "JWT Authentication",
      lastAccessed: "5 days ago",
      importance: "medium",
    },
  ];

  const getGlowIntensity = (value: any) => {
    return value > 4 ? "glow-strong" : value > 2 ? "glow-medium" : "glow-weak";
  };

  const renderSkillMatrix = () => {
    return (
      <div className="p-4">
        <div className="text-green-400 text-xl font-mono mb-3">
          NEURAL_GROWTH::MATRIX
        </div>
        <div className="bg-gray-900 p-4 border border-green-400 rounded relative">
          <div className="grid grid-cols-7 gap-1">
            <div className="col-span-1"></div>
            {skillMatrix.stages.map((stage, i) => (
              <div
                key={i}
                className="text-xs text-green-300 font-mono transform -rotate-45 origin-left flex justify-center"
              >
                {stage}
              </div>
            ))}

            {skillMatrix.dimensions.map((dimension, i) => (
              <React.Fragment key={`row-${i}`}>
                <div className="text-xs text-green-300 font-mono">
                  {dimension}
                </div>
                {skillMatrix.data[i].map((value, j) => (
                  <div
                    key={`cell-${i}-${j}`}
                    className={`h-6 w-full rounded ${getGlowIntensity(value)} relative cursor-pointer`}
                    style={{
                      backgroundColor: `rgba(80, 250, 123, ${value * 0.1})`,
                      boxShadow: `0 0 ${value * 3}px rgba(80, 250, 123, ${value * 0.15})`,
                    }}
                    title={`${dimension} - ${skillMatrix.stages[j]}: Level ${value}/5`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-green-400 font-bold">
                      {value}
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-4 text-green-400 font-mono text-xs">
            <span className="text-pink-500">&gt;</span> suggested_focus:{" "}
            <span className="text-pink-400">Architecture::Application</span>{" "}
            -&gt; next_level
          </div>
        </div>
      </div>
    );
  };

  const renderKnowledgeNetwork = () => {
    // This is a simplified visualization - in a real implementation,
    // you would use a library like D3 for proper force-directed graph layout
    return (
      <div className="p-4">
        <div className="text-green-400 text-xl font-mono mb-3">
          DIGITAL_CORTEX::ARCHIVE
        </div>
        <div className="bg-gray-900 p-4 border border-green-400 rounded h-64 relative overflow-hidden">
          {/* Simplistic network visualization */}
          <div className="absolute inset-0">
            {knowledgeNodes.map((node) => (
              <React.Fragment key={node.id}>
                {node.connections.map((connId) => {
                  const connectedNode = knowledgeNodes.find(
                    (n) => n.id === connId,
                  );
                  if (connectedNode) {
                    return (
                      <div
                        key={`conn-${node.id}-${connId}`}
                        className="absolute"
                        style={{
                          height: "1px",
                          width: "100px", // Dummy width
                          background:
                            "linear-gradient(90deg, rgba(250, 80, 250, 0.4), rgba(80, 250, 123, 0.4))",
                          top: `${20 + node.id * 15}px`,
                          left: `${30 + node.id * 25}px`,
                          transform: `rotate(${(node.id * connId) % 360}deg)`,
                          transformOrigin: "0 0",
                          boxShadow: "0 0 5px rgba(250, 80, 250, 0.6)",
                        }}
                      />
                    );
                  }
                  return null;
                })}
              </React.Fragment>
            ))}

            {knowledgeNodes.map((node) => (
              <div
                key={node.id}
                className="absolute rounded-full cursor-pointer"
                style={{
                  height: `${node.size}px`,
                  width: `${node.size}px`,
                  backgroundColor: "rgba(80, 250, 123, 0.2)",
                  border: "1px solid rgba(80, 250, 123, 0.6)",
                  top: `${20 + node.id * 15}px`,
                  left: `${30 + node.id * 25}px`,
                  boxShadow: `0 0 ${node.size / 2}px rgba(80, 250, 123, 0.4)`,
                  zIndex: 10,
                }}
                title={node.name}
              >
                <div
                  className="absolute text-xs text-green-400 font-mono whitespace-nowrap"
                  style={{
                    top: `${node.size / 2}px`,
                    left: `${node.size + 5}px`,
                  }}
                >
                  {node.name}
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-2 left-2 right-2 bg-gray-900 bg-opacity-80 p-2 border border-green-500 font-mono text-xs">
            <div className="text-pink-500">
              &gt; query neural_archive --topic="react hooks" --depth=2
            </div>
            <div className="text-green-400 mt-1">
              Found 3 connected nodes with 5 memory fragments
            </div>
          </div>
        </div>

        {/* Memory fragments section */}
        <div className="mt-4 bg-gray-900 p-2 border border-pink-400 rounded">
          <div className="text-pink-400 text-sm font-mono mb-2">
            MEMORY_FRAGMENTS::
          </div>
          <div className="space-y-2">
            {learningFragments.map((fragment) => (
              <div
                key={fragment.id}
                className="p-2 bg-gray-800 border border-pink-400 rounded text-xs font-mono"
              >
                <div className="flex justify-between">
                  <span className="text-green-400">{fragment.topic}</span>
                  <span
                    className={`text-${fragment.importance === "high" ? "pink" : "green"}-300`}
                  >
                    {fragment.lastAccessed}
                  </span>
                </div>
                <div className="flex mt-1 space-x-2">
                  <div
                    className={`px-1 text-xs rounded bg-opacity-30 ${
                      fragment.importance === "high"
                        ? "bg-pink-500 text-pink-300"
                        : "bg-green-500 text-green-300"
                    }`}
                  >
                    {fragment.importance}
                  </div>
                  <div className="text-green-300 cursor-pointer hover:text-pink-300">
                    access
                  </div>
                  <div className="text-green-300 cursor-pointer hover:text-pink-300">
                    link
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAugmentationPaths = () => {
    return (
      <div className="p-4">
        <div className="text-green-400 text-xl font-mono mb-3">
          AUGMENTATION::PATHS
        </div>
        <div className="bg-gray-900 p-4 border border-green-400 rounded">
          <div className="space-y-4">
            {augmentations.map((aug, i) => (
              <div key={i} className="border border-pink-500 p-3 rounded">
                <div className="flex justify-between items-center">
                  <div className="text-pink-400 font-mono">{aug.path}</div>
                  <div className="text-green-400 font-mono text-sm">
                    LVL {aug.level}
                  </div>
                </div>
                <div className="mt-2 h-2 bg-gray-800 rounded overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-pink-500"
                    style={{ width: `${aug.progress}%` }}
                  ></div>
                </div>
                <div className="mt-2 flex justify-between text-xs font-mono">
                  <div className="text-green-300">
                    {aug.progress}% to level {aug.level + 1}
                  </div>
                  <div className="text-pink-300">{aug.nextMilestone}</div>
                </div>

                {/* Suggested resources */}
                <div className="mt-3 border-t border-gray-700 pt-2">
                  <div className="text-xs text-green-400 font-mono">
                    AVAILABLE_DATA_FRAGMENTS::
                  </div>
                  <div className="mt-1 flex space-x-2">
                    <div className="px-2 py-1 bg-gray-800 rounded border border-green-500 text-xs text-green-300 cursor-pointer">
                      Fragment_01
                    </div>
                    <div className="px-2 py-1 bg-gray-800 rounded border border-pink-500 text-xs text-pink-300 cursor-pointer">
                      Fragment_02
                    </div>
                    <div className="px-2 py-1 bg-gray-800 rounded border border-green-500 text-xs text-green-300 cursor-pointer">
                      Fragment_03
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 text-green-500 p-1 font-mono h-full">
      <div className="flex justify-between items-center mb-4 border-b border-green-500 pb-2">
        <div className="text-2xl font-bold text-green-400 tracking-wider">
          NEURAL::DASHBOARD_
        </div>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded text-sm ${activeSection === "matrix" ? "bg-green-500 text-black" : "border border-green-500"}`}
            onClick={() => setActiveSection("matrix")}
          >
            Growth Matrix
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${activeSection === "knowledge" ? "bg-green-500 text-black" : "border border-green-500"}`}
            onClick={() => setActiveSection("knowledge")}
          >
            Neural Archive
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${activeSection === "augmentation" ? "bg-green-500 text-black" : "border border-green-500"}`}
            onClick={() => setActiveSection("augmentation")}
          >
            Augmentation
          </button>
        </div>
      </div>

      {activeSection === "matrix" && renderSkillMatrix()}
      {activeSection === "knowledge" && renderKnowledgeNetwork()}
      {activeSection === "augmentation" && renderAugmentationPaths()}

      <div className="mt-4 border-t border-green-500 pt-2 text-xs text-green-300">
        <div className="flex justify-between">
          <div>SYSTEM::ONLINE</div>
          <div>NEURAL_ENHANCEMENT::ACTIVE</div>
          <div>UPTIME: 4H 39M</div>
        </div>
      </div>
    </div>
  );
};

export default NeuralDevDashboard;
