import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { setWindowClass } from '@app/utils/helpers';
import { Checkbox } from '@profabric/react-components';
import * as Yup from 'yup';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from '@app/styles/common';
import { login } from '@store/reducers/auth';

export const Login = () => {
  const [isAuthLoading, setAuthLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t] = useTranslation();

  const handleLogin = async (email, password) => {
    setAuthLoading(true);
    try {
      await dispatch(login(email, password));
      toast.success('Login succeeded!');
      setAuthLoading(false);
      navigate('/');
    } catch (error) {
      setAuthLoading(false);
      toast.error(error.message || 'Failed');
    }
  };

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Required'),
      password: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
      handleLogin(values.email, values.password);
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
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email"
                  onChange={handleChange}
                  value={values.email}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                />
                {touched.email && errors.email ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
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
                <Button loading={isAuthLoading} onClick={handleSubmit}>
                  {t('login.button.signIn.label')}
                </Button>
              </div>
            </div>
          </form>
          <div className="social-auth-links text-center mt-2 mb-3"></div>
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
  );
};
