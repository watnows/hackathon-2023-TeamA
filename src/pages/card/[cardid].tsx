import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/card-detail.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from '@/conponents/Header'
import Card from '@/conponents/Card'
import DisplayText from '@/conponents/DisplayText'
import ShareButton from '@/conponents/ShareButton'


const inter = Inter({ subsets: ['latin'] })

export default function Detail() {
  const router = useRouter();
  const cardid = router.query.cardid as string;
  const data = {
    id: "2",
    name: "こたろう",
    organization: "watnow",
    x: "id",
    instagram: "kkkk",
    others: "https://my-portfolio-yukachoco.vercel.app/",
    urlEnabled: true,
    textColor: "#def190",
    bgColor: "#124c6b",
    onClickHandler: () => { },
  }

  const xURL = `https://twitter.com/${data.x}`;
  const InstagramUrl = `https://instagram.com/${data.instagram}`;

  return (
    <>
      <Head>
        <title>Who!</title>
        {/* <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header useSearchIcon useMenuIcon />
        <div className={styles.card_container}>
          <div className={styles.card}>
            <Card id={data.id} name={data.name} organization={data.organization} x={data.x} instagram={data.instagram} others={data.others} urlEnabled={data.urlEnabled} textColor={data.textColor} bgColor={data.bgColor} onClickHandler={() => console.log('完了')} />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.infoitem1}>
            <DisplayText title="氏名" detail={data.name} />
          </div>
          <div className={styles.infoitem}>
            <DisplayText title="X" detail={data.x} url={xURL}/>
          </div>
          <div className={styles.infoitem}>
            <DisplayText title="Instagram" detail={data.instagram} url={InstagramUrl}/>
          </div>
          <div className={styles.infoitem}>
            <DisplayText title="orgnization" detail={data.organization}/>
          </div>
        </div>
        <ShareButton id="68nUIBWcWlpw2sJV3wGh"/>
      </main>
    </>
  )
}
