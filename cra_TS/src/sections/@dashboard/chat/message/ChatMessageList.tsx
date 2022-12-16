import { useEffect, useState, useRef } from 'react';
// @types
import { IChatConversation } from '../../../../@types/chat';
//
import Scrollbar from '../../../../components/scrollbar';
import Lightbox from '../../../../components/lightbox';
//
import ChatMessageItem from './ChatMessageItem';

// ----------------------------------------------------------------------

type Props = {
  conversation: IChatConversation;
};

export default function ChatMessageList({ conversation }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [selectedImage, setSelectedImage] = useState<number>(-1);

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [conversation.messages]);

  const imagesLightbox = conversation.messages
    .filter((messages) => messages.contentType === 'image')
    .map((messages) => ({ src: messages.body }));

  const handleOpenLightbox = (imageUrl: string) => {
    const imageIndex = imagesLightbox.findIndex((image) => image.src === imageUrl);
    setSelectedImage(imageIndex);
  };

  const handleCloseLightbox = () => {
    setSelectedImage(-1);
  };

  return (
    <>
      <Scrollbar
        scrollableNodeProps={{
          ref: scrollRef,
        }}
        sx={{ p: 3, height: 1 }}
      >
        {conversation.messages.map((message) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            conversation={conversation}
            onOpenLightbox={() => handleOpenLightbox(message.body)}
          />
        ))}
      </Scrollbar>

      <Lightbox
        index={selectedImage}
        slides={imagesLightbox}
        open={selectedImage >= 0}
        close={handleCloseLightbox}
      />
    </>
  );
}
