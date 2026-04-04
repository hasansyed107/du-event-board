import { getEventStatus } from "../utils/eventHelpers";

export default function EventCard({ event, viewMode = "grid" }) {
  const status = getEventStatus(event.date);

  const formattedDate = event.date
    ? new Date(event.date + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date TBD";

  const statusMap = {
    live: "status-badge--live",
    upcoming: "status-badge--upcoming",
    ended: "status-badge--ended",
  };

  if (viewMode === "list") {
    return (
      <article className="event-list-row" id={`event-${event.id}`}>
        <div className="event-list-row__title-wrap">
          {event.url ? (
            <a href={event.url} target="_blank" rel="noopener noreferrer">
              {event.title}
            </a>
          ) : (
            <span>{event.title}</span>
          )}
        </div>

        <div className="event-list-row__right">
          <span>{event.category}</span>

          {status !== "none" && (
            <div className={`status-badge ${statusMap[status]}`}>
              {status === "live" ? "Live" : status}
            </div>
          )}

          <span>{formattedDate}</span>
        </div>
      </article>
    );
  }

  return (
    <article className="event-card" id={`event-${event.id}`}>
      <div className="event-card__header">
        <span className="event-card__category">{event.category}</span>

        {status !== "none" && (
          <div className={`status-badge ${statusMap[status]}`}>
            {status === "live" && <span className="live-dot" />}
            {status === "live" ? "Live Now" : status}
          </div>
        )}
      </div>

      <h2>{event.title}</h2>
      <p>{event.description || "No description available."}</p>

      <div className="event-card__meta">
        <span>📅 {formattedDate}</span>
        <span>🕐 {event.time || "Time TBD"}</span>
        <span>📍 {event.location || "Location TBD"}</span>
      </div>

      {event.tags?.length > 0 && (
        <div>
          {event.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      )}

      {event.url && (
        <a href={event.url} target="_blank" rel="noopener noreferrer">
          Learn more →
        </a>
      )}
    </article>
  );
}
