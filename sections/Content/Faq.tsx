export interface Question {
  question: string;
  /** @format html */
  answer: string;
}

export interface Contact {
  title?: string;
  /** @format html */
  description?: string;
  link?: {
    text: string;
    href: string;
  };
}

export interface Props {
  title?: string;
  description?: string;
  questions?: Question[];
  contact?: Contact;
}

const DEFAULT_PROPS = {
  title: "",
  description: "",
  questions: [
    {
      question: "Como faço para acompanhar o meu pedido?",
      answer:
        "Acompanhar o seu pedido é fácil! Assim que o seu pedido for enviado, enviaremos um e-mail de confirmação com um número de rastreamento. Basta clicar no número de rastreamento ou visitar o nosso site e inserir o número de rastreamento na seção designada para obter atualizações em tempo real sobre a localização e o status de entrega do seu pedido.",
    },
    {
      question: "Qual é a política de devolução?",
      answer:
        "Oferecemos uma política de devolução sem complicações. Se você não estiver completamente satisfeito(a) com a sua compra, pode devolver o item em até 30 dias após a entrega para obter um reembolso total ou troca. Certifique-se de que o item esteja sem uso, na embalagem original e acompanhado do recibo. Entre em contato com a nossa equipe de atendimento ao cliente e eles o(a) orientarão pelo processo de devolução.",
    },
  ],
  contact: {
    title: "",
    description: "",
    button: {
      text: "",
      link: "",
    },
  },
};

function Question({ question, answer }: Question) {
  return (
    <details class="collapse collapse-arrow join-item border-t border-base-200">
      <summary class="collapse-title text-lg font-medium">
        {question}
      </summary>
      <div
        class="collapse-content"
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    </details>
  );
}

function Contact({ title, description, link }: Contact) {
  return (
    <div class="flex flex-col gap-6 items-center text-center">
      <div class="flex flex-col gap-2">
        {title && <h2 class="text-xl lg:text-3xl">{title}</h2>}
        {description && (
          <div
            class="text-lg lg:text-xl"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
      {link &&
        <a href={link.href} class="btn">{link.text}</a>}
    </div>
  );
}

export default function FAQ(props: Props) {
  const {
    questions = [],
    title,
    description,
    contact,
  } = { ...DEFAULT_PROPS, ...props };

  return (
    <div class="w-full container px-4 py-8 flex flex-col gap-4 lg:gap-8 lg:py-10 lg:px-40">
      <div class="flex flex-col gap-8 lg:gap-10">
        <div class="flex flex-col gap-2">
          <h2 class="text-base-content text-center text-3xl font-semibold">
            {title}
          </h2>
          <p class="text-center">{description}</p>
        </div>
        <div class="join join-vertical w-full">
          {questions.map((question) => <Question {...question} />)}
        </div>
      </div>

      <Contact {...contact} />
    </div>
  );
}
