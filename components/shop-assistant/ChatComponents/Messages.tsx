import { memo } from "preact/compat";
import type { ComponentChildren } from "preact";
import { Ref, useEffect, useRef, useState } from "preact/hooks";
import {
  AssistantMessage,
  Message,
  MessageContentText,
  UserMsg,
} from "../types/shop-assistant.ts";
import { useChatContext } from "$store/components/shop-assistant/ChatContext.tsx";

type MessagesProps = {
  messageList: Message[];
  send: (text: string) => void;
  addNewMessageToList: ({ content, type, role }: Message) => void;
  updateMessageListArray: (messageList: Message[]) => void;
};

export function Messages(
  { messageList, send, addNewMessageToList, updateMessageListArray }:
    MessagesProps,
) {
  const messageEl = useRef<HTMLDivElement>(null);
  const [hasExpanded, setHasExpanded] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (messageList.length > 1) {
      setHasExpanded(true);
    }
  }, [messageList]);

  useEffect(() => {
    // For automatic scrolling
    const messageElement = messageEl.current;

    if (messageElement) {
      messageElement.scrollTop = messageElement.scrollHeight;
    }
  }, [messageList, showLoading]);

  useEffect(() => {
    const lastMessage = messageList[messageList.length - 1];

    // Show loading when the last message is a start_function_call or a user's message
    if (
      lastMessage?.type === "start_function_call" ||
      lastMessage?.role === "user"
    ) {
      setTimeout(() => setShowLoading(true), 1000);
    } else {
      setShowLoading(false);
    }
  }, [messageList]);

  return (
    <>
      <style>
        {`@keyframes heightIncrease {
        from {
          height: 30vh;
        }
        to {
          height: 60vh;
        }
      }`}
        {`@keyframes messageAppear {
        from {
          opacity: 0;
          transform: translateY(50%);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }`}
      </style>
      <div
        class="flex flex-col min-w-[40%] max-w-[25rem] w-full overflow-y-auto scroll-smooth px-2"
        style={hasExpanded
          ? {
            animation: `heightIncrease 200ms linear`,
            height: "60vh",
            overflowY: "auto",
            transition: "height 200ms",
          }
          : { height: "30vh", overflow: "hidden", transition: "height 200ms" }}
        ref={messageEl}
      >
        {messageList.map((message, index) => (
          <div
            key={index}
            style={{ animation: "messageAppear 200ms linear" }}
            class="flex flex-col"
          >
            {message.role === "assistant"
              ? (
                <BotMessage
                  message={message}
                  send={send}
                  messageList={messageList}
                  addNewMessageToList={addNewMessageToList}
                  updateMessageListArray={updateMessageListArray}
                />
              )
              : <UserMessage message={message} />}
          </div>
        ))}
        <TypingIndicator show={showLoading} messageEl={messageEl} />
      </div>
    </>
  );
}

type BotMessageProps = {
  message: AssistantMessage;
  send: (text: string) => void;
  messageList: Message[];
  addNewMessageToList: ({ content, type, role }: Message) => void;
  updateMessageListArray: (messageList: Message[]) => void;
};

// TODO: Refactor Content types to avoid type assertions
const BotMessage = memo(
  (
    {
      message,
      send,
      messageList,
      addNewMessageToList,
      updateMessageListArray,
    }: BotMessageProps,
  ) => {
    if (message.type === "error") {
      return <ErrorMessage />;
    }
    if (message.type === "message") {
      return (
        <>
          {message.content.map((content, index) => (
            <BotMessageWrapper key={index}>
              <div class="flex flex-col gap-2">
                <div>{content.value}</div>
                <OptionsButtonGroup
                  content={content}
                  send={send}
                  messageList={messageList}
                  addNewMessageToList={addNewMessageToList}
                  updateMessageListArray={updateMessageListArray}
                />
              </div>
            </BotMessageWrapper>
          ))}
        </>
      );
    }

    return null;
  },
);

function ErrorMessage() {
  return (
    <BotMessageWrapper>
      <div>
        Ei, algo não saiu como esperávamos... 🚧 Por favor, recarregue a página
        e tente novamente.
      </div>
    </BotMessageWrapper>
  );
}

type OptionsButtonGroupProps = {
  content: MessageContentText;
  send: (text: string) => void;
  messageList: Message[];
  addNewMessageToList: ({ content, type, role }: Message) => void;
  updateMessageListArray: (messageList: Message[]) => void;
};

function OptionsButtonGroup(
  {
    content,
    send,
    messageList,
    addNewMessageToList,
    updateMessageListArray,
  }: OptionsButtonGroupProps,
) {
  const sendBtnClickMessage = (option: string) => {
    const msgContent: MessageContentText[] = [{
      type: "text",
      value: option,
      options: [],
    }];

    removeQuickReplies();

    addNewMessageToList({
      content: msgContent,
      type: "message",
      role: "user",
    });

    send(option.concat(" ", getLastUserMessage(messageList)));
  };

  const getLastUserMessage = (messageList: Message[]): string => {
    const lastUserMessage: UserMsg | undefined = messageList.slice().reverse()
      .find(isUserMsg);

    if (!lastUserMessage) return "";

    const content = lastUserMessage.content[0];

    if ("value" in content) { // MessageContentText type
      return content.value;
    }

    return "";
  };

  const removeQuickReplies = () => {
    // TODO: refactor this
    let lastAssistantMsgIndex = -1;
    for (let i = messageList.length - 1; i >= 0; i--) {
      if (
        messageList[i].role === "assistant" && messageList[i].type === "message"
      ) {
        lastAssistantMsgIndex = i;
        break;
      }
    }

    const newMessageList: Message[] = messageList.map((message, index) => {
      if (
        index === lastAssistantMsgIndex && message.content &&
        message.role === "assistant" && message.type === "message"
      ) {
        const modifiedContent = message.content.map((contentItem) => {
          if (contentItem.type === "text") {
            return { ...contentItem, options: [] };
          }
          // Returning the contentItem without modifications if it's not a 'text' type
          return contentItem;
        });

        return {
          ...message,
          content: modifiedContent,
        };
      }
      // Returning the message without modifications if it's not an assistant message of type 'message' at the specified index
      return message;
    });

    updateMessageListArray(newMessageList);
  };

  return (
    <div>
      {content.options?.length > 0 && (
        <div class="flex flex-col justify-start space-y-2">
          <div class="text-chatTertiary text-xs font-light">Quick Replies</div>
          <div class="gap-2 flex flex-row items-center">
            {content.options.map((option, index) => (
              <button
                class="p-2 text-chatTertiary rounded-2xl bg-chatSecondary text-xs hover:shadow-custom-inset"
                key={index}
                onClick={() => sendBtnClickMessage(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BotMessageWrapper({ children }: { children: ComponentChildren }) {
  return (
    <div class="mb-3 text-chatTertiary max-w-s self-start w-full">
      {children}
    </div>
  );
}

function UserMessage({ message }: { message: UserMsg }) {
  const isAudioMessage = message.content.some((content) =>
    content.type === "audio"
  );

  return (
    <div
      class={`mb-6 p-2 rounded-xl rounded-br-none ${
        isAudioMessage ? "" : "bg-secondary-70"
      } text-chatTertiary max-w-s w-fit self-end`}
    >
      {message.content.map((content, index) => {
        if ("value" in content) {
          return <div key={index}>{content.value}</div>;
        }
        if (content.type === "file") {
          return (
            <>
              <img key={index} src={content.url} class="w-32 rounded-xl"></img>
              <div class="mt-2">{content.message}</div>
            </>
          );
        }
        if (content.type === "audio") {
          return <audio controls key={index} src={content.url}></audio>;
        }
        return null;
      })}
    </div>
  );
}

function TypingIndicator(
  { show, messageEl }: { show: boolean; messageEl: Ref<HTMLDivElement> },
) {
  const [message, setMessage] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const messageElement = messageEl.current;
  const { disableChatInput } = useChatContext();

  useEffect(() => {
    // TODO: Refactor this to use messages from props / generate random waiting messages / typing indicator as first message (...)
    if (show) {
      const timeouts: number[] = [];
      timeouts.push(setTimeout(() => {
        setMessage("Um segundo, estou pensando... 🤔");
        setStep(1);
      }, 8000));
      timeouts.push(setTimeout(() => {
        setMessage("Aguarde só mais um instante... ⏳");
        setStep(2);
      }, 15000));
      timeouts.push(setTimeout(() => {
        setMessage(
          "Só um segundinho, estou quase encontrando algo incrível! 🔍",
        );
        setStep(3);
      }, 15000));
      timeouts.push(setTimeout(() => {
        setMessage(
          "Parece que está demorando um pouco mais do que o esperado. Aguarde mais um momento.",
        );
        setStep(4);
      }, 30000));
      timeouts.push(setTimeout(() => {
        setMessage(
          "Hmm, enfrentamos um contratempo. 🌀 Por favor, recarregue a página para recomeçarmos.",
        );
        disableChatInput(false);
      }, 60000));

      return () => {
        timeouts.forEach(clearTimeout);
      };
    }
  }, [show]);

  useEffect(() => {
    if (messageElement) messageElement.scrollTop = messageElement.scrollHeight;
  }, [show, message, step]);

  useEffect(() => {
    setStep(0);
  }, [show]);

  return show
    ? (
      <div className="mb-4">
        <style>
          {`@keyframes blink {
              0%, 100% { opacity: 0; }
              100% { opacity: 1; }
            }`}
        </style>
        {step === 0 && (
          <div
            style={{ animation: "messageAppear 200ms linear" }}
          >
            Digitando
            <span
              style={{
                animation: "blink 0.7s infinite",
                animationDelay: "0.1s",
              }}
            >
              .
            </span>
            <span
              style={{
                animation: "blink 0.7s infinite",
                animationDelay: "0.3s",
              }}
            >
              .
            </span>
            <span
              style={{
                animation: "blink 0.7s infinite",
                animationDelay: "0.5s",
              }}
            >
              .
            </span>
          </div>
        )}
        {step > 0 && <div>{message}</div>}
      </div>
    )
    : null;
}

// Type guards
const isUserMsg = (msg: Message): msg is UserMsg => {
  return msg.role === "user";
};
