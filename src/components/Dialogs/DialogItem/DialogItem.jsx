import React from 'react';

import css from './DialogItem.module.css';

export default class DialogItem extends React.Component {
    constructor(props) {
        super();
    }
    render() {
        let message;
        if (this.props.fromMe) {
            message = 
            <div className={css.withYou}>
                <div className={css.you}>
                    Вы:
                </div>
                <div className={css.message}>
                    {this.props.message}
                </div>
            </div>
        } else {
            message = 
            <div className={css.messageBlock, css.message}>
                {this.props.message}
            </div>
        }
        return (
            <div className={css.dialogBlock}>
                <div className={css.blockItem}>
                    <img className={css.photo} src={this.props.photoId}></img>
                    <div className={css.info}>
                        <div className={css.name}>
                            {this.props.name}
                        </div>
                        {message}
                    </div>
                </div>
            </div>
        );
    }
}