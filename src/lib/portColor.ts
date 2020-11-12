export enum PortColor {
  P1 = "#f52e2e",
  P2 = "#5463ff",
  P3 = "#ffc717",
  P4 = "#1f9e40",
}

export function getPortColor(portNumber: number): string {
  switch (portNumber) {
    case 1:
      return PortColor.P1;
    case 2:
      return PortColor.P2;
    case 3:
      return PortColor.P3;
    case 4:
      return PortColor.P4;
    default:
      return PortColor.P1;
  }
}
