import { JobListItem } from "@/components";
import { JobItem } from "@/lib/type";

type JobListProps = { jobItems: JobItem[] };

export default function JobList({ jobItems }: JobListProps) {
  return (
    <ul className="job-list">
      {/* {isLoading && <Spinner />} */}

      {jobItems.map((jobItem) => (
        <JobListItem
          key={jobItem.id}
          jobItem={jobItem}
          // isActive={jobItem.id === activeId}
        />
      ))}
    </ul>
  );
}
