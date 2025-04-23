import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/users";
import { StatusMapping } from "@/data/statuses";
import { Attributes } from "@/data/form/admins";

interface StatusTypes {
  object: Attributes;
  statuses: StatusMapping;
  setState: (e: number) => void;
}

const Status = ({ object, statuses, setState }: StatusTypes) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <p>
        Hello <b>{object.firstName}</b>, your status is currently
      </p>
      <Badge className="m-2">{statuses[object.roles[object.form]]}</Badge>

      <p className="text-center">
        You have already filled out the form. If you wish to change any
        information, please fill out the form again. Note that your status will
        change until approved by an admin.
      </p>
      <p className="text-center">
        If you believe that your status is incorrect, please reach out to us
        immediately.
      </p>
      <Button onClick={() => setState(1)}>Apply</Button>
    </div>
  );
};

export default Status;
