import React, { useEffect, useState } from "react";
import Button from "@/components/Button";

interface Props {
  onClose: () => void;
  tax: string;
}

const ChangeTaxRegime: React.FC<Props> = ({ onClose, tax }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [taxRegime, setTaxRegime] = useState("");

  useEffect(() => {
    setTaxRegime(tax);
  })

  const handleSave = () => {
    console.log("Saved tax Regime:", taxRegime);
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
          <label className="absolute -top-2.5 left-4 bg-white px-1 text-sm text-gray-500">
            Tax Regime
          </label>

          <select
            value={taxRegime}
            onChange={(e) => setTaxRegime(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="" disabled>
              Select your Tax Regime
            </option>
            <option value="english">British Columbia</option>
            <option value="french">Quebec</option>
          </select>
        </div>
      </div>

      <>
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
              disabled={!taxRegime}
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
      </>
    </div>
  );
};

export default ChangeTaxRegime;
