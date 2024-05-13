import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Favorite = ({ user_id, text_id, isLoading, geezText, amharicText, onDelete }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md flex flex-col items-between justify-center mb-4">
      <div>
        <p className="text-lg font-semibold">Geez Text:</p>
        <p className="text-gray-700">{geezText}</p>
        <p className="text-lg font-semibold mt-2">Amharic Text:</p>
        <p className="text-gray-700">{amharicText}</p>
      </div>
      <div className="flex  w-full items-center justify-end">
        <button
          className="xflex xitems-end xjustify-end xbg-black xtext-red-500 xhover:text-red-700 xfocus:outline-none bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md "
          // onClick={() => onDelete({text_id})}
          onClick={handleOpenModal}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this favorite?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={()=> onDelete({ user_id, text_id })} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Favorite;
