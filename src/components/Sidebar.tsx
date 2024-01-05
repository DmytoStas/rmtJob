import {
  JobList,
  PaginationControls,
  ResultCount,
  SortingControls,
} from "@/components";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div>
        <ResultCount />
        <SortingControls />
      </div>

      <JobList />
      <PaginationControls />
    </div>
  );
}
