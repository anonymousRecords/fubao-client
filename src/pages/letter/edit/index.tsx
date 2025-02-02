import Header from '@/components/header/header';
import LetterCard from '@/components/letter-card/letter-card';
import * as Style from './index.css';
import { useGetPost } from '@/apis/getPost';
import DateTimeFormat from '@/utils/dateTimeFormat';
import { useLetterContext } from '@/hooks/useLetterContext';
import { patchPost } from '@/apis/patchPost';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import Button from '@/components/button';

export default function Edit() {
  const router = useRouter();
  const letterId = Number(router.query.postId);
  const { letterImage, letterText } = useLetterContext();

  const { data } = useGetPost({ postId: letterId });

  const { mutate, data: patchData } = useMutation({
    mutationKey: ['patchPost', letterId],
    mutationFn: () => patchPost({ postId: letterId, image: letterImage, content: letterText }),
    onSuccess: (data) => {
      console.log('patchSuccess', data);
      router.push(
        {
          pathname: `/letter/preview?postId=${data.data.data.postId}`,
          query: {
            postId: data.data.data.postId,
          },
        },
        `/letter/preview/${data.data.data.postId}`,
      );
    },
  });

  const handleSubmitClick = async () => {
    mutate();
    console.log('patchData', patchData);
  };

  return (
    <div css={Style.wrapper}>
      <Header leftBackPage hasLeftBackModal={false}>
        푸바오에게 편지쓰기
      </Header>
      <div css={Style.main.card}>
        {data && (
          <LetterCard
            variant="textCount"
            apiImage={data?.data.imageUrl}
            apiText={data?.data.content}
            apiDate={DateTimeFormat(data?.data.date)}
          />
        )}
      </div>
      <div css={Style.main.button}>
        <Button variants="primary" onClick={handleSubmitClick}>
          편지 완성하기
        </Button>
      </div>
    </div>
  );
}
