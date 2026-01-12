import Modal from './Modal';
import PrimaryButton from './PrimaryButton';
import DangerButton from './DangerButton';

export default function ConfirmDeleteModal({ show, onClose, onConfirm, title = 'Confirm Delete', message = 'Are you sure you want to delete this item? This action cannot be undone.' }) {
    return (
        <Modal
            show={show}
            onClose={onClose}
            title={title}
            maxWidth="max-w-md"
        >
            <div className="space-y-4">
                <p className="text-sm text-gray-600">
                    {message}
                </p>
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                    <DangerButton onClick={onConfirm}>
                        Delete
                    </DangerButton>
                </div>
            </div>
        </Modal>
    );
}
