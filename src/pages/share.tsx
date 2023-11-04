import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Share.module.css'
import router, { useRouter } from 'next/router'
import Header from '@/conponents/Header'
import DisplayCard from '@/conponents/Card'
import PrimaryButton from '@/conponents/PrimaryButton'
import QRCode from '@/conponents/QRCode'
import { useEffect, useState } from 'react'
import { CardData } from '@/types/CardData'
import useUser from '@/hooks/useUser'
import getCardDetils from '@/utils/ok/getCardDetils'
import getMyCardDetails from '@/utils/ok/getMyCardDetails'


export default function Detail() {
  // const router = useRouter();
  // const cardid = router.query.cardid as string;
  const [cardData, setCardDatas] = useState<CardData[] | null>([])
  const { userId, loading } = useUser()
  useEffect(() => {
    const fetchUsers = async () => {
      if (userId) {
        const cardData = await getMyCardDetails(userId)
        setCardDatas(cardData)
      }
    }
    fetchUsers()
  }, [userId])

  if (loading) {
    return (
      <>
        <Head>
          <title>Who!</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h1>Loading...</h1>
        </main>
      </>
    );
  }

  const display = cardData.map((data) => {
    return <DisplayCard key={data.id} {...data} urlEnabled />
  })

  if (cardData[0]) {
    console.log(cardData[0].id)
    return (
      <>
        <Head>
          <title>Who!</title>
          {/* <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <div className={styles.list}>
            <Header useMenuIcon />
            <div className={styles.qrcode}>
              <QRCode url={`https://whooo.netlify.app/card/${cardData[0].id}`} />
            </div>
            <div className={styles.cardlist}>
              {display}
            </div>

          </div>

          <div className={styles.returnbutton}>
            <PrimaryButton
              text={'ホームに戻る'}
              onClick={() => router.push('/cards')}
            />
          </div>
        </main>
      </>
    )
  }
}