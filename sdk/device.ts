import { Device } from "deco/utils/device.ts";
import { signal } from "@preact/signals";


export const device = signal<Device>("mobile")

export const useDevice = () => {
  return {
    device
  }
}