import React from "react";
import Link from "next/link";

function Notification() {
  return (
    <div>
      <h2>Notification</h2>

      <Link href="/dashboard/archived">Archived</Link>
    </div>
  );
}

export default Notification;
