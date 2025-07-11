import React, { useState } from "react";
import Button from "../button";
import NicknamePopover from ".";

const DEFAULT_ADDRESS =
  "0x5e6DaAD1BE117e26590F9eEcD509336ABFBe5966";

export default {
  title: "Components/UI/NicknamePopover",
  argTypes: {
    address: {
      control: { type: "text" },
      name: "Address",
    },
    onClosePopover: { action: true },
    onAdd: { action: true },
    onOpenPopover: { action: true },
  },
  args: {
    address:
      arguments.length > 0 && typeof arguments[0] === "object"
        ? arguments[0].address || DEFAULT_ADDRESS
        : DEFAULT_ADDRESS,
  },
};

export const DefaultStory = ({ address, ...rest }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => rest.onOpenPopover()} disabled={open}>
        Open Nickname Popover
      </Button>
      {open && (
        <NicknamePopover
          address={address}
          onClose={() => rest.onClosePopover()}
          onAdd={rest.onAdd}
        />
      )}
    </>
  );
};
DefaultStory.storyName = "Default";
