import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function CountDownTimer() {
    //input states
    const [hours, setHours] = useState('0');
    const [mins, setMins] = useState('0');
    const [secs, setSecs] = useState('0');

    //timer states 
    const [remainingSecs, setremainSecs] = useState(0);
    const [isActive, setisActive] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    //convert inputs to total seconds and start
    const startTime = () => {
        const total_secs = 
        (parseInt(hours || '0', 10) * 3600) +
        (parseInt(mins || '0', 10) * 60) +
        (parseInt(secs || '0', 10));

        if(total_secs <= 0) {
            Alert.alert("Invalid time. Enter a valid time > 0")
            return;
        }
        //set remaining time and boolean attributes to 
        //default values
        setremainSecs(total_secs);
        setisActive(true);
    };

    //handle the countdown interval
    useEffect(() => {
        if (isActive && remainingSecs > 0) {
            intervalRef.current - setInterval(() => {
                setremainSecs((prev) => prev - 1);
            }, 1000);
        } 
        else if (remainingSecs === 0 && isActive) {
            setisActive(false);
            if(intervalRef.current) {
                clearInterval(intervalRef.current);
                Alert.alert("Time's up.")
            }
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isActive, remainingSecs]);

    //pause and reset controls
    const Pause = () => setisActive(!isActive);
    const reset_timer = () => {
        setisActive(false);
        if(intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setremainSecs(0);
    };
    //format and display seconds in hours: mins: secs
    const display_Time = (total_secs: number) => {
        const h = Math.floor(total_secs) / 3600;
        const m = Math.floor(total_secs/3600) / 60; 
        const s = Math.floor(total_secs % 60);

        const padding = (num: number) => String(num).padStart(2,'0');
        return `${padding(h)}:${padding(m)}:${padding(s)}`;
    };
    return (
        <View style={styles.container}>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{}
})