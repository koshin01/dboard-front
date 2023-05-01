import Head from 'next/head'
import {siteMeta} from '@/lib/constants'
const {siteTitle, siteDesc, siteUrl, siteLocale, siteType, siteIcon} = siteMeta

import { useRouter } from 'next/router'

export default function Meta({pageImg, pageImgW, pageImgH}) {

    const router = useRouter()
    const url = `${siteUrl}${router.asPath}`

    const imgUrl = pageImg.startsWith("https") ? pageImg: `${siteUrl}${pageImg}`

    const twitterUserName = process.env.NEXT_PUBLIC_YOUR_TWITTER_USER_NAME;

    return (
        <Head>
            <title>{siteTitle}</title>
            <meta property="og:title" content = {siteTitle} />
            <meta name = "description" content = {siteDesc} />
            <meta property="og:description" content = {siteDesc} />
            <link rel = "canonical" href = {url} />
            <meta property="og:url" content = {url} />

            <meta property = "og:site_name" content = {siteTitle} />
            <meta property = "og:type" content = {siteType} />
            <meta property = "og:locale" content = {siteLocale} />

            <link rel = "icon" href = {siteIcon} />
            <link rel = "apple-touch-icon" href= {siteIcon} />

            <meta property="og:image" content = {imgUrl} />
            <meta property="og:image:width" content = {pageImgW} />
            <meta property="og:image:height" content = {pageImgH} />
            <meta name = "twitter:card" content = "summary_large_image" />
            <meta name = "twitter:site" content = {twitterUserName} />
        </Head>
    )
}