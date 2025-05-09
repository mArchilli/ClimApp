function ErrorMessage({ message }) {
    return (
      <div className="bg-gray-100 border-l-4 border-black p-4 my-4 rounded">
        <p className="text-red-600">{message}</p>
        <p className="mt-2">Por favor, intenta con otra ciudad o verifica tu conexión a internet.</p>
      </div>
    )
  }
  
  export default ErrorMessage
  