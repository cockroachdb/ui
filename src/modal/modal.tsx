import React from "react";
import AntModal from "antd/lib/modal";
import { Button } from "../button";
import { Text, TextTypes } from "../text";
import "./modal.module.scss";

export interface ModalProps {
  title?: string;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  visible: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  onOk,
  onCancel,
  okText,
  cancelText,
  visible,
  title,
}) => {
  return (
    <AntModal
      title={title && <Text textType={TextTypes.Heading3}>{title}</Text>}
      className="crl-modal"
      visible={visible}
      closeIcon={
        <div className="crl-modal__close-icon" onClick={onCancel}>
          &times;
        </div>
      }
      footer={[
        <Button onClick={onCancel} type="secondary" key="cancelButton">
          {cancelText}
        </Button>,
        <Button onClick={onOk} type="primary" key="okButton">
          {okText}
        </Button>,
      ]}
    >
      {children}
    </AntModal>
  );
};
