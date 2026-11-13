// @ts-nocheck -- ported as-is from the original PathshalaX JavaScript source.
import React from 'react';

const paths = {
  home: <><path d="M3.5 11.2 12 4l8.5 7.2" /><path d="M5.5 9.8V20h13V9.8" /><path d="M10 20v-5.5h4V20" /></>,
  learn: <><path d="M3.5 5.5c0-.6.5-1 1-1H11v14.5H4.5c-.6 0-1-.4-1-1z" /><path d="M20.5 5.5c0-.6-.5-1-1-1H13v14.5h6.5c.6 0 1-.4 1-1z" /></>,
  practice: <><path d="M4 20l.9-4.2L16.6 4.1a2.1 2.1 0 0 1 3 3L7.9 19.1z" /><path d="m14.6 6.1 3.3 3.3" /></>,
  revision: <><path d="M20 12a8 8 0 1 1-2.6-5.9" /><path d="M20.2 4v4.8h-4.8" /></>,
  assess: <><rect x="5" y="4.5" width="14" height="16.5" rx="2.4" /><path d="M9.2 4.5v-1h5.6v1" /><path d="m8.8 13.2 2.4 2.4 4.2-4.8" /></>,
  progress: <><path d="M5 20V11" /><path d="M12 20V4" /><path d="M19 20v-7" /><path d="M3 20.5h18" /></>,
  sparkle: <><path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.4l-1.9-5.6L4.5 10.9 10.1 9z" /><path d="M19 3.5v3M17.5 5h3" /></>,
  check: <path d="m5 12.8 4.4 4.4L19 7.4" />,
  close: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  logout: <><path d="M10 4.5H6a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 6 19.5h4" /><path d="M15 8l4 4-4 4" /><path d="M19 12H9.5" /></>,
  link: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1" /></>,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r=".8" /></>,
  bolt: <path d="M13 3 5.5 13.5H11L10 21l7.5-10.5H12z" />,
  trophy: <><path d="M8 4.5h8v5a4 4 0 0 1-8 0z" /><path d="M8 6H4.5v1.5A3.5 3.5 0 0 0 8 11" /><path d="M16 6h3.5v1.5A3.5 3.5 0 0 1 16 11" /><path d="M12 13.5V17" /><path d="M8.5 20.5h7M10 17h4" /></>,
  play: <><rect x="2.5" y="7" width="19" height="11" rx="5.5" /><path d="M7.5 10.5v4M5.5 12.5h4" /><circle cx="15.5" cy="11.5" r=".9" /><circle cx="17.8" cy="13.8" r=".9" /></>,
  trash: <><path d="M4.5 7h15" /><path d="M9.5 7V4.5h5V7" /><path d="M6.5 7l.8 12.5h9.4L17.5 7" /></>
};

export default function Icon({ name, size = 20, className = '', strokeWidth = 2 }) {
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name] || null}
    </svg>
  );
}
