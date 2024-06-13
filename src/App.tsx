import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { Gap } from '@alfalab/core-components/gap';
import { SliderInput, SliderInputProps } from '@alfalab/core-components/slider-input';
import { Typography } from '@alfalab/core-components/typography';
import { useState } from 'react';
import { appSt } from './style.css';

const min = 30_000;
const max = 700_000;
const step = 1000;
const range: SliderInputProps['range'] = {
  min: [min],
  max: [max],
};
const pips: SliderInputProps['pips'] = {
  mode: 'values',
  values: [min, max],
  format: {
    to: (value: number) => {
      return `${value.toLocaleString('ru')} ₽`;
    },
  },
};

function calculatePayment(principal: number, interestRate: number, term: number) {
  const monthlyInterestRate = interestRate / 12;
  const exponent = Math.pow(1 + monthlyInterestRate, term);

  return (principal * monthlyInterestRate * exponent) / (exponent - 1);
}

export const App = () => {
  const [value, setValue] = useState<number | string>(min);

  const handleInputChange: SliderInputProps['onInputChange'] = (_, { value }) => {
    setValue(typeof value === 'string' ? Number(value.replace(/ /g, '')) : value);
  };

  const handleSliderChange: SliderInputProps['onSliderChange'] = ({ value }) => {
    setValue(value);
  };

  const numberValue = typeof value === 'string' ? Number(value.replace(/ /g, '')) : value;
  const handleBlur = () => {
    setValue(Math.max(min, Math.min(max, numberValue)));
  };

  const monthlyPayment = calculatePayment(numberValue, numberValue > 700_000 ? 0.21 : 0.36, 60).toFixed(0);

  return (
    <>
      <div className={appSt.container}>
        <Typography.TitleResponsive defaultMargins font="system" tag="h1" view="small" weight="bold">
          Вам одобрен кредит наличными
        </Typography.TitleResponsive>
        <Typography.Text tag="p" view="primary-medium" weight="bold" defaultMargins={false}>
          Сумма и срок кредита
        </Typography.Text>
        <SliderInput
          block
          value={value.toLocaleString('ru')}
          sliderValue={numberValue}
          onInputChange={handleInputChange}
          onSliderChange={handleSliderChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          range={range}
          pips={pips}
          step={step}
          size={56}
          rightAddons="₽"
          fieldClassName={appSt.slider}
          sliderClassName={appSt.slid}
        />

        <Typography.Text tag="p" view="primary-medium" weight="bold" defaultMargins={false}>
          Ежемесячный платёж
        </Typography.Text>

        <div className={appSt.card}>
          <Typography.TitleResponsive font="system" tag="h2" view="xsmall" weight="bold">
            {Number(monthlyPayment).toLocaleString('ru')} ₽ / мес
          </Typography.TitleResponsive>
          <Typography.Text tag="p" view="primary-small" defaultMargins={false}>
            Ставка {numberValue > 700_000 ? '16%' : '17%'}
          </Typography.Text>

          <div className={appSt.line}>
            <CDNIcon name="glyph_checkmark_m" color="#23B100" />
            <Typography.Text tag="p" view="primary-small" defaultMargins={false}>
              Защита кредита
            </Typography.Text>
          </div>
        </div>
      </div>
      <Gap size={96} />
      <div className={appSt.bottomBtn}>
        <ButtonMobile block view="primary" className={appSt.btn}>
          <div className={appSt.btnContainer}>
            <div>
              <Typography.TitleResponsive font="system" tag="h2" view="xsmall" weight="bold">
                {Number(monthlyPayment).toLocaleString('ru')} ₽
              </Typography.TitleResponsive>
              <Typography.Text style={{ color: '#A1A1A1' }} tag="p" view="primary-small" defaultMargins={false}>
                Платеж в месяц
              </Typography.Text>
            </div>

            <div className={appSt.btnContainer}>
              <div>
                <Typography.TitleResponsive font="system" tag="h2" view="xsmall" weight="bold">
                  {numberValue > 700_000 ? '16%' : '17%'}
                </Typography.TitleResponsive>
                <Typography.Text style={{ color: '#A1A1A1' }} tag="p" view="primary-medium" defaultMargins={false}>
                  Ставка
                </Typography.Text>
              </div>
              <CDNIcon name="glyph_chevron-right_m" />
            </div>
          </div>
        </ButtonMobile>
      </div>
    </>
  );
};
