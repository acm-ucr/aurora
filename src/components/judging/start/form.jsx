"use client";
import { useState } from "react";
import Questions from "./questions";
const Form = ({ object, setObject, header, fields, onSubmit, round }) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="overflow-scroll-y flex h-full w-full flex-col items-center font-poppins">
      <div className="flex w-full flex-col items-center pb-12 pt-5 md:w-1/2 xl:w-1/3">
        <div className="m-0 flex w-full justify-between rounded-t bg-hackathon-blue-100 px-4 py-4 text-xl font-semibold text-white">
          <p>JUDGING</p>
          <p>ROUND {round}</p>
        </div>
        <div className="w-full rounded-b bg-white p-8">
          <p className="mb-4 text-center text-xl font-semibold">{header}</p>
          <div className="grid grid-cols-1 gap-3">
            <Questions
              loading={loading}
              setLoading={setLoading}
              object={object}
              setObject={setObject}
              fields={fields}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
