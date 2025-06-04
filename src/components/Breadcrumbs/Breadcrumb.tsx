interface BreadcrumbProps {
  pageName: string;
}

const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-[20px] font-bold leading-[30px] text-dark dark:text-white">
        {pageName}
      </h1>
    </div>
  );
};

export default Breadcrumb;
