
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

const DEFAULT_PROPS: Props = {
  title: "",
  description: "",
  form: {
    placeholder: "Digite seu email",
    buttonText: "Inscrever",
    helpText:
      'Ao se inscrever, você concorda com nossa <a class="link" href="/politica-de-privacidade">Política de privacidade</a>.',
  }
};

export default function Newsletter(props: Props) {
  const { title, description, form } = { ...DEFAULT_PROPS, ...props };

  const headerLayout = (
    <div class="flex flex-col gap-2">
      <h2 class="text-base-content text-center text-3xl font-semibold">{title}</h2>
      <p class="text-center">{description}</p>
    </div>
  );

  const formLayout = form && (
    <form action="/" class="flex flex-col gap-4">
      <div class="flex flex-col lg:flex-row gap-3">
        <input
          class="input input-bordered lg:w-80"
          type="text"
          placeholder={form.placeholder}
        />
        <button
          class="btn"
          type="submit"
        >
          {form.buttonText}
        </button>
      </div>
      {form.helpText && (
        <div
          class="text-sm"
          dangerouslySetInnerHTML={{ __html: form.helpText }}
        />
      )}
    </form>
  );

  return (
    <div
      class="bg-transparent p-0"
    >
      <div
          class="container flex flex-col rounded p-4 gap-6 lg:p-16 lg:gap-12 bg-transparent"
        >
        {headerLayout}
        <div class="flex justify-center">
          {formLayout}
        </div>
      </div>
    </div>
  );
}
