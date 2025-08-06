import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { CircleAlert } from "lucide-react";

const DialogRevisionWarning = ({open,setOpen}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Revision Policy</DialogTitle>
          <div className="bg-orange-50 border-l-4 p-3 border-yellow-500 my-4 mx-3 w-full text-orange-700 flex gap-2">
            <div>
            <CircleAlert  className="text-orange-700 h-5 w-5" />

            </div>
            <div className="flex flex-col gap-3">
              <p className="text-orange-800 font-bold">
                Important Notice : Revision Policy
              </p>
              <p className="text-sm">
                Please be advised that you will only have 5 days after work
                submission to request any revisions. After this 5-day period,
                the work will be automatically considered complete and payment
                will be released to the freelancer. Please note that no
                compensation or refunds will be available after this period (0%
                of your payment will be returnable).
              </p>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogRevisionWarning;
