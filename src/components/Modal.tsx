import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;

  return (
    <div style={OVERLAY_STYLE}>
      <div style={MODAL_STYLE}>{children}</div>
    </div>
  );
};

const OVERLAY_STYLE: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const MODAL_STYLE: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '50px',
  width: '300px',
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export default Modal;
