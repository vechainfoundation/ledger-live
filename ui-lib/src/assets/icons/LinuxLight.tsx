import * as React from "react";
type Props = {
  size?: number | string;
  color?: string;
};

function LinuxLight({ size = 16, color = "currentColor" }: Props): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.8039 22.32C16.6679 22.32 17.4839 21.792 17.9879 21.12C18.5879 20.352 20.5799 19.992 20.5799 19.008C20.5799 18.528 20.1959 18.192 19.9319 17.808C19.5719 17.376 19.7399 16.608 19.2119 16.152C19.1159 16.056 18.9719 15.984 18.8759 15.912C18.9719 15.528 19.0439 15.096 19.0439 14.688C19.0439 11.112 15.4919 9.52799 15.4919 6.93599V6.16799C15.4919 3.98399 15.1319 1.67999 12.4199 1.67999C10.0679 1.67999 9.20392 2.99999 9.20392 5.20799C9.20392 5.83199 9.29992 6.43199 9.29992 7.03199C9.29992 10.032 5.36392 11.952 5.77192 15.624C5.53192 15.888 5.33992 16.2 5.09992 16.464C4.61992 16.944 3.51592 16.728 3.51592 17.952C3.51592 18.288 3.65992 18.624 3.65992 18.984C3.65992 19.344 3.41992 19.704 3.41992 20.112C3.41992 20.616 3.73192 20.952 4.21192 21.072C5.05192 21.312 5.93992 21.192 6.75592 21.6C7.33192 21.888 7.90792 22.08 8.53192 22.08C9.13192 22.08 10.0199 21.792 10.1879 21.12C10.8359 21.048 11.4359 20.832 12.0839 20.832C12.7559 20.832 13.4279 21.048 14.1239 21C14.3639 21.816 14.9399 22.32 15.8039 22.32ZM3.92392 20.088C3.92392 19.704 4.11592 19.392 4.11592 18.984C4.11592 18.624 3.99592 18.288 3.99592 17.928C3.99592 17.808 4.01992 17.712 4.06792 17.616C4.33192 17.136 5.05192 17.184 5.43592 16.8C5.60392 16.632 5.74792 16.392 5.91592 16.2C6.08392 16.008 6.15592 15.888 6.44392 15.84C6.92392 15.84 7.16392 16.032 7.45192 16.44C7.76392 16.872 7.97992 17.376 8.21992 17.832C8.41192 18.192 8.67592 18.528 8.91592 18.84C9.22792 19.296 9.85192 19.92 9.85192 20.496C9.85192 21.192 9.25192 21.6 8.57992 21.6C8.02792 21.6 7.49992 21.432 6.97192 21.192C6.41992 20.904 5.77192 20.808 5.14792 20.736C4.83592 20.688 4.16392 20.664 3.97192 20.376C3.92392 20.28 3.92392 20.184 3.92392 20.088ZM7.09192 14.232C7.09192 13.176 7.71592 11.976 8.26792 11.088C7.97992 12.12 7.33192 12.624 7.33192 13.848C7.33192 14.352 7.49992 14.832 7.78792 15.216C7.85992 12.72 9.70792 10.776 9.89992 8.30399C10.3079 8.68799 10.9319 9.16799 11.5319 9.16799C12.0839 9.16799 13.5239 8.37599 13.9319 7.96799C14.2679 9.26399 14.7719 10.584 15.3959 11.76C15.8279 12.576 16.1639 13.44 16.3319 14.352C16.4999 14.328 16.6199 14.376 16.7639 14.4C16.8839 14.112 16.9319 13.8 16.9319 13.512C16.9319 12.12 15.7319 10.824 15.7319 10.776C15.7319 10.776 15.7079 10.752 15.7319 10.728C16.5479 11.448 17.2199 12.72 17.2199 13.824C17.2199 14.064 17.2199 14.28 17.1479 14.52C17.5799 14.616 18.4439 15.216 18.4439 15.72L18.4199 15.84L18.2519 15.816L18.2759 15.72C18.2759 15.12 16.8839 14.664 16.3799 14.664C16.0439 14.664 15.8519 14.976 15.8039 15.264L15.5639 15.384H15.5399C14.6759 15.864 14.6999 17.184 14.6519 18.072C14.6279 18.384 14.4599 19.008 14.3399 19.344C13.5959 19.8 12.7319 20.136 11.8439 20.136C11.2199 20.136 10.5959 19.968 10.0679 19.632C9.87592 19.32 9.70792 19.008 9.44392 18.744C9.75592 18.672 10.0199 18.552 10.0199 18.192C10.0199 16.584 7.09192 16.272 7.09192 14.232ZM9.65992 5.75999C9.65992 5.35199 9.87592 4.75199 10.3319 4.75199C10.8839 4.75199 11.1239 5.49599 11.1239 5.92799V6.02399C10.9559 6.04799 10.8119 6.11999 10.6919 6.19199C10.6919 5.99999 10.6199 5.49599 10.3079 5.49599C10.1159 5.49599 10.0199 5.83199 10.0199 5.99999C10.0199 6.19199 10.0679 6.43199 10.2119 6.59999C10.1639 6.62399 10.0199 6.74399 9.94792 6.79199C9.70792 6.50399 9.65992 6.11999 9.65992 5.75999ZM9.68392 7.51199C9.68392 7.24799 10.3799 6.79199 10.4279 6.81599C10.6919 6.52799 11.0279 6.26399 11.5079 6.26399C11.8919 6.26399 13.8359 7.00799 13.8359 7.39199C13.8359 7.89599 13.3319 8.13599 12.9239 8.27999C12.3719 8.49599 12.1799 8.87999 11.5079 8.87999C11.0519 8.87999 9.68392 7.96799 9.68392 7.51199ZM9.85192 7.58399C10.3559 7.84799 10.8599 8.37599 11.3879 8.37599C12.2279 8.37599 13.1879 7.51199 13.4999 7.51199L13.4759 7.34399C13.0439 7.34399 12.2519 8.18399 11.3639 8.18399C10.9319 8.18399 10.4039 7.63199 9.85192 7.36799V7.58399ZM11.8679 5.99999C11.8679 5.39999 12.1079 4.53599 12.8519 4.53599C13.4999 4.53599 13.9079 5.23199 13.9079 5.80799C13.9079 6.14399 13.8119 6.47999 13.6199 6.74399C13.4519 6.71999 13.2839 6.59999 13.1159 6.55199C13.2119 6.38399 13.2359 6.16799 13.2359 5.97599C13.2359 5.71199 13.1159 5.32799 12.7799 5.32799C12.3719 5.32799 12.3239 5.87999 12.3239 6.19199C12.1559 6.09599 12.0119 6.02399 11.8679 5.99999ZM14.5559 20.616C14.5559 19.776 15.0839 18.96 15.1319 18.072C15.1319 17.424 15.1799 16.488 15.5639 15.936C15.6599 15.888 15.7319 15.84 15.7799 15.792C15.9239 16.296 16.0919 16.872 16.7399 16.872C17.1479 16.872 17.6999 16.608 17.9639 16.32H18.1799C18.3479 16.32 18.5399 16.32 18.7079 16.392C18.7799 16.392 18.8519 16.44 18.8999 16.488C19.2839 16.752 19.1879 17.712 19.5719 18.144C19.7879 18.384 20.0999 18.696 20.0999 19.032C20.0999 19.416 18.1319 20.208 17.6039 20.856C17.1719 21.384 16.5479 21.84 15.8279 21.84C15.1319 21.84 14.5559 21.336 14.5559 20.616Z"
        fill={color}
      />
    </svg>
  );
}

export default LinuxLight;
