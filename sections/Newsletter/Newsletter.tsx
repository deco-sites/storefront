import { ButtonType, getButtonClasses } from "../../constants.tsx";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  form?: Form;
  style?: {
    button?: ButtonType;
  };
}

const DEFAULT_PROPS: Props = {
  form: {
    placeholder: "Digite seu email",
    buttonText: "Inscrever",
    helpText: "",
  },
};

export default function Newsletter(props: Props) {
  const { form, style } = { ...DEFAULT_PROPS, ...props };

  return (
    <form action="/" class="flex flex-col gap-4">
      <div class="flex flex-col lg:flex-row gap-3">
        <input
          class="input input-bordered lg:w-80"
          type="text"
          placeholder={form?.placeholder}
        />
        <button
          class={getButtonClasses(style?.button || {})}
          type="submit"
        >
          {form?.buttonText}
        </button>
      </div>
      {form?.helpText && (
        <div
          class="text-sm"
          dangerouslySetInnerHTML={{ __html: form?.helpText }}
        />
      )}
    </form>
  );
}
