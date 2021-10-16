import React from 'react';
import '../App.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <section>
      <h2 className="header-title">Создание анкеты</h2>
      <form className="form">
        <label for="name" className="input-label">Имя:</label>
        <input 
          type="text" 
          placeholder="Имя" 
          id="name" 
          className="input"
          value={this.props.data.state.firstName}
          onChange={e => this.props.data.setState({firstName: e.target.value})}
        />
        <div className="error">{this.props.data.state.firstNameError}</div>

        <label for="surname" className="input-label">Фамилия:</label>
        <input 
          type="text" 
          placeholder="Фамилия" 
          id="surname" 
          className="input"
          value={this.props.data.state.lastName}
          onChange={e => this.props.data.setState({lastName: e.target.value})}
        />
        <div className="error">{this.props.data.state.lastNameError}</div>

        <label for="date" className="input-label">Дата рождения:</label>
        <input 
          type="date" 
          id="date" 
          value={this.props.data.state.date}
          onChange={e => this.props.data.setState({date: e.target.value})} 
        />
        <div className="error">{this.props.data.state.dateError}</div>

        <label for="phone" className="input-label">Телефон:</label>
        <input 
          type="text" 
          placeholder="Телефон" 
          id="phone" 
          className="input"
          value={this.props.data.state.phone}
          onChange={e => this.props.data.setState({phone: e.target.value})} 
        />
        <div className="error">{this.props.data.state.phoneError}</div>

        <label for="site" className="input-label">Сайт:</label>
        <input 
          type="text" 
          placeholder="Сайт" 
          id="site" 
          className="input"
          value={this.props.data.state.site}
          onChange={e => this.props.data.setState({site: e.target.value})} 
        />
        <div className="error">{this.props.data.state.siteError}</div>
      
        <label for="about" className="input-label">О себе:</label>
        <textarea 
          id="about"
          placeholder="О себе..."
          className="textarea"
          value={this.props.data.state.about}
          onChange={e => this.props.data.setState({about: e.target.value})} 
        />
        <div class="textarea-limit">
          {600 - this.props.data.state.about.length >= 0 ?
          <p>Для ввода доступно {600 - this.props.data.state.about.length} символов</p> :
          <p>Превышен лимит символов в поле</p>}
        </div> 

        <div className="error">{this.props.data.state.aboutError}</div>

        <label for="technologies" className="input-label">Стек технологий:</label>
        <textarea 
          id="technologies"
          placeholder="Стек технологий..."
          className="textarea"
          value={this.props.data.state.technologies}
          onChange={e => this.props.data.setState({technologies: e.target.value})} 
        />
        <div class="textarea-limit">
          {600 - this.props.data.state.technologies.length >= 0 ?
          <p>Для ввода доступно {600 - this.props.data.state.technologies.length} символов</p> :
          <p>Превышен лимит символов в поле</p>}
        </div> 
        <div className="error">{this.props.data.state.technologiesError}</div>

        <label for="project" className="input-label">Описание последнего проекта:</label>
        <textarea 
          maxlength="600"
          id="project"
          placeholder="Описание последнего проекта..."
          className="textarea"
          value={this.props.data.state.project}
          onChange={e => this.props.data.setState({project: e.target.value})} 
        />
        <div class="textarea-limit">
          {600 - this.props.data.state.project.length >= 0 ?
          <p>Для ввода доступно {600 - this.props.data.state.project.length} символов</p> :
          <p>Превышен лимит символов в поле</p>}
        </div> 
        <div className="error">{this.props.data.state.projectError}</div>

        <div className="btn-container flex">
          <button className="btn btn-reset" onClick={e => this.props.data.onReset(e)}>Отмена</button>
          <button className="btn btn-submit" onClick={e => this.props.data.onSubmit(e)}>Сохранить</button>
        </div>
      </form>
    </section>
    )
  }
}

export default Form;