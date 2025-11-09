import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import TextArea from "@components/TextArea";

interface Props {
  onClose: () => void;
  incCategories: string[];
}

const IncomeCategories: React.FC<Props> = ({ onClose, incCategories }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [categories, setCategories] = useState("");

  // Initialize categories with comma-separated values
  useEffect(() => {
    if (incCategories.length > 0) {
      setCategories(incCategories.join(", "));
    }
  }, [incCategories]);

  const handleSave = () => {
    console.log("Saved categories:", categories);
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
          <TextArea
            id="categories"
            label="Edit Categories"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            className="p-5 rounded-lg border-2 border-gray-300 w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            color="text-gray-500 bg-white"
          />
          <span>Separate the categories with “,”</span>
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
            >
              Save
            </Button>
          </div>
        ) : (
          <div className="flex justify-between bg-[var(--background-alternate)] -m-5 md:rounded-bl-[50px] p-5">
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

export default IncomeCategories;
