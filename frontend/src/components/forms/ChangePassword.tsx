import React, { useState } from "react";
import Button from "@/components/Button";
import eye from "@/assets/icons/eye.svg";

interface Props {
    onClose: () => void;
}
const ChangePassword: React.FC<Props> = ({ onClose }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSaved, setIsSaved] = useState(false);

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
                        Current Password
                    </label>
                    <input
                        type="password"
                        placeholder="Piripitiflautica"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute right-4 top-3.5 text-blue-500 cursor-pointer text-lg">
                        <img src={eye} alt="Show password" />
                    </span>
                </div>

                <div className="relative mb-6">
                    <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500">
                        New Password
                    </label>
                    <input
                        type="password"
                        placeholder="Watagatapitusberry"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute right-4 top-3.5 text-blue-500 cursor-pointer text-lg">
                        <img src={eye} alt="Show password" />
                    </span>
                </div>

                <div className="relative">
                    <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        placeholder="Watagatapitusberry"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute right-4 top-3.5 text-blue-500 cursor-pointer text-lg">
                        <img src={eye} alt="Show password" />
                    </span>
                </div>
            </div>
            {!isSaved ? (
          <div className="flex justify-between bg-[var(--background-alternate)] -m-5 p-5 rounded-bl-[50px]">
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
          <div className="flex justify-between bg-[var(--background-alternate)] -m-5 rounded-bl-[50px] p-5">
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
        </div>
    );
};

export default ChangePassword;
