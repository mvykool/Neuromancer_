export interface LineHighlight {
  text: string;
  type: "status" | "error" | "warning" | "prompt" | "success" | "highlight";
  highlight?: string[];
  password?: string;
  passwordBracket?: string[];
  percentage?: string[];
  visible?: boolean;
  id?: number;
}

export interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

export interface FileType {
  type: string;
  duration: number;
  name?: string;
  color?: string;
}

export interface CodingData {
  total_duration: number;
  file_types: FileType[];
}
