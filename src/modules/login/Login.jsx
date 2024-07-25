import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { setAuthentication } from '@store/reducers/auth';
import { setWindowClass } from '@app/utils/helpers';
import { Checkbox } from '@profabric/react-components';
import * as Yup from 'yup';

import { authLogin } from '../../service/authuser';
import  Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { Button } from '@app/styles/common';

export const Login = () => {

  const [isAuthLoading, setAuthLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [t] = useTranslation();

  const login = async (username, password) => {
    try {
      setAuthLoading(true);
      const response = await authLogin(username, password);
      dispatch(setAuthentication(response));
      toast.success('Login is succeed!');
      setAuthLoading(false);
      navigate('/');
    } catch (error) {
      console.log(error)
      setAuthLoading(false);
      toast.error(error.response.message || 'Failed');
    }
  };

  

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
      login(values.username, values.password);
    },
  });

  setWindowClass('hold-transition login-page');
  return (
    <div className="login-box">
    <div className="card card-outline card-primary">
      <div className="card-header text-center">
        <Link to="/" className="h1">
          <b>Admin</b>
          <span>LTE</span>
        </Link>
      </div>
      <div className="card-body">
        <p className="login-box-msg">{t('login.label.signIn')}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <InputGroup className="mb-3">
              <Form.Control
                id="username"
                name="username"
                type="username"
                placeholder="username"
                onChange={handleChange}
                value={values.username}
                isValid={touched.username && !errors.username}
                isInvalid={touched.username && !!errors.username}
              />
              {touched.username && errors.username ? (
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              ) : (
                  <InputGroup.Text>
                    <i className="fas fa-envelope" />
                  </InputGroup.Text>
              )}
            </InputGroup>
          </div>
          <div className="mb-3">
            <InputGroup className="mb-3">
              <Form.Control
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
                isValid={touched.password && !errors.password}
                isInvalid={touched.password && !!errors.password}
              />
              {touched.password && errors.password ? (
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              ) : (
                  <InputGroup.Text>
                    <i className="fas fa-lock" />
                  </InputGroup.Text>
              )}
            </InputGroup>
          </div>

          <div className="row">
            <div className="col-8">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox checked={false} />
                <label style={{ margin: 0, padding: 0, paddingLeft: '4px' }}>
                  {t('login.label.rememberMe')}
                </label>
              </div>
            </div>
            <div className="col-4">
              <Button
                loading={isAuthLoading}
               
                onClick={handleSubmit}
              >
                {t('login.button.signIn.label')}
              </Button>
            </div>
          </div>
        </form>
        <div className="social-auth-links text-center mt-2 mb-3">
          
        </div>
        <p className="mb-1">
          <Link to="/forgot-password">{t('login.label.forgotPass')}</Link>
        </p>
        <p className="mb-0">
          <Link to="/register" className="text-center">
            {t('login.label.registerNew')}
          </Link>
        </p>
      </div>
    </div>
  </div>
  )
}
