type SortingBtnProps = {
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
};

export default function SortingBtn({
  children,
  onClick,
  isActive,
}: SortingBtnProps) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--recent ${
        isActive ? "sorting__button--active" : ""
      }`}
    >
      {children}
    </button>
  );
}
