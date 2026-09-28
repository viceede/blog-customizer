import { clsx } from 'clsx';
import { useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = (): React.JSX.Element => {
  const [formState, setFormState] = useState(false);

  const handleArrowClick = (): void => {
    setFormState(!formState);
  };

  return (
    <>
      <ArrowButton isOpen={formState} onClick={handleArrowClick} />
      <aside className={clsx(styles.container, formState && styles.container_open)}>
        <form className={styles.form}>
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
