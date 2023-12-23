function FormInput({ index, label, type }) {
  return (
    <div key={index} className="mb-4">
      <div className="text-neutral-200">{label}</div>
      <div>
        <input
          className="h-14 w-96 rounded-lg bg-neutral-200/30 p-4 duration-150 ease-in-out hover:border-2 hover:border-neutral-200"
          type={type}
        />
      </div>
    </div>
  );
}

export default FormInput;
