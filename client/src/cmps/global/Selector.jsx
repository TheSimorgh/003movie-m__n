/* eslint-disable react/prop-types */

const Selector = ({
  name,
  options,
  value,
  label,
  classname,
  onChange,
  ...rest
}) => {
  return (
    <select
      className={
        classname
          ? classname
          : "border-2 bg-white dark:bg-primary dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary p-1 pr-10 outline-none transition rounded bg-transparent text-light-subtle dark:text-dark-subtle dark:focus:text-white focus:text-primary"
      }
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      {...rest}
    >
      <option value="">{label}</option>
      {options.map(({ title, value }) => {
        return (
          <option key={title} value={value}>
            {title}
          </option>
        );
      })}
    </select>
  );
};

export default Selector;
