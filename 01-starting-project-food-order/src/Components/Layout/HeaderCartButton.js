import React, {useContext, useEffect, useState} from "react"
import CartIcon from "../Cart/CartIcon"
import CartContext from "../../store/cart-context"
import classes from './HeaderCartButton.module.css'
const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext)
    const {items} = cartCtx
    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)
    const [buttonBump, setButtonBump] = useState(false)
    const btnClasses = `${classes.button} ${buttonBump ? classes.bump : ''}`

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setButtonBump(true)
        const timer = setTimeout(() => {
            setButtonBump(false)
        }, 300)
        return (() => {
            clearTimeout(timer)
        })
    }, [items])

    return (
        <button className={btnClasses} onClick={props.onShowCart}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton

