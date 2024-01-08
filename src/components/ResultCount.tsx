type ResultCountProps = { totalResults: number };

export default function ResultCount({ totalResults }: ResultCountProps) {
  return (
    <p className="count">
      <span className="u-bold">{totalResults}</span> results
    </p>
  );
}
