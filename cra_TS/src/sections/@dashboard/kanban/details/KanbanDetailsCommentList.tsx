import { useState } from 'react';
// @mui
import { Stack, Avatar, Typography } from '@mui/material';
// utils
import { fToNow } from '../../../../utils/formatTime';
// @types
import { IKanbanComment } from '../../../../@types/kanban';
// components
import Image from '../../../../components/image';
import Lightbox from '../../../../components/lightbox';

// ----------------------------------------------------------------------

type Props = {
  comments: IKanbanComment[];
};

export default function KanbanDetailsCommentList({ comments }: Props) {
  const [selectedImage, setSelectedImage] = useState<number>(-1);

  const imagesLightbox = comments
    .filter((comment) => comment.messageType === 'image')
    .map((item) => ({ src: item.message }));

  const handleOpenLightbox = (imageUrl: string) => {
    const imageIndex = imagesLightbox.findIndex((image) => image.src === imageUrl);
    setSelectedImage(imageIndex);
  };

  const handleCloseLightbox = () => {
    setSelectedImage(-1);
  };

  return (
    <>
      <Stack
        spacing={3}
        sx={{
          py: 3,
          px: 2.5,
          bgcolor: 'background.neutral',
        }}
      >
        {comments.map((comment) => (
          <Stack key={comment.id} direction="row" spacing={2}>
            <Avatar src={comment.avatar} />

            <Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle2"> {comment.name}</Typography>

                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {fToNow(comment.createdAt)}
                </Typography>
              </Stack>

              {comment.messageType === 'image' ? (
                <Image
                  alt={comment.message}
                  src={comment.message}
                  onClick={() => handleOpenLightbox(comment.message)}
                  sx={{
                    mt: 1,
                    borderRadius: 1,
                  }}
                />
              ) : (
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {comment.message}
                </Typography>
              )}
            </Stack>
          </Stack>
        ))}
      </Stack>

      <Lightbox
        index={selectedImage}
        slides={imagesLightbox}
        open={selectedImage >= 0}
        close={handleCloseLightbox}
      />
    </>
  );
}
