const ImageUploadInput = ({
  register,
  error,
  id = "imagen",
  name = "imagen",
  label = "Imagen",
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        type="file"
        accept="image/*"
        {...register(name)}
      />

      {error && <span className="error">{error.message}</span>}
    </div>
  );
};

export default ImageUploadInput;
