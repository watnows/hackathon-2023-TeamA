import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useUser from '@/hooks/useUser'
import styles from '@/styles/CardDetail.module.css'
import { Typography } from '@mui/material'
import Header from '@/conponents/Header'
import Card from '@/conponents/Card'
import DisplayText from '@/conponents/DisplayText'
import SecondaryButton from '@/conponents/SecondaryButton'
import ShareButton from '@/conponents/ShareButton'
import type { CardData } from '@/types/CardData'
import getCardDetils from '@/utils/ok/getCardDetils'
import { getURL } from '@/utils/ok/getURL'
import addHaveCardId from '@/utils/ok/addHaveCardId'
import getCardType from '@/utils/ok/getCardType'

export default function Index() {
  const router = useRouter();
  const cardId = router.query.cardid as string;

  const [cardData, setCardData] = useState<CardData | null>(null);
  const [cardType, setCardType] = useState<'have' | 'my' | 'undefined'>('undefined');
  const [registerLoading, setRegistertLoading] = useState<boolean>(false);

  const { userId, loading } = useUser();

  const isLoginUser = userId !== null;

  useEffect(() => {
    const fetchCardDetails = async () => {
      if (cardId) {
        const fetchCardData = await getCardDetils(cardId);
        setCardData(fetchCardData);
        if (userId) {
          const fetchCardType = await getCardType(userId, cardId);
          setCardType(fetchCardType);
        }
        //loading false
      }
    };
    fetchCardDetails();
  }, [cardId, userId])

  const handleRegisterButton = async () => {
    if (userId) {
      setRegistertLoading(true);
      const result = await addHaveCardId(userId, cardId);
      if (result) {
        setCardType('have');
      }
      else {
        console.error('登録に失敗しました');
      }
    } else {
      console.error('ログインユーザーではありません');
    }
  }

  const showButtons = () => {
    if (cardData?.authorId === userId) {
      return (<SecondaryButton text='この名刺を編集する' onClick={() => router.push(`/edit/card?cardId=${cardId}`)} />);
    } else if (cardType == 'have') {
      return (<SecondaryButton text='登録済み' disabled />);
    } else {
      return (
        <>
          <SecondaryButton text='この名刺を登録する' onClick={handleRegisterButton} disabled={!isLoginUser} />
          {
            !isLoginUser && (
              <>
                <SecondaryButton text='ログインする' onClick={() => router.push(`/?nextPage=${router.asPath}`)} />
                <Typography sx={{ textAlign: 'center' }}>※名刺の登録にはログインが必要です</Typography>
              </>
            )
          }
        </>
      )
    }
  }

  if (loading || registerLoading) {
    return (
      <>
        <main>
          <h1>Loading...</h1>
        </main>
      </>
    )
  }

  if (cardData) {
    if (cardData.protected && cardType !== 'have') {
      return (
        <main className='error'>
          <Header useSearchIcon useMenuIcon />
          <div>
            <h1>この名刺は閲覧できません</h1>
            <p>※この名刺は本人が作成した名刺ではないため、作成者しか閲覧できません。</p>
          </div>
        </main>
      )
    }
    return (
      <>
        <Head>
          <title>{cardData.name}さんの名刺-Who!</title>
        </Head>

        <main>
          <Header useSearchIcon useMenuIcon />

          <div className={styles.container}>
            <Card {...cardData} urlEnabled />
          </div>

          <div className={styles.container}>
            <div className={styles.infoitem}>
              <DisplayText title="氏名" detail={cardData.name} />
            </div>
            <div className={styles.infoitem}>
              <DisplayText title="orgnization" detail={cardData.organization} />
              <DisplayText title="X" detail={cardData.x} url={getURL("x", cardData.x)} isSNSId />
              <DisplayText title="Instagram" detail={cardData.instagram} url={getURL("instagram", cardData.instagram)} isSNSId />
            </div>
          </div>

          <div className={styles.container}>
            {showButtons()}
          </div>

          <ShareButton id="68nUIBWcWlpw2sJV3wGh" />
        </main>
      </>
    )
  } else {
    return (
      <main className='error'>
        <Header useSearchIcon useMenuIcon />
        <h1>存在しない名刺です</h1>
      </main>
    )
  }

}
