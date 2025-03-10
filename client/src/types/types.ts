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
