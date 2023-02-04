export default function handleChange(e, formData, setFormData) {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};