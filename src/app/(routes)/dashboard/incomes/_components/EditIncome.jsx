import React, { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "src/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { db } from "../../../../../../utils/dbConfig";
import { Incomes } from "../../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function EditIncome({ income, onClose, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState(income.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState(income.name);
  const [amount, setAmount] = useState(income.amount);

  const { user } = useUser();

  const handleUpdateIncome = async () => {
    const result = await db
      .update(Incomes)
      .set({
        name: name,
        amount: amount,
        icon: emojiIcon,
      })
      .where(eq(Incomes.id, income.id))
      .returning();

    if (result) {
      refreshData();
      toast("Income updated!");
      onClose();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-lg">
          Edit Income
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Income</DialogTitle>
          <DialogDescription>
            <div className="mt-5">
              <Button
                variant="outline"
                className="text-lg"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
              >
                {emojiIcon}
              </Button>
              <div className="absolute z-20">
                <EmojiPicker
                  open={openEmojiPicker}
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji);
                    setOpenEmojiPicker(false);
                  }}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Income Name</h2>
                <Input
                  placeholder="e.g. Youtube"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Monthly Amount</h2>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              disabled={!(name && amount)}
              onClick={() => handleUpdateIncome()}
              className="mt-5 w-full rounded-full"
            >
              Update Income
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditIncome;