import React, { useCallback } from "react";
import { type MotionProps } from "framer-motion";
import { Modal } from "./Modal.js";
import { useNotifiedState } from "../util/notified-state.js";

type Hook = {
  modal: JSX.Element
  animate(show: boolean): Promise<void>
  mounted: boolean
}
type Props = MotionProps & { opacity?: number }
/** Presence-based, controlled modal (simple wrapper around `<Modal>`) , but `animate` already awaits until the state changes */
export function useModal(props: Props): Hook {
  const [show, setShow] = useNotifiedState(false)

  const animate = useCallback((show: boolean) => setShow(show), [setShow])

  return { modal: <Modal show={show} {...props} />, animate, mounted: show }
}
