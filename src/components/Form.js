import React, { useEffect, useState }  from 'react';
import '../App.css';

function Form(props) {

    return (
    <section>
      <h2 className="header-title">Создание анкеты {props.isFormValid}</h2>
      <form className="form">
        <label for="name" className="input-label">Имя:</label>
        <input 
          type="text" 
          placeholder="Имя" 
          id="name" 
          className="input"
          value={props.firstName}
          onChange={e => props.setFirstName(e.target.value)}
        />
        <div className="error">{props.firstNameError}</div>

        <label for="surname" className="input-label">Фамилия:</label>
        <input 
          type="text" 
          placeholder="Фамилия" 
          id="surname" 
          className="input"
          value={props.lastName}
          onChange={e => props.setLastName(e.target.value)}
        />
        <div className="error">{props.lastNameError}</div>

        <label for="date" className="input-label">Дата рождения:</label>
        <input 
          type="date" 
          id="date" 
          value={props.date}
          onChange={e => props.setDate(e.target.value)} 
        />
        <div className="error">{props.dateError}</div>

        <label for="phone" className="input-label">Телефон:</label>
        <input 
          type="text" 
          placeholder="Телефон" 
          id="phone" 
          className="input"
          value={props.phone}
          onChange={e => props.setPhone(e.target.value)} 
        />
        <div className="error">{props.phoneError}</div>

        <label for="site" className="input-label">Сайт:</label>
        <input 
          type="text" 
          placeholder="Сайт" 
          id="site" 
          className="input"
          value={props.site}
          onChange={e => props.setSite(e.target.value)} 
        />
        <div className="error">{props.siteError}</div>
      
        <label for="about" className="input-label">О себе:</label>
        <textarea 
          id="about"
          placeholder="О себе..."
          className="textarea"
          value={props.about}
          onChange={e => props.setAbout(e.target.value)} 
        />
        <div class="textarea-limit">
          {600 - props.about.length >= 0 ?
          <p>Для ввода доступно {600 - props.about.length} символов</p> :
          <p>Превышен лимит символов в поле</p>}
        </div> 

        <div className="error">{props.aboutError}</div>

        <label for="technologies" className="input-label">Стек технологий:</label>
        <textarea 
          id="technologies"
          placeholder="Стек технологий..."
          className="textarea"
          value={props.technologies}
          onChange={e => props.setTechnologies(e.target.value)} 
        />
        <div class="textarea-limit">
          {600 - props.technologies.length >= 0 ?
          <p>Для ввода доступно {600 - props.technologies.length} символов</p> :
          <p>Превышен лимит символов в поле</p>}
        </div> 
        <div className="error">{props.technologiesError}</div>

        <label for="project" className="input-label">Описание последнего проекта:</label>
        <textarea 
          maxlength="600"
          id="project"
          placeholder="Описание последнего проекта..."
          className="textarea"
          value={props.project}
          onChange={e => props.setProject(e.target.value)} 
        />
        <div class="textarea-limit">
          {600 - props.project.length >= 0 ?
          <p>Для ввода доступно {600 - props.project.length} символов</p> :
          <p>Превышен лимит символов в поле</p>}
        </div> 
        <div className="error">{props.projectError}</div>

        <div className="btn-container flex">
          <button className="btn btn-reset" onClick={e => props.onReset(e)}>Отмена</button>
          <button className="btn btn-submit" onClick={e => props.onSubmit(e)}>Сохранить</button>
        </div>
      </form>
    </section>
    )
  }


export default Form;