import React from 'react';

import DialogItem from './DialogItem/DialogItem';
import * as axios from 'axios';
import css from './Dialogs.module.css';

export default class Dialogs extends React.Component {
    // if (props.dialogsData.length === 0) {
    //     axios.get('').then((dialogInfo) => {
    //         props.setDialogs(dialogInfo);
    //     });
    //     props.setDialogs([{
    //         id: 1, 
    //         name: 'Александр', 
    //         message: 'Привет!', 
    //         fromMe: true
    //     },
    //     {
    //         id: 2, 
    //         name: 'Виктор', 
    //         message: 'Хей', 
    //         fromMe: false
    //     },
    //     {
    //         id: 3, 
    //         name: 'Анастасия', 
    //         message: 'Давай погуляем?', 
    //         fromMe: false
    //     },
    //     {
    //         id: 4, 
    //         name: 'Даниил', 
    //         message: 'посмотри тут интересные штуки показывают', 
    //         fromMe: true
    //     },
    //     {
    //         id: 5, 
    //         name: 'Кирилл', 
    //         message: 'Как дела?', 
    //         fromMe: false
    //     },
    //     {
    //         id: 6, 
    //         name: 'Дарья', 
    //         message: 'Алаалалалалалал', 
    //         fromMe: false
    //     }]);
    // }
    constructor() {
        super();
    }
    render() {
        axios.post('http://127.0.0.1:5000/dialogs', {
                login: this.props.login
            }).then((response) => {
                return response;
            });
        const DialogData = this.props.dialogsData.map((el) => 
            <DialogItem 
                id={1} 
                name={el.name}
                message={el.message}
                photoId={el.photoId}
                fromMe={false} 
            />
        );
        return (
            <div>
                {DialogData}
            </div>
        )
    }
}