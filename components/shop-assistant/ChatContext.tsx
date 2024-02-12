import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";

const ChatContext = createContext({
  isChatMinimized: false,
  minimizeChat: (state: boolean) => {},
});

interface ChatProviderProps {
  children: preact.ComponentChildren;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [isChatMinimized, setIsChatMinimized] = useState(false);

  const minimizeChat = (state: boolean) => {
    setIsChatMinimized(state);
  };

  return (
    <ChatContext.Provider
      value={{ isChatMinimized, minimizeChat }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  return useContext(ChatContext);
}
