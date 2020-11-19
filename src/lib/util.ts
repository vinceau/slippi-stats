import moment from "moment";

export function convertFrameCountToDurationString(frameCount: number): string {
  // Enforce positive numbers only
  const totalFrames = Math.max(frameCount, 0);
  const duration = moment.duration(totalFrames / 60, "seconds");
  return moment.utc(duration.as("milliseconds")).format("m:ss");
}

/**
 * Taken from: https://stackoverflow.com/a/6470794
 */
export function moveArrayItem(array: any, fromIndex: number, toIndex: number) {
  const element = array[fromIndex];

  // Copy the array
  const arr = [...array];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
  return arr;
}
