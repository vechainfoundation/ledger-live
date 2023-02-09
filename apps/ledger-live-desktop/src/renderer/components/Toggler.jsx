import { useState } from "react";

export default function Toggler(props) {
  const toggleStyle = {
    position: "relative",
    width: "55px",
    height: "30px",
    backgroundColor: "rgb(19, 20, 21)",
    borderRadius: "8px",
    cursor: "pointer",
  };
  const togglerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: "1px",
    borderRadius: "8px",
    width: "30px",
    height: "30px",
    backgroundColor: "rgba(155, 115, 255, 0.6)",
  };
  const togglerStyleActive = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: "1px",
    borderRadius: "8px",
    width: "30px",
    height: "30px",
    backgroundColor: "#2A5284",
  };
  const buttonText = {
    fontSize: "9px",
    lineHeight: "9px",
    color: "white",
  };
  const togglerStyles = [togglerStyle, togglerStyleActive];
  const [curr, setCurr] = useState(0);

  const changeStatus = e => {
    console.log("click");
    if (curr == 0) {
      setCurr(1);
    } else {
      setCurr(0);
    }
  };

  if (props.props.currency.id == "vechain" || props.props.currency.id == "vechainThor")
    return (
      <div id="togglercontainer" style={toggleStyle} onClick={changeStatus}>
        <div id="togglerbg" style={togglerStyles[curr]}>
          <span id="togglertxt" style={buttonText}>
            {curr == 0 ? "VET" : "VTHO"}
          </span>
        </div>
      </div>
    );
  return <></>;
}
