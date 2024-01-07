import { type TChildren } from "@/lib/types";

export default function Sidebar({ children }: TChildren) {
  return <div className="sidebar">{children}</div>;
}
