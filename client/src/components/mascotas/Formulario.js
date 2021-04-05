import { useState } from 'react';
import styled from 'styled-components';

import uuid from 'react-uuid';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Input = styled.input`
  height: 38px;
  padding: 6px 10px;
  background-color: #fff;
  border: 1px solid #f25287;
  border-radius: 4px;
  box-shadow: none;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
  transition: 400ms;
  width: 100%;

  &:focus {
    outline: none;
    background-color: #f9f3f3;
  }
`;

const TextArea = styled.textarea`
  min-height: 65px;
  width: 100%;
  background-color: #fff;
  border: 1px solid #f25287;
  border-radius: 4px;
  font-family: 'Montserrat';

  &:focus {
    outline: none;
    background-color: #f9f3f3;
  }
`;

export const BtnSubmit = styled.button`
  background-color: #f25287;
  display: inline-block;
  height: 38px;
  padding: 0 30px;
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 4px;
  border: 1px solid #bbb;
  cursor: pointer;
  margin-top: 1rem;
  color: white;
  transition: 400ms;
  width: 100%;

  &:hover {
    background-color: #c54771;
  }
`;

const AlertaError = styled.p`
  background-color: #fff;
    color: red;
    padding: 1rem;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    margin-top: 10px;
}
`;

const Formulario = ({ crearCita }) => {
  const [error, setError] = useState(false);

  const [cita, setCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: '',
  });

  const handleChange = (e) => {
    setCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  const { mascota, propietario, fecha, hora, sintomas } = cita;

  const submitCita = (e) => {
    e.preventDefault();

    if (
      mascota.trim() === '' ||
      propietario.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === ''
    ) {
      setError(true);
    } else {
      setError(false);

      cita.id = uuid();

      crearCita(cita);

      setCita({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
      });
    }
  };

  return (
    <Form onSubmit={submitCita}>
      <Label>Nombre mascota</Label>
      <Input
        type="text"
        placeholder="Escribe el nombre de la mascota"
        name="mascota"
        value={mascota}
        onChange={handleChange}
      />
      <Label>Nombre propietario</Label>
      <Input
        type="text"
        placeholder="Escribe el nombre del propietario"
        name="propietario"
        value={propietario}
        onChange={handleChange}
      />
      <Label>Fecha de registro</Label>
      <Input value={fecha} name="fecha" onChange={handleChange} type="date" />
      <Label>Hora</Label>
      <Input value={hora} name="hora" onChange={handleChange} type="time" />
      <Label>Síntomas</Label>
      <TextArea value={sintomas} name="sintomas" onChange={handleChange} />
      {error && <AlertaError>Todos los campos son obligatorios</AlertaError>}
      <BtnSubmit type="submit">Agregar Cita</BtnSubmit>
    </Form>
  );
};

export default Formulario;
