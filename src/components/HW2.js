import React, { useState, useEffect } from 'react';
import '../App.css';
import Form from './Form';
import FormData from './FormData';

function HW2() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const [site, setSite] = useState('');
  const [about, setAbout] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [project, setProject] = useState('');

  const [firstNameError, setfirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [dateError, setDateError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [siteError, setSiteError] = useState('');
  const [aboutError, setAboutError] = useState('');
  const [technologiesError, setTechnologiesError] = useState('');
  const [projectError, setProjectError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  function validate() {
    let firstNameErr = '';
    let lastNameErr = '';
    let dateErr = '';
    let phoneErr = '';
    let siteErr = '';
    let aboutErr = '';
    let technologiesErr = '';
    let projectErr = '';

    if (firstName === '') {
      firstNameErr = 'Поле пустое. Заполните пожалуйста.';
    } else if(firstName[0] !== firstName[0].toUpperCase()) {
      firstNameErr ='Данное поле должно начинаться с большой буквы!';
    }

    if (lastName === '') {
      lastNameErr = 'Поле пустое. Заполните пожалуйста.';
    } else if(lastName[0] !== lastName[0].toUpperCase()) {
      lastNameErr = 'Данное поле должно начинаться с большой буквы!';
    }

    if(date === '') {
      dateErr = 'Поле пустое. Заполните пожалуйста.';
    }
    
    const phoneReg = /^[0-9]{1}-[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    if (phone === '') {
      phoneErr = 'Поле пустое. Заполните пожалуйста.';
    } else if (phoneReg.test(phone) === false) {
      phoneErr = 'Телефон должен быть формата 7-7777-77-77';
    }
    
    const siteReg = /^https:\/\//;
    if (site === '') {
      siteErr = 'Поле пустое. Заполните пожалуйста.';
    } else if (siteReg.test(site) === false) {
      siteErr = 'Сайт должен начинаться с https://';
    }

    if(about === '') {
      aboutErr = 'Поле пустое. Заполните пожалуйста.';
    } else if (600 - about.length < 0) {
      aboutErr = 'Превышен лимит символов в поле';
    }

    if(technologies === '') {
      technologiesErr = 'Поле пустое. Заполните пожалуйста.';
    } else if (600 - technologies.length < 0) {
      technologiesErr = 'Превышен лимит символов в поле';
    }

    if(project === '') {
      projectErr = 'Поле пустое. Заполните пожалуйста.';
    } else if (600 - project.length < 0) {
      projectErr = 'Превышен лимит символов в поле';
    }
    
    if(firstNameErr || lastNameErr || dateErr || phoneErr || siteErr || aboutErr || technologiesErr || projectErr) {
      setfirstNameError(firstNameErr);
      setLastNameError(lastNameErr);
      setDateError(dateErr);
      setPhoneError(phoneErr);
      setSiteError(siteErr);
      setAboutError(aboutErr);
      setTechnologiesError(technologiesErr);
      setProjectError(projectErr);
  
      return false;
    } else {
      setfirstNameError('');
      setLastNameError('');
      setDateError('');
      setPhoneError('');
      setSiteError('');
      setAboutError('');
      setTechnologiesError('');
      setProjectError('');
      return true;
    }
  }

  
  function onSubmit(e) {
    e.preventDefault();
    setFirstName(firstName.trim());
    setLastName(lastName.trim());
    setDate(date.trim());
    setPhone(phone.trim());
    setSite(site.trim());
    setAbout(about.trim());
    setTechnologies(technologies.trim());
    setProject(project.trim());
    setSubmitted(true);
  }

  useEffect(() => {
    if (submitted) {
      if ( validate()) {
        console.log('aaa');
        setIsFormValid(true);
    }
  }
    setSubmitted(false);
  });

  function onReset(e) {
    setFirstName('');
    setLastName('');
    setDate('');
    setPhone('');
    setSite('');
    setAbout('');
    setTechnologies('');
    setProject('');
  }

    return (
      <section>
        <div className="wrapper">
          {isFormValid ? <FormData 
            firstName = {firstName}
            lastName = {lastName}
            date = {date}
            phone = {phone}
            site = {site}
            about = {about}
            technologies = {technologies}
            project = {project}
          /> :
          <Form isFormValid = {isFormValid} 
            setIsFormValid = {setIsFormValid}
            firstName = {firstName}
            setFirstName = {setFirstName}
            lastName = {lastName}
            setLastName = {setLastName}
            date = {date}
            setDate = {setDate}
            phone = {phone}
            setPhone = {setPhone}
            site = {site}
            setSite = {setSite}
            about = {about}
            setAbout = {setAbout}
            technologies = {technologies}
            setTechnologies = {setTechnologies}
            project = {project}
            setProject = {setProject}
            onSubmit = {onSubmit}
            onReset = {onReset}

            firstNameError = {firstNameError}
            lastNameError = {lastNameError}
            dateError = {dateError}
            phoneError = {phoneError}
            siteError = {siteError}
            aboutError = {aboutError}
            technologiesError = {technologiesError}
            projectError = {projectError}
          />
          }
        
        </div>
      </section>
    )
}

export default HW2;
