const PageContent = ({ title, children }) => {
  return (
    <div className="text-center text-danger">
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default PageContent;
