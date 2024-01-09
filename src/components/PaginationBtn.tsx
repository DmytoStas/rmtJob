import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationBtnProps = {
  direction: "next" | "previous";
  currentPage: number;
  onClick: () => void;
};

export default function PaginationBtn({
  direction,
  currentPage,

  onClick,
}: PaginationBtnProps) {
  return (
    <button
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "previous" && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}

      {direction === "next" && (
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
