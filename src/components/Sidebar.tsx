import { type TChildren } from "@/lib/type";

export default function Sidebar({ children }: TChildren) {
  return <div className="sidebar">{children}</div>;
}
