import { style } from '@vanilla-extract/css';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: 'calc(100% - 2rem)',
  padding: '1rem',
  bottom: 0,
});

const container = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
});

const card = style({
  backgroundColor: '#F3F4F5',
  padding: '12px 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem',
  borderRadius: '24px',
  width: 'max-content',
});

const slider = style({
  borderRadius: '1rem !important',
});

const btnContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'left',
  gap: '1rem',
});
const btn = style({
  borderRadius: '24px',
  padding: '1rem',
});

const line = style({
  display: 'flex',
  gap: '.25rem',
  alignItems: 'center',
});

const slid = style({
  width: 'calc(100% - var(--slider-input-progress-margin-horizontal) * 2) !important',
});

export const appSt = {
  bottomBtn,
  container,
  card,
  slider,
  btnContainer,
  btn,
  line,
  slid,
};
