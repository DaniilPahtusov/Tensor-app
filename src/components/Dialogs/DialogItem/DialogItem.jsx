import React from 'react';

import css from './DialogItem.module.css';

export default function DialogItem(props) {
    let message;
    if (props.fromMe) {
        message = 
        <div className={css.withYou}>
            <div className={css.you}>
                Вы:
            </div>
            <div className={css.message}>
                {props.message}
            </div>
        </div>
    } else {
        message = 
        <div className={css.messageBlock, css.message}>
            {props.message}
        </div>
    }
    return (
        <div className={css.dialogBlock}>
            <div className={css.blockItem}>
                <div className={css.photo}></div>
                <div className={css.info}>
                    <div className={css.name}>
                        {props.name}
                    </div>
                    {message}
                </div>
            </div>
        </div>
    );
}