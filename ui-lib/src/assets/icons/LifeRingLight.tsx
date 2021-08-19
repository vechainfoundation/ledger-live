import * as React from "react";
type Props = {
  size?: number | string;
  color?: string;
};

function LifeRingLight({ size = 16, color = "currentColor" }: Props): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9999 14.784C10.4639 14.784 9.21588 13.536 9.21588 12C9.21588 10.44 10.4639 9.19201 11.9999 9.19201C13.5599 9.19201 14.8079 10.44 14.8079 12C14.8079 13.536 13.5599 14.784 11.9999 14.784ZM2.87988 12C2.87988 17.088 6.91188 21.12 11.9999 21.12C17.1119 21.12 21.1199 16.968 21.1199 12C21.1199 6.912 17.0879 2.88 11.9999 2.88C6.91188 2.88 2.87988 6.912 2.87988 12ZM4.07988 12C4.07988 10.008 4.77588 8.184 5.97588 6.816L8.87988 9.72001C8.39988 10.368 8.13588 11.136 8.13588 12C8.13588 12.864 8.39988 13.632 8.87988 14.28L5.97588 17.184C4.77588 15.816 4.07988 13.992 4.07988 12ZM6.81588 18.024L9.71988 15.12C10.3679 15.6 11.1359 15.864 11.9999 15.864C12.8639 15.864 13.6319 15.6 14.2799 15.12L17.1599 18C15.7919 19.2 13.9919 19.92 11.9999 19.92C10.0079 19.92 8.18388 19.224 6.81588 18.024ZM6.81588 5.976C8.18388 4.776 10.0079 4.08 11.9999 4.08C13.9919 4.08 15.8159 4.776 17.1839 5.976L14.2799 8.88C13.6319 8.4 12.8639 8.112 11.9999 8.112C11.1359 8.112 10.3679 8.4 9.71988 8.88L6.81588 5.976ZM15.1199 14.28C15.5999 13.632 15.8879 12.864 15.8879 12C15.8879 11.136 15.5999 10.368 15.1199 9.72001L18.0239 6.816C19.2239 8.184 19.9199 10.008 19.9199 12C19.9199 13.968 19.1999 15.768 17.9999 17.16L15.1199 14.28Z"
        fill={color}
      />
    </svg>
  );
}

export default LifeRingLight;
