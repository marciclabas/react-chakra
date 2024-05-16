import React, { Key } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type SwipeDirection = 'left' | 'right' | 'up' | 'down'

type Variant = {
  dir: SwipeDirection
  skipAnimation?: boolean
}

const variants = {
  enter: ({ dir, skipAnimation }: Variant) => {
    return skipAnimation ? {
      x: dir === 'left' ? '100%' : dir === 'right' ? '-100%' : 0,
      y: dir === 'up' ? '100%' : dir === 'down' ? '-100%' : 0,
      zIndex: 0,
      scale: 0.5,
    } : {
      x: dir === 'left' ? '100%' : dir === 'right' ? '-100%' : 0,
      y: dir === 'up' ? '100%' : dir === 'down' ? '-100%' : 0,
      zIndex: 0
    }
  },
  center: ({ skipAnimation }: Variant) => {
    return skipAnimation ? {
      x: 0,
      y: 0,
      scale: 1,
      zIndex: 1,
      transition: {
        scale: { duration: 0.1, delay: 0.7 },
        x: { duration: 0.3, delay: 0.4, ease: [0, 0.9, 0.1, 0.9] },
        y: { duration: 0.3, delay: 0.4, ease: [0, 0.9, 0.1, 0.9] },
      }
    } : {
      x: 0,
      y: 0,
      scale: 1,
      zIndex: 1
    }
  },
  exit: ({ dir, skipAnimation }: Variant) => {
    return skipAnimation ? {
      x: dir === 'left' ? '-100%' : dir === 'right' ? '100%' : 0,
      y: dir === 'up' ? '-100%' : dir === 'down' ? '100%' : 0,
      zIndex: 0,
      scale: 0.5,
      transition: {
        scale: { duration: 0.1 },
        x: { delay: 0.1, duration: 0.3, ease: [0.9, 0.1, 0.9, 0] }
      }
    } : {
      x: dir === 'left' ? '-100%' : dir === 'right' ? '100%' : 0,
      y: dir === 'up' ? '-100%' : dir === 'down' ? '100%' : 0,
      zIndex: 0,
    }
  }
};

export type Props = {
  move?(dir: SwipeDirection): void
  page: Key
  item: JSX.Element
  direction?: SwipeDirection
  skipAnimation?: boolean
  swipeThresholdX?: number
  swipeThresholdY?: number
}

/** Controlled, unstyled carousel in both axes
 * - `move`: callback called when the carousel is dragged to one direction
 * - `item`: currently displayed item
 * - `page`: `key` of the item
 * - `direction`: animation direction when switching pages
 * - `skipAnimation`: whether to perform a 'skipping' animation when switching pages
 */
export function DirectionalCarousel({ move, direction, page, item, skipAnimation, ...props }: Props) {
  const swipeThresholdX = props.swipeThresholdX ?? 1e4
  const swipeThresholdY = props.swipeThresholdY ?? 1e4

  return (
    (
      <div style={{ height: '100%', width: '100%', overflow: 'hidden', position: 'relative' }}>
        <AnimatePresence initial={false} custom={{ dir: direction, skipAnimation }}>
          <motion.div key={page} custom={{ dir: direction, skipAnimation }}
            variants={variants} initial="enter" animate="center"
            exit='exit' dragDirectionLock
            style={{ height: '100%', width: '100%', position: 'absolute' }}
            drag dragElastic={1} dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              y: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            onDragEnd={(_, { offset, velocity }) => {
              const swipeX = Math.abs(offset.x)*velocity.x
              const swipeY = Math.abs(offset.y)*velocity.y

              if (swipeY < -(swipeThresholdY))
                move?.('up')
              else if (swipeY > (swipeThresholdY))
                move?.('down')
              else if (swipeX < -(swipeThresholdX))
                move?.('left')
              else if (swipeX > (swipeThresholdX))
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

export default DirectionalCarousel