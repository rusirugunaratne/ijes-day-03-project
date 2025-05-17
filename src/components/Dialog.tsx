import React from "react";

interface DialogProps {
    title: string
    children: React.ReactNode
    isDialogOpen: boolean
}

const Dialog = ({title, children, isDialogOpen}: DialogProps) => {

    if(!isDialogOpen)
        return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-10">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Dialog;
