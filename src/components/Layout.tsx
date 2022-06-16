import React from 'react';
import Head from 'next/head';
import { WithChildrenProps } from 'types';

type LayoutProps = WithChildrenProps;

export function Layout({ children }: LayoutProps) {
    return (
        <div className="dark h-full min-h-screen w-screen">
            <div className="flex flex-col items-center justify-center">
                <Head>
                    <title>hi</title>
                    <meta name="description" content="" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className="flex min-h-screen w-screen grow flex-col dark:bg-zinc-900 dark:text-white">
                    {children}
                </main>
            </div>
        </div>
    );
}
