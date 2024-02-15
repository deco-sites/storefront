import { useRef } from "preact/hooks";
import { Messages } from "./Messages.tsx";
import {
  Ids,
  Message,
  MessageContentAudio,
  MessageContentFile,
  MessageContentText,
} from "../types/shop-assistant.ts";
import { Signal } from "@preact/signals";
import { FunctionCalls } from "./FunctionCalls.tsx";
import { useState } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";
import AutosizeTextarea from "$store/components/shop-assistant/autosize-textarea/AutosizeTextarea.tsx";
import { useFileUpload } from "apps/ai-assistants/hooks/useFileUpload.ts";
import { useChatContext } from "$store/components/shop-assistant/ChatContext.tsx";

const AUDIO_MAX_DURATION = 89000; // 89 seconds
const MAX_IMAGE_SIZE = "4194304"; // Maximum file size in bytes (4 MB)
const MAX_FILE_WARNING =
  "Seu arquivo ultrapassa 4 MB. Por favor, envie um arquivo menor.";

type ChatProps = {
  messageList: Signal<Message[]>;
  assistantIds: Signal<Ids>;
  addNewMessageToList: ({ content, type, role }: Message) => void;
  send: (text: string) => void;
  updateMessageListArray: (messageList: Message[]) => void;
};

export function ChatStep(
  {
    messageList,
    assistantIds,
    addNewMessageToList,
    send,
    updateMessageListArray,
  }: ChatProps,
) {
  return (
    <div class="text-chatTertiary min-h-full flex justify-between w-full flex-row">
      <div class="min-w-[40%] sm:min-w-[23rem] flex flex-col justify-between gap-4 w-full max-w-[25rem]">
        <Messages
          messageList={messageList.value}
          send={send}
          addNewMessageToList={addNewMessageToList}
          updateMessageListArray={updateMessageListArray}
        />
        <div class="lg:hidden block">
          <FunctionCalls
            messages={messageList.value}
            assistantIds={assistantIds.value}
          />
        </div>
        <InputArea
          send={send}
          addNewMessageToList={addNewMessageToList}
          assistantIds={assistantIds.value}
          messageList={messageList}
        />
      </div>
      <div class="lg:block hidden">
        <FunctionCalls
          messages={messageList.value}
          assistantIds={assistantIds.value}
        />
      </div>
    </div>
  );
}

type InputAreaProps = {
  send: (text: string) => void;
  addNewMessageToList: ({ content, type, role }: Message) => void;
  assistantIds: Ids;
  messageList: Signal<Message[]>;
};

function getBase64(file: File | Blob): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function InputArea(
  { send, addNewMessageToList, assistantIds, messageList }: InputAreaProps,
) {
  const [currentFile, setCurrentFile] = useState<File | null>(
    null,
  );
  const [isRecording, setIsRecording] = useState(false);

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mimeTypeRef = useRef<string>("video/mp4");
  const audioChunksRef = useRef<BlobPart[]>([]);
  const userInput = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { describeImage, awsUploadImage, transcribeAudio } = useFileUpload();
  const { inputDisable } = useChatContext();

  const processSubmit = async () => {
    const inputValue = userInput.current?.value;
    if (!inputValue) return;

    // Handle file input and send message if there is a file
    if (currentFile) {
      if (currentFile.size > parseInt(MAX_IMAGE_SIZE)) {
        addNewMessageToList({
          content: [{
            type: "text",
            value: MAX_FILE_WARNING,
            options: [],
          }],
          type: "message",
          role: "assistant",
        });
        return;
      }

      const fileUrl = URL.createObjectURL(currentFile);
      const msgContent: MessageContentFile[] = [{
        type: "file",
        url: fileUrl,
        message: inputValue,
      }];

      addNewMessageToList({
        content: msgContent,
        type: "message",
        role: "user",
      });

      const base64 = await getBase64(currentFile);

      userInput.current.value = "";
      resetFileInput();

      try {
        const uploadURL = await awsUploadImage({
          file: base64,
          ids: assistantIds,
        });
        const descriptionResponse = await describeImage({
          uploadURL: uploadURL,
          userPrompt: inputValue,
          ids: assistantIds,
        });

        if (descriptionResponse instanceof Response) {
          const error = await descriptionResponse.json();
          throw new Error(error);
        }

        const imageDescription = descriptionResponse.choices[0].message.content;
        const concatenatedMessage = `${inputValue}. Find ${imageDescription}`;

        send(concatenatedMessage);
      } catch (error) {
        const errorMessage = error?.cause?.error ||
          "Something went wrong. Please try again.";
        addNewMessageToList({
          content: [{
            type: "text",
            value: errorMessage || "Something went wrong. Please try again.",
            options: [],
          }],
          type: "message",
          role: "assistant",
        });
      }

      return;
    }

    send(inputValue);

    const msgContent: MessageContentText[] = [{
      type: "text",
      value: inputValue,
      options: [],
    }];

    addNewMessageToList({
      content: msgContent,
      type: "message",
      role: "user",
    });

    userInput.current.value = "";
    resetFileInput();
  };

  const handleUserInput = (e: React.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      processSubmit();
    }
  };

  const processFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): File | null => {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      if (!file) return null;
      return file;
    }
    return null;
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const processedFileInfo = processFileUpload(event);
    if (!processedFileInfo) return;
    setCurrentFile(processedFileInfo);
  };

  const startRecording = async () => {
    try {
      if (MediaRecorder.isTypeSupported("audio/webm")) {
        mimeTypeRef.current = "audio/webm"; // works on most desktop browsers
      } else if (MediaRecorder.isTypeSupported("audio/wav")) {
        mimeTypeRef.current = "audio/wav";
      }

      // Ask for permission to use the microphone and start recording
      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaRecorderRef.current = new MediaRecorder(mediaStreamRef.current, {
        mimeType: mimeTypeRef.current,
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = handleRecordingStop;
      mediaRecorderRef.current.start(1000);

      setIsRecording(true); // Change the state to reflect that recording has started
      setTimeout(() => {
        stopRecording();
      }, AUDIO_MAX_DURATION); // Stop recording after AUDIO_MAX_DURATION seconds
    } catch (error) {
      // Handle the error appropriately
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop(); // This will trigger the 'onstop' event
      mediaStreamRef.current?.getTracks().forEach((track) => {
        track.stop();
        track.enabled = false;
      });
      setIsRecording(false); // Update the state to reflect that recording has stopped
    }
  };

  const handleRecordingStop = async () => {
    const audioBlob = new Blob(audioChunksRef.current, {
      type: mimeTypeRef.current,
    });

    audioChunksRef.current = []; // Clear the recorded chunks

    const base64 = await getBase64(audioBlob);
    const transcription = await transcribeAudio({
      file: base64,
      ids: assistantIds,
    });

    if (!transcription.text) return;

    send(transcription.text);

    const msgContent: MessageContentAudio[] = [{
      type: "audio",
      text: transcription.text,
      url: URL.createObjectURL(audioBlob),
    }];

    addNewMessageToList({
      content: msgContent,
      type: "message",
      role: "user",
    });

    setIsRecording(false);
  };

  const handleAudioClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setCurrentFile(null);
  };

  const handleFileClick = (event: MouseEvent) => {
    event.stopPropagation();
    fileInputRef.current && fileInputRef.current.click();
  };

  const isLastMessageFromUser = () => {
    const lastMessage = messageList.value.at(-1);

    return (lastMessage?.type === "start_function_call" ||
      lastMessage?.role === "user");
  };

  return (
    <>
      <style>
        {`@keyframes blink-animation {
         0% {
           color: white;
         }
         50% {
           color: red;
         }
         100% {
           color: white;
         }
       }
       `}
      </style>
      <form onSubmit={handleUserInput} class="sticky">
        {currentFile && (
          <FilePreview
            resetFileInput={resetFileInput}
            fileUrl={URL.createObjectURL(currentFile)}
          />
        )}
        <div class="flex p-4 items-center relative w-full bg-secondary-70 rounded-[2rem]">
          <AutosizeTextarea
            maxRows={7}
            minRows={1}
            disabled={isLastMessageFromUser() && inputDisable}
            class={`w-72 resize-none h-5 pr-11 sm:pr-2 text-chatTertiary bg-transparent text-base sm:text-sm placeholder:text-chatTertiary focus-visible:outline-0 ${
              isLastMessageFromUser() && inputDisable
                ? "cursor-not-allowed"
                : "cursor-auto"
            }`}
            ref={userInput}
            name="userInput"
            placeholder={isLastMessageFromUser() && inputDisable
              ? "Aguarde, processando mensagem..."
              : "Digite sua mensagem aqui"}
            aria-label="Chat input area"
            onKeyDown={handleKeydown}
            maxLength={750} // Set the maximum input length to 750 characters
          />
          <div class="absolute right-4 flex flex-row gap-3">
            <div
              onClick={handleFileClick}
              class={`flex items-center justify-center ${
                isLastMessageFromUser() && inputDisable
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <Icon
                id="Camera"
                class="text-chatTertiary"
                height={16}
                width={16}
              />
              <input
                id="fileInput"
                type="file"
                disabled={isLastMessageFromUser() && inputDisable}
                ref={fileInputRef}
                name="fileInput"
                aria-label="File input"
                onChange={handleFileChange}
                class="sr-only" // Hides visually but keeps it accessible
                accept="image/png, image/jpeg, image/gif, image/webp"
              />
            </div>
            <button
              disabled={isLastMessageFromUser() && inputDisable}
              onClick={handleAudioClick}
              class={`flex items-center justify-center ${
                isLastMessageFromUser() && inputDisable
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <Icon
                id="Microphone"
                style={{
                  animation: isRecording
                    ? "blink-animation 1s linear infinite"
                    : "",
                }}
                class="text-chatTertiary"
                height={20}
                width={20}
              />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

type FilePreviewProps = {
  fileUrl: string;
  resetFileInput: () => void;
};

function FilePreview({ fileUrl, resetFileInput }: FilePreviewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = (event: MouseEvent) => {
    if (event.currentTarget === event.target) {
      setIsModalOpen(false);
    }
  };

  return (
    <div class="ml-4 mb-4 w-fit relative">
      <img
        onClick={toggleModal}
        src={fileUrl}
        alt="file preview"
        class="w-14 rounded-xl relative hover:cursor-pointer"
      />
      <button
        onClick={resetFileInput}
        class="bg-chatSecondary hover:shadow-custom-inset rounded-full h-fit absolute right-1 top-1 -translate-y-1/2 translate-x-1/2 group"
      >
        <Icon
          id="Close"
          class="text-chatTertiary m-1"
          height={16}
          width={16}
        />
        <span class="absolute bottom-0 left-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
          Remove File
        </span>
      </button>
      {/* TODO: Use Portals to make the modal fit the whole screen */}
      {isModalOpen && (
        <div
          onClick={closeModal}
          class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 m-16"
        >
          <div class="relative p-8 max-w-screen-md max-h-screen-md">
            <img
              src={fileUrl}
              alt="Enlarged file preview"
              class="max-w-80 max-h-80"
            />
            <Icon
              id="Close"
              onClick={toggleModal}
              width={24}
              height={24}
              class="absolute cursor-pointer top-0 right-4 bg-white p-1 rounded-full text-black"
              aria-label="Close"
            />
          </div>
        </div>
      )}
    </div>
  );
}
