import React from 'react';
import '../App.css';

class FormData extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <section className="form-data">
        <div className="wrapper">
          <h2 className="form-data-title">{this.props.data.firstName} {this.props.data.lastName}</h2>
          <ul className="form-data-list">
            <li>Дата рождения: {this.props.data.date}</li>
            <li>Телефон: {this.props.data.phone}</li>
            <li>Сайт: {this.props.data.site}</li>
            <li>О себе: {this.props.data.about}</li>
            <li>Технологии: {this.props.data.technologies}</li>
            <li>Описание проекта: {this.props.data.project}</li>
            <li></li>
          </ul>
        </div>
      </section>
    )
  }
}

export default FormData;
