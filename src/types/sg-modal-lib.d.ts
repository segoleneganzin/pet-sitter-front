declare module 'sg-modal-lib' {
  export interface ModalProps {
    isOpen: boolean;
    toggleModal: () => void;
    infos?: {
      title?: string;
      btnText?: string;
    };
    children: React.ReactNode;
    styleTheme?: string;
  }

  export const Modal: React.FC<ModalProps>;
}
