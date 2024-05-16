import React, { useCallback } from "react";
import { Modal } from "./Modal.js";
import { useNotifiedState } from "../util/notified-state.js";
/** Presence-based, controlled modal (simple wrapper around `<Modal>`) , but `animate` already awaits until the state changes */
export function useModal(props) {
    const [show, setShow] = useNotifiedState(false);
    const animate = useCallback((show) => setShow(show), [setShow]);
    return { modal: React.createElement(Modal, Object.assign({ show: show }, props)), animate, mounted: show };
}
