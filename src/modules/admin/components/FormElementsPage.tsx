"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { Checkbox } from "../../../components/FormElements/checkbox";
import DatePickerOne from "../../../components/FormElements/DatePicker/DatePickerOne";
import DatePickerTwo from "../../../components/FormElements/DatePicker/DatePickerTwo";
import InputGroup from "../../../components/FormElements/InputGroup";
import { TextAreaGroup } from "../../../components/FormElements/InputGroup/text-area";
import MultiSelect from "../../../components/FormElements/MultiSelect";
import { RadioInput } from "../../../components/FormElements/radio";
import { Select } from "../../../components/FormElements/select";
import { Switch } from "../../../components/FormElements/switch";
import { ShowcaseSection } from "../../../components/Layouts/showcase-section";

const schema = z.object({
  defaultInput: z.string().min(1, "Required"),
  textarea: z.string().min(1, "Required"),
  country: z.string(),
  checkbox: z.boolean().optional(),
  radio: z.string().optional(),
});

type FormType = z.infer<typeof schema>;

export default function FormElementsPage() {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      defaultInput: "",
      textarea: "",
      country: "USA",
    },
  });

  const onSubmit = (data: FormType) => {
    console.log("Form Data →", data);
  };

  return (
    <>
      <Breadcrumb pageName="Form Elements" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid grid-cols-1 gap-9 sm:grid-cols-2"
      >
        <div className="flex flex-col gap-9">
          <ShowcaseSection title="Input Fields" className="space-y-5.5 !p-6.5">
            <InputGroup
              label="Default input"
              placeholder="Default input text"
              type="text"
              name="defaultInput"
              control={control}
              error={errors.defaultInput?.message}
            />
            <InputGroup
              label="Disabled input"
              placeholder="Disabled input text"
              type="text"
              disabled
              name="disabledInput"
              control={control}
            />
          </ShowcaseSection>

          <ShowcaseSection
            title="Toggle switch input"
            className="space-y-5.5 !p-6.5"
          >
            <Switch />
            <Switch withIcon />
          </ShowcaseSection>

          <ShowcaseSection title="Time and date" className="space-y-5.5 !p-6.5">
            <DatePickerOne />
            <DatePickerTwo />
          </ShowcaseSection>

          <ShowcaseSection title="File upload" className="space-y-5.5 !p-6.5">
            <InputGroup
              type="file"
              fileStyleVariant="style1"
              label="Attach file"
              placeholder="Attach file"
              name="file"
              control={control}
            />
          </ShowcaseSection>
        </div>

        <div className="flex flex-col gap-9">
          <ShowcaseSection title="Textarea Fields" className="space-y-6 !p-6.5">
            <TextAreaGroup
              label="Textarea"
              placeholder="Type something..."
              name="textarea"
              control={control}
              error={errors.textarea?.message}
            />
          </ShowcaseSection>

          <ShowcaseSection title="Select input" className="space-y-5.5 !p-6.5">
            <Select
              label="Parent section"
              placeholder="Select parent section"
              items={[
                { label: "Сәлемдесу", value: "1" },
                { label: "Сан есімдер", value: "2" },
                { label: "Құрмет сөздері", value: "3" },
              ]}
            />
            <MultiSelect id="multiSelect" />
          </ShowcaseSection>

          <ShowcaseSection
            title="Checkbox and radio"
            className="space-y-5.5 !p-6.5"
          >
            <Checkbox label="Agree to terms" {...register("checkbox")} />
            <RadioInput label="Option A" value="A" {...register("radio")} />
            <RadioInput
              label="Option B"
              value="B"
              variant="circle"
              {...register("radio")}
            />
          </ShowcaseSection>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
