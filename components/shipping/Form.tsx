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
        <div className="input input-bordered flex items-center focus-within:outline-2 focus-within:outline-black focus-within:outline rounded-[4px] p-0">
          <input
            as="input"
            type="text"
            class="input input-bordered border-x-0 join-item w-[122px] focus:outline-0"
            placeholder="0000000"
            name="postalCode"
            maxLength={8}
            size={8}
          />
          <button
            type="submit"
            class="input input-bordered border-x-0 join-item no-animation focus:outline-0"
          >
            <span class="[.htmx-request_&]:hidden inline hover:text-primary text-sm">
              Calculate
            </span>
            <span class="[.htmx-request_&]:inline hidden loading loading-spinner loading-xs" />
          </button>
        </div>
      </form>

      {/* Results Slot */}
      <div id={slot} />
    </div>
  );
}
