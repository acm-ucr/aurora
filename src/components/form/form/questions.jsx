import Select from "@/components/select";
import Checkbox from "@/components/checkbox";
import { Textarea } from "@/components/ui/textarea";
import Upload from "@/components/form/form/upload";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";
import data from "@/data/config";
import Terms from "./terms";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Questions = ({
  fields,
  object,
  setObject,
  onSubmit,
  loading,
  setLoading,
  setState,
  packet = false,
}) => {
  const handleClick = (option, field) => {
    setObject({
      ...object,
      [field]: option,
    });
  };

  return (
    <div className="flex w-full flex-col gap-5">
      {Object.values(fields).map((field, index) => (
        <div key={index}>
          {field.input === "description" &&
            field.texts.map((description, index) => (
              <div key={index}>
                <p>{description}</p> <br />
                {index === field.texts.length - 1 && (
                  <p>
                    Fields with
                    <span className="text-red-500"> * </span>
                    are required.
                  </p>
                )}
              </div>
            ))}
          {field.input === "input" && (
            <>
              <div className="pb-1">
                <Label htmlFor={field.name} className="font-semibold">
                  {field.title}
                  {field.required && <span className="text-red-500">*</span>}
                </Label>
              </div>
              <Input
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={object[field.name]}
                maxLength={field.maxLength}
                disabled={!field.editable}
                onChange={(e) =>
                  setObject({ ...object, [field.name]: e.target.value })
                }
              />
            </>
          )}
          {field.input === "select" && (
            <Select
              title={field.title}
              items={field.options}
              field={field.field}
              placeholder={field.placeholder}
              user={object}
              setUser={setObject}
              required={field.required}
              searchable={field.searchable}
            />
          )}
          {field.input === "checkboxes" && (
            <>
              <p className="mb-1 font-semibold">
                {field.text}
                {field.required && <span className="text-red-500">*</span>}
              </p>
              <div className="grid gap-2 md:grid-cols-2">
                {field.options.map((option, i) => (
                  <Checkbox
                    id={option.id}
                    checked={object[field.field].includes(option)}
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
                    key={i}
                  >
                    {option}
                  </Checkbox>
                ))}
              </div>
            </>
          )}
          {field.input === "terms" && (
            <Terms
              options={field.options}
              onClick={() => {
                setObject({
                  ...object,
                  [field.field]:
                    object[field.field].length === field.options.length
                      ? []
                      : [...field.options],
                });
              }}
              onMLHClick={() => {
                setObject({
                  ...object,
                  mlh: !object["mlh"],
                });
              }}
            />
          )}

          {field.input === "radio" && (
            <>
              <p className="mb-1 font-semibold">
                {field.text}
                {field.required && <span className="text-red-500">*</span>}
              </p>
              <RadioGroup
                value={object[field.field]}
                onValueChange={(value) => handleClick(value, field.field)}
              >
                <div className="grid grid-cols-2">
                  {Object.values(field.options).map((option, index) => (
                    <div
                      className="mb-2 flex items-center space-x-2"
                      key={index}
                    >
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option}>{option}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </>
          )}
          {field.input === "textarea" && (
            <>
              <div className="mb-1">
                <Label htmlFor={field.name} className="font-semibold">
                  {field.title}
                  {field.required && <span className="text-red-500">*</span>}
                </Label>
              </div>
              <Textarea
                className="border-1 w-full resize-none border border-black pl-3 placeholder:text-hackathon-gray-200 focus:outline-none"
                maxLength={500}
                value={object[field.name]}
                onChange={(e) =>
                  setObject({ ...object, [field.name]: e.target.value })
                }
                placeholder={field.placeholder}
                rows={field.rows}
                title={field.title}
              />
            </>
          )}
          {field.input === "upload" && (
            <Upload
              field={field.field}
              text={field.text}
              maxSize={field.maxSize}
              types={field.types}
              user={object}
              setUser={setObject}
              required={field.required}
            />
          )}
        </div>
      ))}
      <div>
        <p className="mt-3 font-semibold">Resources</p>
        <Link
          href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
          target="_blank"
          className="mt-1 flex items-center text-hackathon-green-300 no-underline hover:text-opacity-65"
        >
          MLH Code of Conduct
          <SquareArrowOutUpRight className="mx-2" size={15} />
        </Link>
        <Link
          href="https://mlh.io/privacy"
          target="_blank"
          className="mt-3 flex items-center text-hackathon-green-300 no-underline hover:text-opacity-65"
        >
          MLH Privacy Policy
          <SquareArrowOutUpRight className="mx-2" size={15} />
        </Link>
        <Link
          href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
          target="_blank"
          className="mt-3 flex items-center text-hackathon-green-300 no-underline hover:text-opacity-65"
        >
          MLH Contest Terms and Conditions
          <SquareArrowOutUpRight className="mx-2" size={15} />
        </Link>
      </div>
      {packet && (
        <Link
          href={data.packet}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center no-underline"
        >
          Sponsorship Packet
          <SquareArrowOutUpRight className="mx-2" size={15} />
        </Link>
      )}
      <div className="flex justify-center">
        <Button
          onClick={() => onSubmit(setLoading, setState)}
          disabled={loading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Questions;
