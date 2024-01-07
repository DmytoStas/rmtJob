import { JobListItem, Spinner } from "@/components";
import { useActiveId } from "@/lib/hooks";
import { type JobItem } from "@/lib/types";

type JobListProps = { jobItems: JobItem[]; isLoading: boolean };

export default function JobList({ jobItems, isLoading }: JobListProps) {
  const activeId = useActiveId();

  return (
    <>
      {isLoading && <Spinner />}

      <ul className="job-list">
        {!isLoading &&
          jobItems.map((jobItem) => (
            <JobListItem
              key={jobItem.id}
              jobItem={jobItem}
              isActive={jobItem.id === activeId}
            />
          ))}
      </ul>
    </>
  );
}
