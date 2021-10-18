import React from 'react';
import '../App.css';

function FormData(props) {

    return (
      <section className="form-data">
        <div className="wrapper">
          <h2 className="form-data-title">{props.firstName} {props.lastName}</h2>
          <ul className="form-data-list">
            <li>Дата рождения: {props.date}</li>
            <li>Телефон: {props.phone}</li>
            <li>Сайт: {props.site}</li>
            <li>О себе: {props.about}</li>
            <li>Технологии: {props.technologies}</li>
            <li>Описание проекта: {props.project}</li>
          </ul>
        </div>
      </section>
    )

}

export default FormData;

