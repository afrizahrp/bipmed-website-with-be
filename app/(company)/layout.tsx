// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: {
//     default: 'Alkes Terlengkap-bipmed',
//     template: '%s-Alkes Terlengkap | bipmed',
//   },
//   description: 'Terlengkap dan Terpercaya sejak dua dekade',
//   openGraph: {
//     title: 'bipmed-Alkes Terlengkap',
//     description: 'Terlengkap dan Terpercaya sejak dua dekade',
//     type: 'website',
//     locale: 'id_ID',
//     siteName: 'bipmed',
//     images: [
//       {
//         url: 'https://bipmed.vercel.app/images/logo.png',
//       },
//     ],
//   },
// };

export default function CompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
