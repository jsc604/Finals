import React from 'react';

const Form = ({ formData, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <input type="text" name="example" onChange={handleChange} />
    <button type="submit">Submit</button>
  </form>
);

export default Form;