import React, { useState } from "react";
import Button from "@/components/Button";

interface Props {
  onClose: () => void;
}

const ChangeEmail: React.FC<Props> = ({ onClose }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const handleSave = () => {
    // your save logic (API call, etc.)
    setIsSaved(true);
  };

  const handleCancel = () => {
    console.log("Cancelled");
    onClose();
  };

  const handleClose = () => {
    console.log("Closed");
    onClose();
    setIsSaved(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-top">
        <div className="relative mb-6">
          <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500">
            New Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <div className="relative">
          <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500">
            Confirm Email
          </label>
          <input
            type="text"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>
      </div>
      <>
        {!isSaved ? (
          <div className="flex justify-between bg-[var(--background-alternate)] -m-6 p-5 rounded-bl-[50px]">
            <Button
              onClick={handleCancel}
              className="py-4 mr-2"
              buttonColor="white"
              textColor="black"
              width="48%"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="py-4 ml-2"
              buttonColor="regularButton"
              textColor="white"
              width="48%"
            >
              Save
            </Button>
          </div>
        ) : (
          <div className="flex justify-between bg-[var(--background-alternate)] -m-6 rounded-bl-[50px] p-5">
            <Button
              onClick={handleClose}
              className="w-full py-4"
              buttonColor="regularButton"
              textColor="white"
              width="98%"
            >
              Close
            </Button>
          </div>
        )}
      </>
    </div>
  );
};

export default ChangeEmail;
