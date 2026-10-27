'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="hero-wrap relative isolate overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="A bright, simple room with a sofa and daylight"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-40" aria-hidden="true" />
      <div className="relative w-full max-w-7xl mx-auto px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Find a room that matches your budget
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-base text-white/80 sm:text-lg"
          >
            Weekly and monthly rooms across Kenyan towns, with real photos, clear KES prices,
            house rules you can read first, and direct contact with the host.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center"
          >
            <Link href="/rooms" className="btn btn-primary w-full sm:w-auto">
              Browse rooms
            </Link>
            <Link href="/list-room" className="btn btn-outline-white w-full sm:w-auto">
              List a room
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
