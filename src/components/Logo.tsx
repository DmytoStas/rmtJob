import { Icon } from "@/components";

export default function Logo() {
  return (
    <a href="/rmtJob/" className="logo">
      <Icon id="logo" className="logo__icon" />
      rmt<i className="logo__accent">Job</i>
    </a>
  );
}
