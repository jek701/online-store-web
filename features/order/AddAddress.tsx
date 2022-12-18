import React, {useState} from "react"
import {Map, YMaps, ZoomControl} from "@pbe/react-yandex-maps"
import styles from "./AddAddress.module.css"
import {useDispatch} from "../../store"
import {updateAddress} from "../products/productSlice"
import {Button} from "antd"

interface AddAddressProps {
    setCenter: any
    setRegion: any
    center: any
    region: {
        center: number[]
        controls: any[]
        zoom: number
    }
    setModal: any
}

const AddAddress: React.FC<AddAddressProps> = ({region, setCenter, setRegion, setModal}) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const findMe = () => {
        setLoading(true)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                    setCenter(pos)
                    setRegion({center: [pos.lat, pos.lng], zoom: 17, controls: []})
                },
                function () {
                    alert(("enableGPS"))
                }
            )
        } else {
            alert(("enableGPS"))
        }
        setLoading(false)
    }

    const confirm = async () => {
        setLoading(true)
        await dispatch(updateAddress({lat: region.center[0], lng: region.center[1]}))
        setModal(false)
        setLoading(false)
    }

    return <>
        {
            <div className={styles.mainWrapper}>
                <div className={styles.bg} onClick={() => {
                    setModal(false)
                }}/>
                <div className={styles.mapWrapper}>
                    <YMaps>
                        <Map
                            state={region}
                            width="100%"
                            height="100%"
                            // @ts-ignore
                            onBoundsChange={ref => {
                                setLoading(true)
                                if (ref.originalEvent.newCenter !== region.center) {
                                    setCenter({
                                        lat: ref.originalEvent.newCenter[0],
                                        lng: ref.originalEvent.newCenter[1]
                                    })
                                    // @ts-ignore
                                    setRegion(prevState => {
                                            return {
                                                ...prevState,
                                                center: ref.originalEvent.newCenter,
                                                zoom: ref.originalEvent.newZoom
                                            }
                                        }
                                    )
                                }
                                setLoading(false)
                            }
                            }
                        >
                            <ZoomControl options={{position: {right: 25, left: "auto", bottom: 150}}}/>
                            <div className={styles.pin}>
                                <img src={"/images/pin.svg"} alt=""/>
                            </div>
                            <div className={styles.container}>
                                <div/>
                                <Button onClick={confirm} disabled={loading}>Подтвердить</Button>
                                <div id="findMe" className={styles.findMe} onClick={findMe}>
                                    <img src={"/images/gps.svg"} height="35" width="35" />
                                </div>
                            </div>
                        </Map>
                    </YMaps>
                </div>
            </div>
            }
            </>
        }

        export default AddAddress