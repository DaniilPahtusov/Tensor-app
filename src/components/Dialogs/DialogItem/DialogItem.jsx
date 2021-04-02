import React from 'react';

import css from './DialogItem.module.css';

export default class DialogItem extends React.Component {
    constructor() {
        super();
        this.dialogClick = this.dialogClick.bind(this);
    }

    dialogClick() {
        this.props.dialogClick(this.props.id, this.props.name);
    }

    render() {
        let message;
        let needMarker = this.props.activeDialogId === this.props.id;
        let markerBlock;
        if (needMarker) {
            markerBlock = <div className={css.markerBlock}></div>
        } else {
            markerBlock = <div></div>
        }
        if (this.props.sender === this.props.currentLogin) {
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
            <div className={css.dialogBlock} onClick={this.dialogClick}>
                {markerBlock}
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