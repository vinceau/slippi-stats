import { ButtonInput, ControllerInputState } from "react-gamecube";

export function buttonsToControllerState(inputs: ButtonInput[]): Partial<ControllerInputState> {
  const newState: Partial<ControllerInputState> = {};
  for (const inp of inputs) {
    switch (inp) {
      case ButtonInput.A:
        newState.a = true;
        break;
      case ButtonInput.D_LEFT:
        newState.dl = true;
        break;
      case ButtonInput.D_RIGHT:
        newState.dr = true;
        break;
      case ButtonInput.D_DOWN:
        newState.dd = true;
        break;
      case ButtonInput.D_UP:
        newState.du = true;
        break;
      case ButtonInput.Z:
        newState.z = true;
        break;
      case ButtonInput.R:
        newState.r = true;
        break;
      case ButtonInput.L:
        newState.l = true;
        break;
      case ButtonInput.B:
        newState.b = true;
        break;
      case ButtonInput.X:
        newState.x = true;
        break;
      case ButtonInput.Y:
        newState.y = true;
        break;
      case ButtonInput.START:
        newState.start = true;
        break;
    }
  }
  return newState;
}
