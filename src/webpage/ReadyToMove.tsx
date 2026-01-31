import { useState } from "react"
import Modal from "../functions/Modal";
import ItemModal from "../functions/ItemModal";
import { useNavigate } from "react-router";
export default function ReadyToMove() {
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    return (
        <div>
            <h1 className="text-center mt-25 text-[60px]">Ready to move?</h1>
            <h2 className="text-center text-[30px]">Please pick one </h2>
            <div className="grid grid-cols-2 gap-4 m-10 sm:grid-col-1">
                <div className="p-6 shadow-lg rounded transform transition hover:-translate-y-2 cursor-pointer"
                onClick={() => setOpen(true)}>
                    <h2 className="text-xl font-bold mb-2 text-center">
                        International</h2>
                </div>
                <div className="p-6 shadow-lg rounded transform transition hover:-translate-y-2 cursor-pointer" onClick={() => navigate('/usa')}>
                    <h2 className="text-xl font-bold mb-2 text-center">U.S Citizen</h2>
                </div>
            </div>
            
            <Modal open={open} onClose={() => setOpen(false)}>
                <ItemModal />
            </Modal>
        </div>
    )
}