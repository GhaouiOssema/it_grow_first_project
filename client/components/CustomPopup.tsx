import React from "react";
import {
    DialogHeader,
    DialogContent,
    Dialog,
    DialogTitle,
    DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { CustomPopupProps } from "@/types";

const CustomPopup: React.FC<CustomPopupProps> = ({
    showPopup,
    setShowPopup,
    title,
    desc,
    setState,
    isError,
}) => {
    return (
        <Dialog open={showPopup} onOpenChange={setShowPopup}>
            <DialogContent className="max-w-sm p-6 bg-white rounded-lg shadow-lg">
                <DialogHeader>
                    <DialogTitle
                        className={`text-xl font-semibold text-center ${
                            isError ? "text-red-500" : "text-green-500"
                        }`}>
                        {title}
                    </DialogTitle>
                    <DialogDescription
                        className={`text-center text-gray-600 mt-2 ${
                            isError ? "text-red-500" : "text-gray-600"
                        }`}>
                        {desc}
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-6 text-center">
                    <Button
                        className={`w-full ${
                            isError
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-green-500 hover:bg-green-600"
                        } text-white`}
                        onClick={() => setState(false)}>
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CustomPopup;
