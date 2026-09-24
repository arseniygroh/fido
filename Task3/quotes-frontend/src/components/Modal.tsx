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
            className="m-auto w-full max-w-lg p-6 bg-white border-0 rounded-2xl shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
        >
            {children}
        </dialog>,
        modalRoot
    );
}