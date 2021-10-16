import React from 'react';
import '../App.css';
import Form from './Form';
import FormData from './FormData';

class HW1 extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      date: '',
      phone: '',
      site:'',
      about: '',
      technologies: '',
      project: '',
      firstNameError: '',
      lastNameError: '',
      dateError: '',
      phoneError: '',
      siteError: '',
      aboutError: '',
      technologiesError: '',
      projectError: '',
      submit: false,
    }
  }

  validate() {
    let firstNameErr = '';
    let lastNameErr = '';
    let dateErr = '';
    let phoneErr = '';
    let siteErr = '';
    let aboutErr = '';
    let technologiesErr = '';
    let projectErr = '';

    console.log(this.state.firstName);

    if (this.state.firstName === '') {
      firstNameErr = 'Поле пустое. Заполните пожалуйста.';
      console.log(firstNameErr);
    } else if(this.state.firstName[0] !== this.state.firstName[0].toUpperCase()) {
      firstNameErr ='Данное поле должно начинаться с большой буквы!';
      console.log(firstNameErr);
    }

    if (this.state.lastName === '') {
      lastNameErr = 'Поле пустое. Заполните пожалуйста.';
      console.log(lastNameErr);
    } else if(this.state.lastName[0] !== this.state.lastName[0].toUpperCase()) {
      lastNameErr = 'Данное поле должно начинаться с большой буквы!';
      console.log(lastNameErr);
    }

    if(this.state.date === '') {
      dateErr = 'Поле пустое. Заполните пожалуйста.';
      console.log(dateErr);
    }
    
    const phoneReg = /^[0-9]{1}-[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    if (this.state.phone === '') {
      phoneErr = 'Поле пустое. Заполните пожалуйста.';
      console.log(phoneErr);
    } else if (phoneReg.test(this.state.phone) === false) {
      phoneErr = 'Телефон должен быть формата 7-7777-77-77';
      console.log(phoneErr);
    }
    
    const siteReg = /^https:\/\//;
    if (this.state.site === '') {
      siteErr = 'Поле пустое. Заполните пожалуйста.';
      console.log(siteErr);
    } else if (siteReg.test(this.state.site) === false) {
      siteErr = 'Сайт должен начинаться с https://';
      console.log(siteErr);
    }

    if(this.state.about === '') {
      aboutErr = 'Поле пустое. Заполните пожалуйста.';
      console.log(aboutErr);
    } else if (600 - this.state.about.length < 0) {
      aboutErr = 'Превышен лимит символов в поле';
      console.log(aboutErr);
    }

    if(this.state.technologies === '') {
      technologiesErr = 'Поле пустое. Заполните пожалуйста.';
      console.log(technologiesErr);
    } else if (600 - this.state.technologies.length < 0) {
      technologiesErr = 'Превышен лимит символов в поле';
      console.log(technologiesErr);
    }

    if(this.state.project === '') {
      projectErr = 'Поле пустое. Заполните пожалуйста.';
      console.log(projectErr);
    } else if (600 - this.state.project.length < 0) {
      projectErr = 'Превышен лимит символов в поле';
      console.log(projectErr);
    }
    
    if(firstNameErr || lastNameErr || dateErr || phoneErr || siteErr || aboutErr || technologiesErr || projectErr) {
      this.setState({
        firstNameError: firstNameErr,
        lastNameError: lastNameErr,
        dateError: dateErr,
        phoneError: phoneErr,
        siteError: siteErr,
        aboutError: aboutErr,
        technologiesError: technologiesErr,
        projectError: projectErr,
      })
      return false;
    } else {
      this.setState({
        firstNameError: '',
        lastNameError: '',
        dateError: '',
        phoneError: '',
        siteError: '',
        aboutError: '',
        technologiesError: '',
        projectError: '', 
      })
      return true;
    }
  }

  onSubmit(e) {
    e.preventDefault()
    this.setState({firstName: this.state.firstName.trim(),
      lastName: this.state.lastName.trim(),
      date: this.state.date.trim(),
      phone: this.state.phone.trim(),
      site: this.state.site.trim(),
      about: this.state.about.trim(),
      technologies: this.state.technologies.trim(),
      project: this.state.project.trim(),
    }, () => {
    if(this.validate()) {
      console.log(this.state);
      this.setState({submit: true});
    }});
  }

  onReset(e) {
    this.setState({
      firstName: '',
      lastName: '',
      date: '',
      phone: '',
      site: '',
      about: '',
      technologies: '',
      project: '', 
    })
  }

  render() {
    return (
      <section>
        <div className="wrapper">
          {this.state.submit ?
          <FormData data={this.state}/>:
          <Form data={this}/>
        }
        </div>
      </section>
    )
  }
}

export default HW1;
