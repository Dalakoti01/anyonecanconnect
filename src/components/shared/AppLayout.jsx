'use client';

import { useSelector } from 'react-redux';
import { SessionProvider } from "next-auth/react";
import GuestFooter from './GuestFooter';
import FreelancersFooter from '../freelancer/FreelancerFooter';
import ClientFooter from '../client/ClientFooter';
import { usePathname } from 'next/navigation';
import ClientNavbar from '../client/ClientNavbar';
import FreelancerNavbar from '../freelancer/FreelancerNavbar';
import SessionRedirectWrapper from '../SessionsRedirectWrapper';
import { useEffect } from 'react';

export default function AppLayout({ children }) {
  const { user } = useSelector((state) => state.auth);
  const pathName = usePathname()
   const noFooterRoutes = ['/login','/signup','/forget-password']
   const hideFooter = noFooterRoutes.includes(pathName)

   useEffect(() => {
  if (user?.role === "freelancer" && pathName.startsWith("/client")) {
    router.push("/unauthorized");
  }
  if (user?.role === "client" && pathName.startsWith("/freelancer")) {
    router.push("/unauthorized");
  }
}, [pathName, user]);


  return (
    <SessionProvider>
      <SessionRedirectWrapper>

    <>
    {user && user.role === "freelancer" ?<FreelancerNavbar/> : user?.role==="client"? <ClientNavbar/> : null}
      <main>{children}</main>
 {!hideFooter && (
        !user
          ? <GuestFooter />
          : user?.role === 'freelancer'
            ? <FreelancersFooter />
            : <ClientFooter />
      )}    </>
            </SessionRedirectWrapper>

      </SessionProvider>
  );
}
