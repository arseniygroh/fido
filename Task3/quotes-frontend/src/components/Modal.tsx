import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({
    isOpen, 
    onClose, 
    children
}: {
    isOpen: boolean, 
    onClose: () => void, 
    children: React.ReactNode
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const dialogNode = dialogRef.current;
        if (!dialogNode) return;

        if (isOpen) {
            dialogNode.showModal();
        } else {
            dialogNode.close();
        }
    }, [isOpen]);

    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;

    return createPortal(
        <dialog 
            ref={dialogRef}
            onCancel={onClose} 
            style={{ padding: '20px', borderRadius: '8px' }}
        >
            {children}
        </dialog>,
        modalRoot
    );
}