import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";

const ChatContext = createContext({
  isChatMinimized: false,
  minimizeChat: (state: boolean) => {},
  inputDisable: true,
  disableChatInput: (state: boolean) => {},
});

interface ChatProviderProps {
  children: preact.ComponentChildren;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [inputDisable, setInputDisable] = useState(true);

  const minimizeChat = (state: boolean) => {
    setIsChatMinimized(state);
  };

  const disableChatInput = (state: boolean) => {
    setInputDisable(state);
  };

  return (
    <ChatContext.Provider
      value={{ isChatMinimized, minimizeChat, disableChatInput, inputDisable }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  return useContext(ChatContext);
}
