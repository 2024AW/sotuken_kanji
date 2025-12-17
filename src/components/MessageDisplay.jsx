import React from "react";
import "../styles.css";

export default function MessageDisplay({ message, type }) {
  if (!message) return null;

  let className = "message-default";
  if (type === "warning") className = "message-warning";
  else if (type === "success") className = "message-success";
  else if (type === "error") className = "message-error";
  else if (type === "info") className = "message-info";
  else if (type === "near") className = "message-near"; // おしい判定

  return <div className={className}>{message}</div>;
}
