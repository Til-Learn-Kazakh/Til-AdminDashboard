"use client";

import InputGroup from "@/components/FormElements/InputGroup";
import { Button } from "@/core/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/core/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type DialogProps = {
  isOpen: boolean;
  toggleOpen: () => void;
};

type Section = {
  id: number;
  name: string;
};

interface UpdateSectionDialogProps extends DialogProps {
  section: Section;
}

const schema = z.object({
  name: z.string().min(1, { message: "Section name is required" }),
});

type FormType = z.infer<typeof schema>;

export function UpdateSectionDialog({
  isOpen,
  toggleOpen,
  section,
}: UpdateSectionDialogProps) {
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: section.name,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = (values: FormType) => {
    console.log("Updated Section:", values);
    toggleOpen();
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent className="bg-white dark:bg-gray-dark">
        <DialogHeader>
          <DialogTitle>Update Section</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-5"
        >
          <InputGroup
            label="Section Name"
            type="text"
            placeholder="Enter section name"
            name="name"
            control={control}
            error={errors.name?.message}
          />

          <Button
            type="submit"
            className="flex items-center justify-center rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
          >
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
