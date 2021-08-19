import * as React from "react";
type Props = {
  size?: number | string;
  color?: string;
};

function NanoSAltMedium({ size = 16, color = "currentColor" }: Props): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.9281 19.6559L5.18414 9.88791L8.49614 6.59991L18.2401 16.3439C18.8161 16.8959 19.0321 17.4959 19.0321 18.0959C19.0321 19.4159 18.0001 20.4479 16.6801 20.4479C16.0801 20.4479 15.4801 20.2079 14.9281 19.6559ZM2.64014 9.88791L13.0321 20.3039V21.8399H20.4001V11.8319H21.3601V9.40791H20.4001V6.71991H21.3601V4.29591H20.4001V2.15991H13.2001V8.75991L8.49614 4.05591L2.64014 9.88791ZM15.4081 18.0959C15.4081 18.7679 15.9601 19.3679 16.6801 19.3679C17.3761 19.3679 17.9281 18.7679 17.9281 18.0959C17.9281 17.3999 17.3761 16.8479 16.6801 16.8479C15.9601 16.8479 15.4081 17.3999 15.4081 18.0959Z"
        fill={color}
      />
    </svg>
  );
}

export default NanoSAltMedium;
