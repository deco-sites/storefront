import { SectionProps } from "deco/mod.ts";
import { AppContext } from "../../apps/site.ts";
import Icon from "../../components/ui/Icon.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { useComponent } from "../Component.tsx";

interface NoticeProps {
  title?: string;
  description?: string;
}

export interface Props {
  empty?: NoticeProps;
  success?: NoticeProps;
  failed?: NoticeProps;

  /** @description Signup label */
  label?: string;

  /** @description Input placeholder */
  placeholder?: string;

  /** @hide true */
  status?: "success" | "failed";
}

export async function action(props: Props, req: Request, ctx: AppContext) {
  const platform = usePlatform();

  const form = await req.formData();
  const email = `${form.get("email") ?? ""}`;

  if (platform === "vtex") {
    // deno-lint-ignore no-explicit-any
    await (ctx as any).invoke("vtex/actions/newsletter/subscribe.ts", {
      email,
    });

    return { ...props, status: "success" };
  }

  return { ...props, status: "failed" };
}

export function loader(props: Props) {
  return { ...props, status: undefined };
}

function Notice(
  { title, description }: { title?: string; description?: string },
) {
  return (
    <div class="flex flex-col justify-center items-center sm:items-start gap-4">
      <span class="text-3xl font-semibold text-center sm:text-start">
        {title}
      </span>
      <span class="text-sm font-normal text-base-400 text-center sm:text-start">
        {description}
      </span>
    </div>
  );
}

function Newsletter({
  empty = {
    title: "Get top deals, latest trends, and more.",
    description:
      "Receive our news and promotions in advance. Enjoy and get 10% off your first purchase. For more information click here.",
  },
  success = {
    title: "Thank you for subscribing!",
    description:
      "You’re now signed up to receive the latest news, trends, and exclusive promotions directly to your inbox. Stay tuned!",
  },
  failed = {
    title: "Oops. Something went wrong!",
    description:
      "Something went wrong. Please try again. If the problem persists, please contact us.",
  },
  label = "Sign up",
  placeholder = "Enter your email address",
  status,
}: SectionProps<typeof loader, typeof action>) {
  if (status === "success" || status === "failed") {
    return (
      <Section.Container class="bg-base-200">
        <div class="p-14 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10">
          <Icon
            size={80}
            class={clx(
              status === "success" ? "text-success" : "text-error",
            )}
            id={status === "success" ? "check-circle" : "error"}
          />
          <Notice {...status === "success" ? success : failed} />
        </div>
      </Section.Container>
    );
  }

  return (
    <Section.Container class="bg-base-200">
      <div class="p-14 grid grid-flow-row sm:grid-cols-2 gap-10 sm:gap-20 place-items-center">
        <Notice {...empty} />

        <form
          hx-target="closest section"
          hx-swap="outerHTML"
          hx-post={useComponent(import.meta.url)}
          class="flex flex-col sm:flex-row gap-4 w-full"
        >
          <input
            name="email"
            class="input input-bordered flex-grow"
            type="text"
            placeholder={placeholder}
          />

          <button
            class="btn btn-primary"
            type="submit"
          >
            <span class="[.htmx-request_&]:hidden inline">
              {label}
            </span>
            <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
          </button>
        </form>
      </div>
    </Section.Container>
  );
}

export default Newsletter;
