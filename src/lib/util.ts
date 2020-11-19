import moment from "moment";

export function convertFrameCountToDurationString(frameCount: number): string {
  // Enforce positive numbers only
  const totalFrames = Math.max(frameCount, 0);
  const duration = moment.duration(totalFrames / 60, "seconds");
  return moment.utc(duration.as("milliseconds")).format("m:ss");
}
