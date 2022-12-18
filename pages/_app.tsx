import "../styles/globals.css"
import type {AppProps} from "next/app"
import {Provider} from "react-redux"
import {store, persistor} from "store"
import {PersistGate} from "redux-persist/integration/react"

export default function App({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    )
}
