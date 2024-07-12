import type { SKU } from "apps/vtex/utils/types.ts";
import { useId } from "../../sdk/useId.ts";
import { useComponent } from "../../sections/Component.tsx";

export interface Props {
  items: SKU[];
}

export default function Form({ items }: Props) {
  const slot = useId();

  return (
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <span class="text-[#616B6B] text-sm pt-5 border-t-[1px] border-gray-300">
          Please provide your ZIP code to check the delivery times.
        </span>
      </div>

      <form
        class="relative join"
        hx-target={`#${slot}`}
        hx-swap="innerHTML"
        hx-sync="this:replace"
        hx-post={useComponent(import.meta.resolve("./Results.tsx"), {
          items,
        })}
      >
        <input
          as="input"
          type="text"
          class="input input-bordered join-item w-48"
          placeholder="00000000"
          name="postalCode"
          maxLength={8}
          size={8}
        />
        <button type="submit" class="btn join-item no-animation">
          <span class="[.htmx-request_&]:hidden inline">Calculate</span>
          <span class="[.htmx-request_&]:inline hidden loading loading-spinner loading-xs" />
        </button>
      </form>

      {/* Results Slot */}
      <div id={slot} />
    </div>
  );
}
