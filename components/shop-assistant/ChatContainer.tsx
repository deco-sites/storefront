import { Signal } from "@preact/signals";
import {
  AssistantMessage,
  Content,
  Ids,
  Message,
} from "./types/shop-assistant.ts";
import { useEffect, useState } from "preact/hooks";
import { ChatStep } from "./ChatComponents/ChatStep.tsx";
import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";

type ChatProps = {
  messageList: Signal<Message[]>;
  assistantIds: Signal<Ids>;
  addNewMessageToList: ({ content, type, role }: Message) => void;
  send: (text: string) => void;
  handleShowChat: () => void;
  logo?: { src: string; alt: string };
  updateMessageListArray: (messageList: Message[]) => void;
  updateIds: (ids: Ids) => void;
};

export function ChatContainer(
  {
    messageList,
    assistantIds,
    addNewMessageToList,
    send,
    handleShowChat,
    logo,
    updateMessageListArray,
    updateIds,
  }: ChatProps,
) {
  const [shouldAnimateWidth, setShouldAnimateWidth] = useState(false);

  useEffect(() => {
    const localMsgList = [...messageList.value];

    const functionCallMsg: AssistantMessage[] = localMsgList
      .filter((msg): msg is AssistantMessage =>
        msg.type === "function_calls" &&
        msg.content.some((content) => content.response.length > 0)
      );

    // Check if there is a multi_tool_use.parallel function call (which is an error from the openApi call)
    const isMultiTool = functionCallMsg.some((msg) => {
      return (msg.content as Content[]).some((content) => {
        return content.name === "multi_tool_use.parallel";
      });
    });

    setShouldAnimateWidth(!isMultiTool && functionCallMsg.length > 0);
  }, [messageList.value]);

  const handleClearChat = () => {
    if (
      window.confirm(
        "Are you sure you want to clear the chat? This action cannot be undone.",
      )
    ) {
      updateMessageListArray([]);
      updateIds({ threadId: "", assistantId: "" });
    }
  };

  return (
    <>
      <style>
        {`@keyframes widthIncrease {
          from {
            width: 25rem;
          }
          to {
            width: 60rem;
          }
        }`}
      </style>
      <div
        style={{
          animation: shouldAnimateWidth ? "widthIncrease 200ms linear" : "none",
          transition: "width 200ms",
        }}
        class={`p-4 gap-4 h-fit max-h-[80vh] shadow-lg outline-opaqueWhite outline outline-8 rounded-t-3xl sm:rounded-t-[1.5rem] rounded-b-none sm:rounded-b-[1.5rem] flex flex-col bg-primary-90
        w-full ${
          shouldAnimateWidth
            ? "lg:w-[60rem] max-w-[25rem] lg:max-w-[60rem]"
            : "lg:w-[25rem] max-w-[25rem]"
        }`}
      >
        <div class="flex items-center flex-row justify-between">
          <div class="bg-chatLogo rounded-full flex justify-center items-center w-fit">
            {logo
              ? (
                <Image
                  class="m-2 w-6 h-6"
                  src={logo.src}
                  alt={logo.alt}
                  width={24}
                  height={24}
                />
              )
              : <img src="/deco-logo.svg"></img>}
          </div>
          <div class="gap-4 flex items-center flex-row">
            <button
              onClick={handleClearChat}
              class="group absolute right-16"
            >
              <span class="text-chatTertiary font-light text-sm">Limpar</span>
            </button>
            <button onClick={handleShowChat}>
              <Icon
                id="Close"
                class="text-chatTertiary"
                height={20}
                width={20}
              />
            </button>
          </div>
        </div>
        <ChatStep
          send={send}
          assistantIds={assistantIds}
          messageList={messageList}
          addNewMessageToList={addNewMessageToList}
          updateMessageListArray={updateMessageListArray}
        />
      </div>
    </>
  );
}
