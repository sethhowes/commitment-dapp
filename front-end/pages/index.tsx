import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Commitment</title>
      </Head>
      <main>
        <div className="text-center">
          <h1>
            Make a commitment
          </h1>
        </div>
        <div>
          <form>
            <input type="text" placeholder="text"/>
            <input type="submit" value=""/>
          </form>
        </div>
        <div>
       
        </div>
      </main>
    </>
  )
}