import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/utils/tailwind";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
const Questions = ({
  fields,
  object,
  setObject,
  onSubmit,
  loading,
  setLoading,
}) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      {Object.values(fields).map((field, index) => (
        <div key={index}>
          {field.input === "toggle" && (
            <>
              <ToggleGroup
                type="multiple"
                className="grid w-full grid-cols-3 gap-2"
              >
                {field.options.map((option, key) => (
                  <ToggleGroupItem
                    key={key}
                    value={option}
                    onClick={() => {
                      setObject({
                        ...object,
                        [field.field]: object[field.field].includes(option)
                          ? object[field.field].filter(
                              (item) => item !== option,
                            )
                          : [...object[field.field], option],
                      });
                    }}
                    className={cn(
                      object[field.field]?.includes(option)
                        ? "!bg-hackathon-tags-teal-bg"
                        : "bg-gray-200",
                      "w-full rounded-xl text-sm",
                    )}
                  >
                    {option}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </>
          )}
          {field.input === "slider" && (
            <div className="flex flex-col gap-2 text-sm">
              <div className="pb-1">
                <Label
                  htmlFor={field.name}
                  className="text-xl font-semibold text-hackathon-green-300"
                >
                  {field.title}
                </Label>
              </div>
              <div className="mb-2 flex justify-between text-xs text-gray-500">
                <p>poor</p> <p>excellent</p>
              </div>
              <Slider
                defaultValue={[object[field.field]?.rating || 0]}
                max={5}
                min={1}
                step={1}
                onValueChange={(value) =>
                  setObject({
                    ...object,
                    [field.field]: {
                      ...(object[field.field] || {}),
                      rating: value[0],
                    },
                  })
                }
              />
              <div className="mb-2 flex justify-between text-xs">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num}>{num}</div>
                ))}
              </div>
              <div className="">
                <Label htmlFor={field.name} className="text-sm">
                  {field.question}
                </Label>
              </div>
              <Textarea
                placeholder="Type your answer here .."
                value={object[field.field]?.comment || ""}
                onChange={(e) =>
                  setObject({
                    ...object,
                    [field.field]: {
                      ...(object[field.field] || {}),
                      comment: e.target.value,
                    },
                  })
                }
                required
                minLength={1}
              />
            </div>
          )}
        </div>
      ))}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={loading}>Submit</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Once you submit, you will not be able to move back to this team.
              Please double check you have all the notes and filled out the
              respective boxes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={() => onSubmit(setLoading, () => {})}
                disabled={loading}
              >
                Confirm
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default Questions;
