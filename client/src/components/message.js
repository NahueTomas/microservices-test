export const Message = ({children}) => {
  return (
    <div className="h-100 flex items-center justify-center">
      <p className="text-center h-100 text-xl">
        {children}
      </p>
    </div>
  );
}

