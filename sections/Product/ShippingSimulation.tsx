/**
 * TODO: support other platforms. Currently only for VTEX
 */
import { AppContext } from "apps/vtex/mod.ts";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";
import { useSection } from "deco/hooks/usePartialSection.ts";
import { SectionProps } from "deco/mod.ts";
import { useId } from "preact/hooks";
import { formatPrice } from "../../sdk/format.ts";

export interface Props {
  items: SKU[];
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

export function Results({ result }: SectionProps<typeof action>) {
  const methods = result?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? [];

  if (!methods.length) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col gap-4 p-4 border border-base-300 rounded">
      {methods.map((method) => (
        <li class="flex justify-between items-center border-base-200 not-first-child:border-t">
          <span class="text-button text-center">
            Entrega {method.name}
          </span>
          <span class="text-button">
            até {formatShippingEstimate(method.shippingEstimate)}
          </span>
          <span class="text-base font-semibold text-right">
            {method.price === 0 ? "Grátis" : (
              formatPrice(method.price / 100, "BRL", "pt-BR")
            )}
          </span>
        </li>
      ))}
      <span class="text-xs font-thin">
        Os prazos de entrega começam a contar a partir da confirmação do
        pagamento e podem variar de acordo com a quantidade de produtos na
        sacola.
      </span>
    </ul>
  );
}

export function Form({ items }: Props) {
  const slot = useId();

  return (
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <span>Calcular frete</span>
        <span>
          Informe seu CEP para consultar os prazos de entrega
        </span>
      </div>

      <form
        class="join"
        hx-target={`#${slot}`}
        hx-sync="this:replace"
        hx-post={useSection({
          props: {
            items,
            __resolveType: "site/sections/Product/ShippingSimulation.tsx",
          },
        })}
      >
        <input
          as="input"
          type="text"
          class="input input-bordered join-item w-48"
          placeholder="Seu cep aqui"
          name="postalCode"
          maxLength={8}
          size={8}
        />
        <button type="submit" class="btn join-item ">
          <span class="[.htmx-request_&]:hidden inline">Calcular</span>
          <span class="[.htmx-request_&]:inline hidden loading loading-spinner loading-xs" />
        </button>
      </form>

      {/* Results Slot */}
      <div id={slot} />
    </div>
  );
}

export async function action(props: Props, req: Request, ctx: AppContext) {
  const fromReq = await req.formData();

  try {
    const result = await ctx.invoke("vtex/actions/cart/simulation.ts", {
      items: props.items,
      postalCode: `${fromReq.get("postalCode") ?? ""}`,
      country: "BRA",
    }) as SimulationOrderForm | null;

    return { ...props, result, type: "result" };
  } catch {
    return { ...props, result: null, type: "result" };
  }
}

export function loader(props: Props) {
  return { ...props, result: null, type: "form" };
}

function Section(props: SectionProps<typeof loader, typeof action>) {
  if (props.type === "result") {
    return <Results {...props} />;
  }

  return <Form {...props} />;
}

export default Section;
