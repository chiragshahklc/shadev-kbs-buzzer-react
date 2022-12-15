import { useState, useEffect, useReducer, Reducer } from "react"
import { Peer, DataConnection } from "peerjs"
// local imports
import {
  ActionKind,
  IAction,
  IState,
  IDataType,
  IDataKind,
} from "./usePeer.types"
import { Game, GameStatus, Player, isGame } from "../types"

const reducer: Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case ActionKind.SET_PEER_ID:
      return { ...state, peerId: action.payload }
    case ActionKind.SET_REMOTE_ID:
      return { ...state, remoteId: action.payload }
    case ActionKind.SET_GAME_STATUS:
      return { ...state, gameStatus: action.payload }
    case ActionKind.SET_PLAYERS:
      return { ...state, players: action.payload }
    case ActionKind.SET_INITIAL_TIME:
      return { ...state, initialTime: action.payload }
    default:
      return state
  }
}

const initialState: IState = {
  peerId: "",
  remoteId: "",
  gameStatus: "NOT_STARTED",
  players: [],
  initialTime: new Date(),
}

export default (onRemoteConnected?: () => void) => {
  const [availablePeer, setAvailablePeer] = useState<Peer | null | undefined>(
    null
  )
  const [connections, setConnections] = useState<DataConnection[]>([])

  const [state, dispatch] = useReducer<Reducer<IState, IAction>>(
    reducer,
    initialState
  )

  const syncGame = () => {
    connections.forEach((conn) => {
      const game: Game = {
        players: state.players,
        status: state.gameStatus,
        initialTime: state.initialTime,
      }

      const data: IDataType = {
        type: IDataKind.SYNC,
        payload: game,
      }
      conn.send(data)
    })
  }

  const onDataReceived = (data: unknown) => {
    const d = data as IDataType
    switch (d.type) {
      case IDataKind.SYNC:
        console.log(d.payload)
        break
      default:
        return
    }
  }

  const onRemoteDataReceived = (data: unknown) => {
    const d = data as IDataType
    switch (d.type) {
      case IDataKind.SYNC:
        {
          setGameStatus(d.payload.status)
          setPlayers(d.payload.players)
          setInitialTime(new Date(d.payload.initialTime))
        }
        break
      default:
        return
    }
  }

  const setRemoteId = (remoteId: string) =>
    dispatch({ type: ActionKind.SET_REMOTE_ID, payload: remoteId })

  const setGameStatus = (gameStatus: GameStatus) =>
    dispatch({ type: ActionKind.SET_GAME_STATUS, payload: gameStatus })

  const setPlayers = (players: Player[]) =>
    dispatch({ type: ActionKind.SET_PLAYERS, payload: players })

  const setInitialTime = (time: Date) =>
    dispatch({ type: ActionKind.SET_INITIAL_TIME, payload: time })

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

      conn.on("data", onDataReceived)

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
      if (onRemoteConnected) onRemoteConnected()
      console.log("Remote connected")
      remote.send("Bonjour!")
    })

    remote.on("data", onRemoteDataReceived)

    remote.on("error", (e) => {
      console.log(e)
    })
    console.log({ availablePeer, remote, remoteId: state.remoteId })

    return () => {
      remote.off("open")
    }
  }, [state.remoteId, availablePeer])

  return {
    peerId: state.peerId,
    players: state.players,
    gameStatus: state.gameStatus,
    initialTime: state.initialTime,
    setRemoteId,
    setGameStatus,
    setPlayers,
    setInitialTime,
    syncGame,
    connections,
  }
}
