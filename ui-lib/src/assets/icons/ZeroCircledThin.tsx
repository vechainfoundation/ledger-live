import * as React from "react";
type Props = {
  size?: number | string;
  color?: string;
};

function ZeroCircledThin({ size = 16, color = "currentColor" }: Props): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0001 20.88C16.9681 20.88 20.8801 16.848 20.8801 12C20.8801 7.032 16.9681 3.12 12.0001 3.12C7.03212 3.12 3.12012 7.032 3.12012 12C3.12012 16.968 7.03212 20.88 12.0001 20.88ZM3.60012 12C3.60012 7.296 7.29612 3.6 12.0001 3.6C16.7041 3.6 20.4001 7.296 20.4001 12C20.4001 16.584 16.7041 20.4 12.0001 20.4C7.29612 20.4 3.60012 16.704 3.60012 12ZM8.64012 12.024C8.64012 14.856 9.79212 16.704 12.0001 16.704C14.2081 16.704 15.3601 14.856 15.3601 12.024C15.3601 9.192 14.2321 7.344 12.0001 7.344C9.79212 7.344 8.64012 9.192 8.64012 12.024ZM9.12012 12.048V12C9.12012 9.312 10.0561 7.824 12.0001 7.824C13.0561 7.824 13.8001 8.256 14.2801 9.048L9.48012 14.472C9.24012 13.824 9.12012 13.008 9.12012 12.048ZM9.69612 14.952L14.4961 9.528C14.7601 10.176 14.8801 10.992 14.8801 12V12.048C14.8801 14.736 13.9441 16.224 12.0001 16.224C10.9441 16.224 10.1761 15.792 9.69612 14.952Z"
        fill={color}
      />
    </svg>
  );
}

export default ZeroCircledThin;
