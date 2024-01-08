import { type TChildren } from "@/lib/types";

export default function Header({ children }: TChildren) {
  return <header className="header">{children}</header>;
}
