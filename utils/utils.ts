import { event } from "@/components/useWeekly";

export type FormErrors = {
  title?: string;
  endT?: string;
}

//returns mm/dd/yy
export const formatDate = (d: Date) =>
    `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d
      .getDate()
      .toString()
      .padStart(2, "0")}/${d.getFullYear().toString().slice(-2)}`;

//returns 0:00
export const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

//Converts to string
export const getEventStr = (nEvent: event) =>
    `${nEvent.title}     (${formatTime(nEvent.startTime)} - ${formatTime(nEvent.endTime)})`;

export const validateForm = (title: string, startT: Date, endT: Date):FormErrors => {
  let errs:FormErrors = {};

  if (title === "") errs.title = "Please enter a title";

  if (startT > endT){
    errs.endT = "End time must be after start time";
  } else if (startT.getTime() == endT.getTime() ) {
    errs.endT = "Start and end time cannot be the same";
  }

  return errs;
}