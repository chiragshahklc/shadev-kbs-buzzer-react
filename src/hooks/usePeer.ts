import { useState, useEffect, useReducer, Reducer } from "react"
import { Peer, DataConnection } from "peerjs"

enum ActionKind {
  SET_PEER_ID = "SET_PEER_ID",
  SET_REMOTE_ID = "SET_REMOTE_ID",
}

type IState = {
  peerId: string
  remoteId: string
}

type IAction =
  | { type: ActionKind.SET_PEER_ID; payload: string }
  | { type: ActionKind.SET_REMOTE_ID; payload: string }

const reducer: Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case ActionKind.SET_PEER_ID:
      return { ...state, peerId: action.payload }
    case ActionKind.SET_REMOTE_ID:
      return { ...state, remoteId: action.payload }
    default:
      return state
  }
}

const initialState: IState = {
  peerId: "",
  remoteId: "",
}

export default () => {
  const [availablePeer, setAvailablePeer] = useState<Peer | null | undefined>(
    null
  )
  const [connections, setConnections] = useState<DataConnection[]>([])

  const [state, dispatch] = useReducer<Reducer<IState, IAction>>(
    reducer,
    initialState
  )

  const sendMessage = (payload: any) => {
    connections.forEach((conn) => {
      conn.send(payload)
    })
  }

  const setRemoteId = (remoteId: string) =>
    dispatch({ type: ActionKind.SET_REMOTE_ID, payload: remoteId })

  // effects
  useEffect(() => {
    setAvailablePeer(new Peer())
  }, [])

  useEffect(() => {
    if (!availablePeer) return

    availablePeer.on("open", (id) => {
      console.log("Peer opened!", " id: ", id)
      dispatch({ type: ActionKind.SET_PEER_ID, payload: id })
      // setPeerId(id)
    })

    availablePeer.on("connection", (conn) => {
      console.log("Peer connected!")

      conn.on("data", (data) => {
        console.log({ data })
      })

      setConnections((old) => [...old, conn])
    })

    return () => {
      availablePeer.off("open")
      availablePeer.off("connection")
    }
  }, [availablePeer])

  useEffect(() => {
    if (!availablePeer) return
    if (!state.remoteId) return

    const remote = availablePeer.connect(state.remoteId)

    remote.on("open", () => {
      console.log("Remote connected")

      remote.send("Bonjour")
    })

    remote.on("data", (data) => {
      console.log({ data })
    })

    remote.on("error", (e) => {
      console.log(e)
    })
    console.log({ availablePeer, remote, remoteId: state.remoteId })

    return () => {
      remote.off("open")
    }
  }, [state.remoteId, availablePeer])

  return { peerId: state.peerId, setRemoteId, sendMessage }
}
