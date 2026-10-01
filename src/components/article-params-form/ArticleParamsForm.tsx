import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  contentWidthArr,
  backgroundColors,
  type ArticleStateType,
} from '@/constants/articleProps';
import { clsx } from 'clsx';
import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type FormHandler<K extends keyof ArticleStateType> = (
  value: ArticleStateType[K]
) => void;

type ArticleParamsFormProps = {
  onSubmit: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps): React.JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const paramsFormRef = useRef<HTMLElement | null>(null);

  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

  function createFormHandler<K extends keyof ArticleStateType>(key: K): FormHandler<K> {
    const result: FormHandler<K> = (value): void => {
      setFormState((previousState) => ({
        ...previousState,
        [key]: value,
      }));
    };
    return result;
  }

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent): void {
      if (paramsFormRef.current && !paramsFormRef.current.contains(e.target as Node)) {
        setIsSidebarOpen(false);
      }
    }

    if (!isSidebarOpen) {
      return;
    }
    document.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  function onApply(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    props.onSubmit(formState);
  }

  function onReset(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    props.onSubmit(defaultArticleState);
    setFormState(defaultArticleState);
  }

  return (
    <>
      <ArrowButton
        isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <aside
        className={clsx(styles.container, isSidebarOpen && styles.container_open)}
        ref={paramsFormRef}
      >
        <form className={styles.form} onSubmit={onApply} onReset={onReset}>
          <Text
            as="h2"
            size={31}
            weight={800}
            fontStyle="normal"
            uppercase={true}
            family="open-sans"
          >
            задайте параметры
          </Text>

          <Select
            title="шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={createFormHandler('fontFamilyOption')}
          />

          <RadioGroup
            title="размер шрифта"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            name="font-size"
            onChange={createFormHandler('fontSizeOption')}
          />

          <Select
            title="цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={createFormHandler('fontColor')}
          />

          <Separator />

          <Select
            title="цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={createFormHandler('backgroundColor')}
          />

          <Select
            title="ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={createFormHandler('contentWidth')}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
