import React, { useState } from "react";
import Button from "@/components/Button";
import successImage from "@/assets/icons/client-upload-success.svg";

interface Props {
  onClose: () => void;
}

const ChangeAddress: React.FC<Props> = ({ onClose }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSave = () => {
    setIsSaved(true);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleClose = () => {
    onClose();
    setIsSaved(false);
  };

  return (
    <div className="relative flex flex-col h-full">
      {isSaved && (
        <div className="absolute inset-0 flex justify-center items-center z-0">
          <img
            src={successImage}
            alt="Success"
            className="w-40 h-40 object-contain"
          />
        </div>
      )}

      {!isSaved && (
        <div className="flex-1 flex flex-col justify-top z-10">
          <div className="relative mb-6">
            <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative mb-6">
            <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative mb-6">
            <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500">
              Postal Code
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      <div className="flex justify-between bg-[var(--background-alternate)] -m-5 p-5 md:rounded-bl-[50px] z-20 mt-auto">
        {!isSaved ? (
          <>
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
          </>
        ) : (
          <Button
            onClick={handleClose}
            className="w-full py-4"
            buttonColor="regularButton"
            textColor="white"
            width="98%"
          >
            Close
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChangeAddress;
