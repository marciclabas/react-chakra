import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { range } from '@haskellian/range';

export type SlidingItemProps = { idx: number, currIdx: number }

export type SlidingCarouselConfig = {
  numBefore?: number
  numAfter?: number
}
export type SlidingCarouselProps = SlidingCarouselConfig & {
  min?: number
  maxExclusive?: number
	currIdx: number
	Item(p: SlidingItemProps): JSX.Element
}

/** Displays items in a sliding window around `currIdx`. Orientation? Wrap it in a flexbox! */
export function SlidingCarousel({ currIdx, Item, ...props }: SlidingCarouselProps) {
  const numBefore = props.numBefore ?? 3
  const numAfter = props.numAfter ?? 3
  const min = props.min ?? 0
  const maxExclusive = props.maxExclusive ?? Infinity
  const from = Math.max(currIdx-numBefore, min)
  const to = Math.min(currIdx + numAfter + 1, maxExclusive)
  const n = to - from
  const maxN = numBefore + 1 + numAfter

  if (n < 0)
    return null

  return (
    <AnimatePresence mode='popLayout' initial={false}>
      {range(from, to).map(idx => (
        <motion.div key={idx} layout
          exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1, transition: { duration: 1 }}}
          style={{ width: `${100/maxN}%` }}
        >
          <Item idx={idx} currIdx={currIdx} />
        </motion.div>
      ))}
    </AnimatePresence>
  )
}