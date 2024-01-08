import { type TChildren } from "@/lib/types";

export default function Container({ children }: TChildren) {
  return <div className="container">{children}</div>;
}
