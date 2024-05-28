import { AppContext } from "../../apps/site.ts";
import Header from "../../components/ui/SectionHeader.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { useComponent } from "../Component.tsx";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  title?: string;
  /** @format textarea */
  description?: string;
  form?: Form;
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
  }

  return props;
}

export function loader(props: Props) {
  return props;
}

export default function Newsletter({
  title = "Subscribe to our newsletter",
  description = "Join and get 10% off on your first purchase",
  form = {
    placeholder: "Enter your email",
    buttonText: "Subscribe",
    helpText:
      'By subscribing, you agree with our <a class="link" href="/politica-de-privacidade">Privacy policy</a>.',
  },
}: Props) {
  return (
    <div class="bg-secondary">
      <div class="container flex flex-col rounded p-4 gap-6 lg:p-16 lg:gap-12">
        <Header title={title} description={description} fontSize="Small" />

        <div class="flex justify-center">
          <form
            hx-target="closest section"
            hx-swap="outerHTML"
            hx-post={useComponent(import.meta.url)}
            class="flex flex-col gap-4"
          >
            <div class="flex flex-col lg:flex-row gap-3">
              <input
                name="email"
                class="input input-bordered lg:w-80"
                type="text"
                placeholder={form.placeholder}
              />
              <button class="btn btn-primary" type="submit">
                <span class="[.htmx-request_&]:hidden inline">
                  {form.buttonText}
                </span>
                <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
              </button>
            </div>

            <div
              class="text-sm"
              dangerouslySetInnerHTML={{ __html: form.helpText ?? "" }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
