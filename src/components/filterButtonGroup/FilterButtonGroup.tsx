import { Button } from '../Button';

type FilterValue = string;

type Props = {
  filters: FilterValue[];
  active: FilterValue;
  onChange: (filter: FilterValue) => void;
  title: string;
};

export const FilterButtonGroup = ({
  filters,
  active,
  onChange,
  title,
}: Props) => {
  const classNames = {
    container: 'flex items-center gap-[10px]',
    activeFilter: 'text-primary border-primary',
    NotActiveFilter: '',
  };
  return (
    <div className={classNames.container}>
      <h2>{title}</h2>
      {filters.map((filter) => {
        const onClick = () => onChange(filter);
        return (
          <Button
            key={filter}
            variant='filter'
            className={
              active === filter
                ? classNames.activeFilter
                : classNames.NotActiveFilter
            }
            onClick={onClick}
          >
            {filter}
          </Button>
        );
      })}
    </div>
  );
};
