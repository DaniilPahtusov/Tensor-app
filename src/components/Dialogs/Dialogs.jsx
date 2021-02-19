import React from 'react';

import DialogItem from './DialogItem/DialogItem';
import * as axios from 'axios';

export default function Dialogs(props) {
    if (props.dialogsData.length === 0) {
        axios.get('').then((dialogInfo) => {
            props.setDialogs(dialogInfo);
        });
        props.setDialogs([{
            id: 1, 
            name: 'Александр', 
            message: 'Привет!', 
            fromMe: true
        },
        {
            id: 2, 
            name: 'Виктор', 
            message: 'Хей', 
            fromMe: false
        },
        {
            id: 3, 
            name: 'Анастасия', 
            message: 'Давай погуляем?', 
            fromMe: false
        },
        {
            id: 4, 
            name: 'Даниил', 
            message: 'посмотри тут интересные штуки показывают', 
            fromMe: true
        },
        {
            id: 5, 
            name: 'Кирилл', 
            message: 'Как дела?', 
            fromMe: false
        },
        {
            id: 6, 
            name: 'Дарья', 
            message: 'Алаалалалалалал', 
            fromMe: false
        }]);
    }
    let DialogData = props.dialogsData.map((el) => 
        <DialogItem 
            id={el.id} 
            name={el.name}
            message={el.message}
            fromMe={el.fromMe} 
        />
    );

    return (
        <div>
            {DialogData}
        </div>
    )
}