import { useSignal } from "@preact/signals";
import { useCallback, useEffect, useRef } from "preact/hooks";

function Chat() {
  const messageEl = useRef<HTMLDivElement>(null);
  const userInput = useSignal("");
  const ws = useSignal<WebSocket | null>(null);
  const messageList = useSignal<{ content: string; role: "user" | "bot" }[]>(
    [],
  );

  useEffect(() => {
    const host = window.location.host;
    const websocket = window.location.protocol === "https:" ? "wss" : "ws";
    ws.value = new WebSocket(
      `${websocket}://${host}/live/invoke/ai-assistants/actions/chat.ts?assistant=brand`,
    );
    ws.value.onmessage = (event: MessageEvent) => {
      updateMessages(event.data);
    };
  }, []);

  const updateMessages = useCallback((data: string) => {
    const newMessageObject: { content: string; role: "user" | "bot" } = {
      content: data,
      role: "user",
    };
    messageList.value = [...messageList.value, newMessageObject];
  }, []);

  useEffect(() => {
    // For automatic srolling
    const messageElement = messageEl.current;

    if (messageElement) {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.addedNodes.length) {
            messageElement.scrollTop = messageElement.scrollHeight;
          }
        }
      });

      observer.observe(messageElement, { childList: true });

      return () => observer.disconnect();
    }
  }, []);

  const send = useCallback((text: string) => {
    if (ws.value) {
      ws.value.send(text);
    }
  }, []);

  const handleSubmit = () => {
    send(userInput.value);
    const newMessageObject: { content: string; role: "user" | "bot" } = {
      content: userInput.value,
      role: "bot",
    };
    messageList.value = [...messageList.value, newMessageObject];
    userInput.value = "";
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <div class="w-96 mb-4 mt-2 shadow-lg rounded-lg h-3/4 flex flex-col justify-end z-50 bg-white fixed bottom-1 right-4">
        <div class="bg-blue-500 flex justify-center p-3 rounded-t-lg text-white">
          DecoBot
        </div>
        <div
          ref={messageEl}
          class="h-full overflow-y-auto pt-4 flex flex-col mx-5"
        >
          {messageList.value.map((message, index) => (
            <div
              key={index}
              class={`p-2 rounded-2xl mb-3 w-fit text-sm max-w-xs ${
                message.role === "user"
                  ? "bg-gray-200 text-black self-start"
                  : "bg-blue-600 text-white self-end"
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div class="flex flex-row items-center bg-gray-100 rounded-xl relative mb-4 p-4 mt-4 mx-4">
          <textarea
            id="userInput"
            placeholder="Ask..."
            class="w-full grow h-16 outline-none relative resize-none pr-6 bg-gray-100 text-sm"
            value={userInput.value}
            onInput={(e: Event) =>
              userInput.value = (e.target as HTMLTextAreaElement).value}
            onKeyDown={handleKeydown}
          />
          <button
            type="button"
            class="bg-blue-600 hover:bg-blue-700 absolute rounder-md font-light text-white py-1 px-4 rounded-lg text-sm bottom-3 right-3"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
