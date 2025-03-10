import { useEffect, useState, useRef, JSX } from "react";
import { outputLines } from "../utils/outputlines";
import { LineHighlight } from "../types";

const LoginView = () => {
  const [visibleLines, setVisibleLines] = useState<LineHighlight[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const terminalRef = useRef<HTMLDivElement | null>(null);

  const formatText = (line: LineHighlight): (string | JSX.Element | null)[] => {
    if (!line) return [null];

    let parts: (string | JSX.Element)[] = [line.text];

    if (line.highlight) {
      line.highlight.forEach((highlight) => {
        parts = parts.flatMap((part) => {
          if (typeof part === "string" && part.includes(highlight)) {
            const splitParts = part.split(highlight);
            const result: (string | JSX.Element)[] = [];
            for (let i = 0; i < splitParts.length; i++) {
              if (i > 0) {
                result.push(
                  <span key={`highlight-${i}`} className="text-fuchsia-500">
                    {highlight}
                  </span>,
                );
              }
              if (splitParts[i]) {
                result.push(splitParts[i]);
              }
            }
            return result;
          }
          return [part];
        });
      });
    }

    // Process password brackets
    if (line.passwordBracket) {
      line.passwordBracket.forEach((pwd) => {
        const bracketText = `[${pwd}]`;
        parts = parts.flatMap((part) => {
          if (typeof part === "string" && part.includes(bracketText)) {
            const splitParts = part.split(bracketText);
            const result: (string | JSX.Element)[] = [];
            for (let i = 0; i < splitParts.length; i++) {
              if (i > 0) {
                result.push(
                  <span key={`pwd-${i}`}>
                    <span className="text-red-500">[</span>
                    <span className="text-white">{pwd}</span>
                    <span className="text-red-500">]</span>
                  </span>,
                );
              }
              if (splitParts[i]) {
                result.push(splitParts[i]);
              }
            }
            return result;
          }
          return [part];
        });
      });
    }

    if (line.percentage) {
      line.percentage.forEach((percent: string) => {
        parts = parts.flatMap((part) => {
          if (typeof part === "string" && part.includes(percent)) {
            const splitParts = part.split(percent);
            const result: (string | JSX.Element)[] = [];
            for (let i = 0; i < splitParts.length; i++) {
              if (i > 0) {
                result.push(
                  <span key={`percent-${i}`} className="text-yellow-300">
                    {percent}
                  </span>,
                );
              }
              if (splitParts[i]) {
                result.push(splitParts[i]);
              }
            }
            return result;
          }
          return [part];
        });
      });
    }

    if (line.password) {
      parts = parts.flatMap((part) => {
        if (
          typeof part === "string" &&
          part.includes(`Sandi:${line.password}`)
        ) {
          const splitParts = part.split(`Sandi:${line.password}`);
          return [
            splitParts[0],
            <>
              Sandi:<span className="text-white">{line.password}</span>
            </>,
            ...splitParts.slice(1),
          ];
        }
        return [part];
      });
    }

    return parts;
  };

  const getLineClass = (type: LineHighlight["type"]): string => {
    switch (type) {
      case "status":
        return "text-green-500";
      case "error":
        return "text-red-500";
      case "warning":
        return "text-yellow-300";
      case "prompt":
        return "text-cyan-400";
      case "success":
        return "text-green-500";
      case "highlight":
        return "text-fuchsia-500";
      default:
        return "text-green-500";
    }
  };

  const addLine = (index: number): void => {
    if (index < outputLines.length) {
      setVisibleLines((prev) => [
        ...prev,
        {
          ...outputLines[index],
          visible: true,
          id: Date.now(),
        } as LineHighlight,
      ]);

      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }

      // Add next line after random delay (100-700ms)
      const typingDelay = Math.floor(Math.random() * 600) + 100;
      setTimeout(() => {
        if (isRunning) {
          addLine(index + 1);
        }
      }, typingDelay);
    }
  };

  // Start animation on component mount
  useEffect(() => {
    addLine(0);
    return () => setIsRunning(false);
  }, []);

  return (
    <>
      <div className="h-screen bg-black">
        <div ref={terminalRef} className="max-h-full overflow-y-hidden">
          {visibleLines.map((line) => (
            <div
              key={line.id}
              className={`${getLineClass(line.type)} opacity-100 transition-opacity duration-200 mb-1 min-h-5 whitespace-pre-wrap`}
            >
              {formatText(line)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LoginView;
