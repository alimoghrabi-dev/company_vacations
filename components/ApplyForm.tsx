"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Combobox } from "./ui/combobox";
import { Input } from "./ui/input";
import { useState } from "react";
import { Loader2, Minus, Plus, SendHorizontal } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  typeId: z.string().min(1, { message: "Type is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  reason: z.string().optional(),
  somethingToSay: z.string().optional(),
  contactEmail: z.string().min(1, { message: "Email is required" }),
});

type ApplyFormProps = {
  email: string | null | undefined;
  options: {
    label: string;
    value: string;
  }[];
};

const ApplyForm = ({ email, options }: ApplyFormProps) => {
  const router = useRouter();

  const [durationInput, setDurationInput] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeId: "",
      phoneNumber: "",
      reason: "",
      somethingToSay: "",
      contactEmail: email!,
    },
  });

  const isReadyToApply =
    form.watch("typeId") &&
    durationInput > 0 &&
    form.watch("phoneNumber") &&
    form.watch("contactEmail");

  const handleInc = () => {
    setDurationInput(durationInput + 1);
  };
  const handleDec = () => {
    setDurationInput(durationInput - 1);

    if (durationInput < 1) {
      setDurationInput(0);
    }
  };

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          typeId: data.typeId,
          duration: durationInput,
          phoneNumber: data.phoneNumber,
          reason: data.reason,
          somethingToSay: data.somethingToSay,
          contactEmail: data.contactEmail,
        }),
      });

      if (response.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[500px] space-y-6">
        <div className="flex items-center gap-x-2.5">
          <FormField
            control={form.control}
            name={"typeId"}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Vacation Type <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Combobox options={options} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem className="flex flex-col">
            <FormLabel>
              Duration{" (in days) "}
              <span className="text-primary">*</span>
            </FormLabel>
            <div className="relative">
              <Input
                type="number"
                value={durationInput}
                readOnly
                className="border-gray-300 focus-visible:ring-0"
              />

              <div className="flex absolute top-[7px] right-0 items-center justify-center px-2 py-1 gap-x-2">
                <button
                  type="button"
                  onClick={handleDec}
                  className="hover:text-gray-700 active:text-primary transition-all">
                  <Minus size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleInc}
                  className="hover:text-gray-700 active:text-primary transition-all">
                  <Plus size={18} />
                </button>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        </div>
        <FormField
          control={form.control}
          name={"reason"}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Textarea
                  rows={2}
                  placeholder="Vacation reason (optional)"
                  className="border-gray-300 transition"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex items-center gap-x-2.5">
          <FormField
            control={form.control}
            name={"phoneNumber"}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Phone Number <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your phone number"
                    className="w-full border-gray-300 transition"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"contactEmail"}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Contact Email <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full border-gray-300 transition"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name={"somethingToSay"}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Something to Say</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="(optional)"
                  className="border-gray-300 transition"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting || !isReadyToApply}
          className="w-full flex items-center gap-x-3">
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Apply
              <SendHorizontal size={20} />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ApplyForm;
