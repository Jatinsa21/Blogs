import classes from './Alert.module.css'
import React from 'react'

export default function Alert({alert}) {
    return (<>
        <div className={classes.main}>
            <div className={classes.alert}>
                <p>{alert}</p>
            </div>
        </div>
        </>
    )
}
