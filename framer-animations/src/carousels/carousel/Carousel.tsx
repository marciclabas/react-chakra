import React, { Key, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SwipeDirection } from "../types.js";


type Variant = {
  dir: SwipeDirection
  skipAnimation?: boolean
}

const variants = (axis: 'x' | 'y') => ({
  enter: ({ dir, skipAnimation }: Variant) => {
    return skipAnimation ? {
      [axis]: dir === 'left' ? '100%' : '-100%',
      zIndex: 0,
      scale: 0.5,
    } : {
      [axis]: dir === 'left' ? '100%' : '-100%',
      zIndex: 0
    }
  },
  center: ({ skipAnimation }: Variant) => {
    return skipAnimation ? {
      [axis]: 0,
      scale: 1,
      zIndex: 1,
      transition: {
        scale: { duration: 0.1, delay: 0.7 },
        [axis]: { duration: 0.3, delay: 0.4, ease: [0, 0.9, 0.1, 0.9] }
      }
    } : {
      [axis]: 0,
      scale: 1,
      zIndex: 1
    }
  },
  exit: ({ dir, skipAnimation }: Variant) => {
    return skipAnimation ? {
      [axis]: dir === 'left' ? '-100%' : '100%',
      zIndex: 0,
      scale: 0.5,
      transition: {
        scale: { duration: 0.1 },
        [axis]: { delay: 0.1, duration: 0.3, ease: [0.9, 0.1, 0.9, 0] }
      }
    } : {
      [axis]: dir === 'left' ? '-100%' : '100%',
      zIndex: 0,
    }
  }
})

export type Props = {
  move?(dir: SwipeDirection): void
  page: Key
  item: JSX.Element
  direction?: SwipeDirection
  axis?: 'x' | 'y'
  skipAnimation?: boolean
  swipeThreshold?: number
}

/** Controlled, unstyled Carousel
 * - `move`: callback called when the carousel is dragged to one side
 * - `item`: currently displayed item
 * - `page`: `key` of the item
 * - `direction`: animation direction when switching pages
 * - `skipAnimation`: whether to perform a 'skipping' animation when switching pages
 */
export function Carousel({ move, direction, page, item, skipAnimation, swipeThreshold, ...props }: Props) {
  const axis = props.axis ?? 'x'
  const vars = useMemo(() => variants(axis), [axis])
  return (
    (
      <div style={{ height: '100%', width: '100%', overflow: 'hidden', position: 'relative' }}>
        <AnimatePresence initial={false} custom={{ dir: direction, skipAnimation }}>
          <motion.div key={page} custom={{ dir: direction, skipAnimation }}
            variants={vars} initial="enter" animate="center"
            exit='exit' dragDirectionLock
            style={{ height: '100%', width: '100%', position: 'absolute' }}
            drag={axis}
            dragElastic={1} dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0}}
            transition={{
              [axis]: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = Math.abs(offset[axis])*velocity[axis]
              if (swipe < -(swipeThreshold ?? 1e4)) {
                move?.('left')
              }
              else if (swipe > (swipeThreshold ?? 1e4))
                move?.('right')
            }}
          >
            {item}
          </motion.div>
        </AnimatePresence>
      </div>
    )
  )
}

export default Carousel