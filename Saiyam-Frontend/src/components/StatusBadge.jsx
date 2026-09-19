export default function StatusBadge({ status }) {
  const className = status
    ? status.toLowerCase()
    : "";

  return (
    <span className={`status-badge ${className}`}>
      {status}
    </span>
  );
}