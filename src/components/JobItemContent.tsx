import { BookmarkIcon, EmptyJobContent, Spinner } from "@/components";
import { useActiveId, useExtendedJobItem } from "@/lib/hooks";

export default function JobItemContent() {
  const activeId = useActiveId();
  const { jobItem, isLoading } = useExtendedJobItem(activeId);

  if (isLoading) {
    return (
      <section className="job-details">
        <div>
          <Spinner />;
        </div>
      </section>
    );
  }

  if (!jobItem) {
    return <EmptyJobContent />;
  }

  const {
    id,
    title,
    company,
    description,
    duration,
    salary,
    location,
    badgeLetters,
    daysAgo,
    companyURL,
    coverImgURL,
    qualifications,
    reviews,
  } = jobItem;

  return (
    <section className="job-details">
      <div>
        <img src={coverImgURL} alt="#" />

        <a className="apply-btn" href={companyURL} target="_blank">
          Apply
        </a>

        <section className="job-info">
          <div className="job-info__left">
            <div className="job-info__badge">{badgeLetters}</div>
            <div className="job-info__below-badge">
              <time className="job-info__time">{daysAgo}d</time>

              <BookmarkIcon id={id} />
            </div>
          </div>

          <div className="job-info__right">
            <h2 className="second-heading">{title}</h2>
            <p className="job-info__company">{company}</p>
            <p className="job-info__description">{description}</p>

            <ul className="job-info__extras">
              <li>
                <p className="job-info__extra">
                  <i className="fa-solid fa-clock job-info__extra-icon"></i>
                  {duration}
                </p>
              </li>

              <li>
                <p className="job-info__extra">
                  <i className="fa-solid fa-money-bill job-info__extra-icon"></i>
                  {salary}
                </p>
              </li>

              <li>
                <p className="job-info__extra">
                  <i className="fa-solid fa-location-dot job-info__extra-icon"></i>{" "}
                  {location}
                </p>
              </li>
            </ul>
          </div>
        </section>

        <div className="job-details__other">
          <section className="qualifications">
            <div className="qualifications__left">
              <h4 className="fourth-heading">Qualifications</h4>
              <p className="qualifications__sub-text">
                Other qualifications may apply
              </p>
            </div>

            <ul className="qualifications__list">
              {qualifications.map((qualification) => (
                <li key={qualification} className="qualifications__item">
                  {qualification}
                </li>
              ))}
            </ul>
          </section>

          <section className="reviews">
            <div className="reviews__left">
              <h4 className="fourth-heading">Company reviews</h4>
              <p className="reviews__sub-text">
                Recent things people are saying
              </p>
            </div>

            <ul className="reviews__list">
              {reviews.map((review) => (
                <li key={review} className="reviews__item">
                  {review}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="job-details__footer">
          <p className="job-details__footer-text">
            If possible, please reference that you found the job on{" "}
            <span className="u-bold">rmtJob</span>, we would really appreciate
            it!
          </p>
        </div>
      </div>
    </section>
  );
}
