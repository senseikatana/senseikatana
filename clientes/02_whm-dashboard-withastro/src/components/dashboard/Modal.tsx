import { useEffect, useRef, type ReactNode, type SyntheticEvent } from 'react';
import { X } from 'lucide-react';
import { useI18n } from '../../i18n/LocaleProvider';

interface ModalProps {
	title: string;
	onClose: () => void;
	children: ReactNode;
	footer?: ReactNode;
	onSubmit?: (event: SyntheticEvent<HTMLFormElement>) => void;
}

export function Modal({ title, onClose, children, footer, onSubmit }: ModalProps) {
	const { S } = useI18n();
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog || dialog.open) return;

		const previous = document.activeElement as HTMLElement | null;
		dialog.showModal();
		document.body.style.overflow = 'hidden';

		const first = dialog.querySelector<HTMLElement>('input, select, textarea, button');
		(first ?? dialog).focus();

		return () => {
			if (dialog.open) dialog.close();
			document.body.style.overflow = '';
			previous?.focus();
		};
	}, []);

	const onBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
		if (event.target === dialogRef.current) onClose();
	};

	const content = (
		<>
			<div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/50">
				<h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
				<button
					type="button"
					onClick={onClose}
					aria-label={S.close}
					className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-slate-700 dark:hover:text-gray-200"
				>
					<X size={20} />
				</button>
			</div>
			<div className="flex-1 overflow-y-auto p-6">{children}</div>
			{footer && (
				<div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/50">
					{footer}
				</div>
			)}
		</>
	);

	return (
		<dialog
			ref={dialogRef}
			onClose={onClose}
			onClick={onBackdropClick}
			aria-label={title}
			className="m-auto w-[min(92vw,28rem)] rounded-2xl bg-white text-gray-900 shadow-2xl outline-none backdrop:bg-gray-900/60 backdrop:backdrop-blur-sm dark:bg-slate-900 dark:text-gray-100"
		>
			{onSubmit ? (
				<form onSubmit={onSubmit} className="flex max-h-[90vh] flex-col overflow-hidden rounded-2xl">
					{content}
				</form>
			) : (
				<div className="flex max-h-[90vh] flex-col overflow-hidden rounded-2xl">{content}</div>
			)}
		</dialog>
	);
}
