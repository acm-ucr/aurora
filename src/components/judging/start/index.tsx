"use client";
import Checkbox from "@/components/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
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

interface props {
  id: string;
}

const Start = ({ id }: props) => {
  return (
    <div className="overflow-scroll-y flex h-full w-full flex-col items-center font-poppins">
      <div className="flex w-10/12 flex-col items-center pb-12 pt-5 md:w-1/2 xl:w-1/3">
        <p className="m-0 w-full rounded-t bg-hackathon-green-300 px-4 py-4 text-xl font-semibold">
          Team {id} - SUPERNOVA
        </p>
        <div className="w-full rounded-b bg-white p-8">
          <div className="grid grid-cols-1 gap-3">
            <Label>Questions</Label>
            <ul>
              <li className="list-disc">
                What problem does your project solve?
              </li>
              <li className="list-disc">What technologies did you use?</li>
              <li className="list-disc">What challenges did you run into?</li>
              <li className="list-disc">What did you learn?</li>
            </ul>

            <Label>Tracks</Label>
            <div className="flex gap-3">
              <Checkbox id="track 1" checked={false}>
                TRACK 1
              </Checkbox>
              <Checkbox id="track 2" checked={false}>
                TRACK 2
              </Checkbox>
              <Checkbox id="track 3" checked={false}>
                TRACK 3
              </Checkbox>
              <Checkbox id="track 4" checked={false}>
                TRACK 4
              </Checkbox>
            </div>
            <Label>Implementation</Label>
            <div>
              <div className="mb-2 flex justify-between">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
              </div>
              <Slider defaultValue={[0]} max={4} step={1} />
            </div>

            <Textarea
              className="border-1 w-full resize-none border border-black pl-3 placeholder:text-hackathon-gray-200 focus:outline-hidden"
              maxLength={500}
            />
            <Label>Idea</Label>
            <div>
              <div className="mb-2 flex justify-between">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
              </div>
              <Slider defaultValue={[0]} max={4} step={1} />
            </div>
            <Textarea
              className="border-1 w-full resize-none border border-black pl-3 placeholder:text-hackathon-gray-200 focus:outline-hidden"
              maxLength={500}
            />
            <Label>Design</Label>
            <div>
              <div className="mb-2 flex justify-between">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
              </div>
              <Slider defaultValue={[0]} max={4} step={1} />
            </div>
            <Textarea
              className="border-1 w-full resize-none border border-black pl-3 placeholder:text-hackathon-gray-200 focus:outline-hidden"
              maxLength={500}
            />
            <Label>Notes</Label>
            <Textarea
              className="border-1 w-full resize-none border border-black pl-3 placeholder:text-hackathon-gray-200 focus:outline-hidden"
              maxLength={500}
            />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>Submit</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Once you submit, you will not be able to move back to this
                    team. Please double check you have all the notes and filled
                    out the respective boxes.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button>Submit</Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">No Show</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button variant="destructive"> Mark No Show</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
