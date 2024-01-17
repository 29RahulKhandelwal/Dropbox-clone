"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { db } from "@/firebase";
import { useToast } from "./ui/use-toast";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { toast as toasthot } from "react-hot-toast";

const RenameModal = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename] =
    useAppStore((state) => [
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
      state.fileId,
      state.filename,
    ]);
  const [input, setInput] = useState("");

  const renameFile = async () => {
    if (!user || !fileId) return;

    try {
      const toastId = toasthot.loading("Renaming...");
      await updateDoc(doc(db, "users", user.id, "files", fileId), {
        filename: input,
      });
      toasthot.success("Your file name has been successfully updated...", {
        id: toastId,
      });
      toast({
        description: "Your file name has been successfully updated.",
      });
      setInput("");
      setIsRenameModalOpen(false);
    } catch (error) {
      console.log(error);
      toasthot.error("Something went wrong, please try again.");
      toast({
        variant: "destructive",
        description: "Something went wrong, please try again.",
      });
    }
  };

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => setIsRenameModalOpen(isOpen)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename the File</DialogTitle>
          <Input
            id="link"
            defaultValue={filename}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                renameFile();
              }
            }}
          />
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant="ghost"
            onClick={() => setIsRenameModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            type="submit"
            size="sm"
            className="px-3 flex-1"
            onClick={() => renameFile()}
          >
            <span className="sr-only">Rename</span>
            <span>Rename</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
