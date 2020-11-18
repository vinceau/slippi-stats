import moment from "moment";

export function convertFrameCountToDurationString(frameCount: number): string {
  const duration = moment.duration(frameCount / 60, "seconds");
  return moment.utc(duration.as("milliseconds")).format("m:ss");
}
