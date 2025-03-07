'use client';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
// import { Home } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import SearchBar from '@/app/(company)/_components/searchBar';
import { routes } from '@/config/routes';
import dynamic from 'next/dynamic';
import { Separator } from '@/components/ui/separator';
import { useMediaQuery } from 'react-responsive';

import './navmenu.css';

const NavIcons = dynamic(() => import('./navIcons'), {
  ssr: false,
});

export function NavMenu() {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  return (
    <div className='sticky top-0  z-50 w-full flex flex-col md:flex-row bg-white items-center justify-between gap-2 p-2 h-full'>
      <div className='flex flex-col items-center justify-center w-full md:w-auto mb-2  md:mb-0'>
        <Link href='/'>
          <Image
            src='/images/logo/logo.webp'
            alt='Company logo'
            // width={isMobile ? 300 : 200}
            // height={isMobile ? 80 : 70}
            // className='object-cover object-center'
            width={isMobile ? 300 : 200}
            height={isMobile ? 80 : 70}
            className='object-cover object-center'
            // style={{ width: 'auto', height: 'auto' }} // Maintain aspect ratio
            loading='eager'
            decoding='async'
            priority
          />
        </Link>
        {isMobile && (
          <div className='mt-0'>
            <Link
              href='/'
              className='text-center text-customBlue font-semibold'
            >
              Beranda
            </Link>
          </div>
        )}
        <Separator />
      </div>

      <div className='flex flex-col md:flex-row items-center justify-between w-full'>
        <NavigationMenu className='flex flex-row flex-wrap gap-2'>
          <NavigationMenuList className='flex flex-row gap-2'>
            {/* <NavigationMenuItem key='home'> */}
            <NavigationMenuItem className='hidden md:block'>
              <Link href='/' legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Beranda
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem key='about'>
              <NavigationMenuTrigger>Tentang Kami</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid gap-1.5 p-1 md:w-[200px] lg:w-[300px]'>
                  <ListItem href={routes.cms.directorsays}>
                    Pesan Direktur
                  </ListItem>
                  <ListItem href={routes.cms.aboutcompany}>
                    Tentang Perusahaan
                  </ListItem>
                  <ListItem href={routes.cms.visimisi}>Visi dan Misi</ListItem>
                  <ListItem href='/docs/installation'>
                    Sertifikasi Perusahaan
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href={routes.cms.categoryList} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Produk
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href={routes.cms.pricelist} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {isMobile ? (
                    <div className='mobile-view'>
                      <div>eCatalogue</div>
                      {/* <div>lkpp</div> */}
                    </div>
                  ) : (
                    'eCatalogue.lkpp'
                  )}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem className='hidden md:block'>
              <Link href='#' legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Berita
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem className='hidden md:block'>
              <Link href='#' legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Kontak Kami
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className='flex items-center gap-1 md:gap-1 mt-2 sm:mt-0sm-gap-0 md:mt-0 w-full'>
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, children, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      'block px-4 py-2 text-sm font-medium text-customBlue transition-colors duration-150 rounded-md hover:bg-customBlue hover:text-white focus:bg-customBlue focus:text-white focus:outline-none',
      className
    )}
    {...props}
  >
    {children}
  </a>
));
ListItem.displayName = 'ListItem';
