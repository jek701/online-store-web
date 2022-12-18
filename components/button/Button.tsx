import React from "react"
import styles from "./Button.module.css"
import cn from "classnames"

interface ButtonProps {
    disabled?: boolean
    onClick?: () => void
    children: React.ReactNode
    type?: "primary" | "secondary" | "danger"
    fullWidth?: boolean
}

const Button: React.FC<ButtonProps> = ({disabled, type, onClick, children, fullWidth}) => {
    return (
        <button onClick={onClick} className={cn(styles.button, {[styles.fullW]: fullWidth})} disabled={disabled}>{children}</button>
    )
}

export default Button