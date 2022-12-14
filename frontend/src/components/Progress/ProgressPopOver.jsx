import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";

function ProgressPopOver() {
  return (
    
      <Popover
        placement="bottom-start"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        <PopoverHandler>
          <Button className="bg-blue-300 border-transparent" variant="gradient">
            Your Progress{" "}
          </Button>
        </PopoverHandler>
        <PopoverContent>
          <div className="flex-col space-y-3">
            <div className="font-semibold">226 of 498 complete.</div>
            <div className="flex justify-center items-center">
              <p className="font-medium text-gray-500">
                Finish the Course Content and pass the Exam to earn your
                certicate
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="currentColor"
                class="bi bi-award"
                viewBox="0 0 16 16"
              >
                <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z" />
                <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
              </svg>
            </div>
          </div>
        </PopoverContent>
      </Popover>

  );
}
export default ProgressPopOver;
