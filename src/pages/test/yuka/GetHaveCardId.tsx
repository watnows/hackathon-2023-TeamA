import { useState, useEffect } from 'react'
import Head from 'next/head'
import router from 'next/router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Inter } from 'next/font/google'
import styles from '@/styles/upgrade.module.css'
import Header from '@/conponents/Header'
import PrimaryBtn from '@/conponents/PrimaryBtn'
import makeMyCard from '@/utils/ok/makeMyCard'
import type { CardData } from '@/types/CardData'
import { auth } from '@/firebase';
import getHaveCardIds from '@/utils/ok/getHaveCardIds';

const inter = Inter({ subsets: ['latin'] })

export default function GetHaveCardId() {
  const [ids, setIds] = useState<string[]>([])

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        const haveCardIds = await getHaveCardIds(uid);
        setIds(haveCardIds)
      } else {
        console.log('not user')
      }
    });
  }, [])

  const show = ids.map((id) => <p key={id}>{id}</p>);

  const handleButton = async () => {
    console.log('button clicked');
    const data: CardData = {
      name: "deketa",
      organization: "test",
      x: "test",
      instagram: "test",
      text_color: "test",
      bg_color: "test",
    }
    await makeMyCard(data);
    router.push('/mycards');
  }

  return (
    <>
      <Head>
        <title>Who!</title>
        {/* <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />
        <div>
          <h2 className={styles.text}>{show}</h2>
        </div>
        <div style={{ width: '100%' }}>
          <PrimaryBtn text={'Button'} onClick={() => handleButton()} />
        </div>
      </main>
    </>
  )
}