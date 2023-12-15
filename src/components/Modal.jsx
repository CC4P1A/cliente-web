import { FaPlus } from 'react-icons/fa';

const Modal = ({ children, isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
			<div className="relative w-full ml-72 max-w-[600px] bg-white p-4 rounded-md shadow-md">
				<button onClick={onClose} className="absolute top-2 right-2 text-2xl p-2 text-gray-800">
					<FaPlus size={20} className="rotate-45" />
				</button>
				<div className="mt-4 p-2">{children}</div>
			</div>
		</div>
	);
};

export default Modal;