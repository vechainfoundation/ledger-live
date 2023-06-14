import React, { useState, useCallback } from "react";
import Modal from "~/renderer/components/Modal";
import Body from "./Body";
import { StepId } from "./types";

export default function WithdrawingModal() {
  const [stepId, setStepId] = useState<StepId>("amount");
  const onHide = useCallback(() => {
    setStepId("amount");
  }, []);
  const onChange = useCallback(id => {
    setStepId(id);
  }, []);
  const isModalLocked = ["device", "confirmation"].includes(stepId);
  return (
    <Modal
      name="MODAL_NEAR_WITHDRAW"
      centered
      onHide={onHide}
      preventBackdropClick={isModalLocked}
      render={({ onClose, data }) => (
        <Body
          account={data.account}
          stepId={stepId}
          onClose={onClose}
          onChangeStepId={onChange}
          validatorAddress={data.validatorAddress}
        />
      )}
    />
  );
}
