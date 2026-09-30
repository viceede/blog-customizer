import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  type OptionType,
  contentWidthArr,
  backgroundColors,
  type ArticleStateType,
} from '@/constants/articleProps';
import { clsx } from 'clsx';
import { useState, useRef, useEffect, type Dispatch, type SetStateAction } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type FormHandlerFunction<T> = (value: T) => void;
type ArticleParamsFormProps = {
  onSubmit: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps): React.JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const paramsFormRef = useRef<HTMLElement | null>(null);

  const [font, setFont] = useState<OptionType>(defaultArticleState.fontFamilyOption);
  const [fontSize, setFontSize] = useState<OptionType>(
    defaultArticleState.fontSizeOption
  );
  const [fontColor, setFontColor] = useState<OptionType>(defaultArticleState.fontColor);
  const [contentWidth, setContentWidth] = useState<OptionType>(
    defaultArticleState.contentWidth
  );
  const [backgroundColor, setBackgroundColor] = useState<OptionType>(
    defaultArticleState.backgroundColor
  );

  function createFormHandler<T>(
    setState: Dispatch<SetStateAction<T>>
  ): FormHandlerFunction<T> {
    const result = (value: T): void => {
      setState(value);
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
    props.onSubmit({
      fontFamilyOption: font,
      fontColor: fontColor,
      backgroundColor: backgroundColor,
      contentWidth: contentWidth,
      fontSizeOption: fontSize,
    });
  }

  function onReset(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    props.onSubmit(defaultArticleState);
    setFont(defaultArticleState.fontFamilyOption);
    setFontSize(defaultArticleState.fontSizeOption);
    setFontColor(defaultArticleState.fontColor);
    setContentWidth(defaultArticleState.contentWidth);
    setBackgroundColor(defaultArticleState.backgroundColor);
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
            selected={font}
            options={fontFamilyOptions}
            onChange={createFormHandler<OptionType>(setFont)}
          />

          <RadioGroup
            title="размер шрифта"
            options={fontSizeOptions}
            selected={fontSize}
            name="font-size"
            onChange={createFormHandler<OptionType>(setFontSize)}
          />

          <Select
            title="цвет шрифта"
            selected={fontColor}
            options={fontColors}
            onChange={createFormHandler<OptionType>(setFontColor)}
          />

          <Separator />

          <Select
            title="цвет фона"
            selected={backgroundColor}
            options={backgroundColors}
            onChange={createFormHandler<OptionType>(setBackgroundColor)}
          />

          <Select
            title="ширина контента"
            selected={contentWidth}
            options={contentWidthArr}
            onChange={createFormHandler<OptionType>(setContentWidth)}
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
