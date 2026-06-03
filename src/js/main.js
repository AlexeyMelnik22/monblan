import { BaseHelpers } from './helpers/base-helpers';
import AirDatepicker from 'air-datepicker';

import ScrollReveal from "scrollreveal";

BaseHelpers.checkWebpSupport();

BaseHelpers.calcScrollbarWidth();

BaseHelpers.addTouchClass();

BaseHelpers.addLoadedClass();


//datepicker
let dpFrom, dpTo;

const getWrap = (selector) => document.querySelector(selector).closest('.datepicker-wrap');
const wrapFrom = getWrap('#date-input-from');
const wrapTo = getWrap('#date-input-to');

// Кнопки очищення
const clearFrom = wrapFrom.querySelector('.datepicker-clear');
const clearTo = wrapTo.querySelector('.datepicker-clear');

//нові іконки стрілок
const arrowLeft = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.2608 3.5L11.0833 4.3225L8.41165 7L11.0833 9.6775L10.2608 10.5L6.76081 7L10.2608 3.5Z" fill="black" />
  <path d="M6.4167 3.5L7.2392 4.3225L4.56753 7L7.2392 9.6775L6.4167 10.5L2.9167 7L6.4167 3.5Z" fill="black" />
</svg>`;

const arrowRight = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.73919 3.5L2.91669 4.3225L5.58835 7L2.91669 9.6775L3.73919 10.5L7.23919 7L3.73919 3.5Z" fill="black" />
  <path d="M7.5833 3.5L6.7608 4.3225L9.43247 7L6.7608 9.6775L7.5833 10.5L11.0833 7L7.5833 3.5Z" fill="black" />
</svg>`;

const isMobile = window.innerWidth < 768;

dpFrom = new AirDatepicker('#date-input-from', {
    dateFormat: 'dd.MM.yyyy',
    autoClose: true,
    onSelect({ date }) {
        wrapFrom.classList.toggle('has-value', !!date);
        dpTo.update({ minDate: date || null });
    },
    isMobile: isMobile,    // на мобільних по центру екрана
    autoLayout: true,      // авто позиція на десктопі
    prevHtml: arrowLeft,
    nextHtml: arrowRight,
});

dpTo = new AirDatepicker('#date-input-to', {
    dateFormat: 'dd.MM.yyyy',
    autoClose: true,
    onSelect({ date }) {
        wrapTo.classList.toggle('has-value', !!date);
        dpFrom.update({ maxDate: date || null });
    },
    isMobile: isMobile,    // на мобільних  по центру екрана
    autoLayout: true,      // авто позиція на десктопі
    prevHtml: arrowLeft,
    nextHtml: arrowRight,
});

// Очищаєм Від
clearFrom.addEventListener('click', () => {
    dpFrom.clear();
    wrapFrom.classList.remove('has-value');
    dpTo.update({ minDate: null });
});

// Очищаєм до
clearTo.addEventListener('click', () => {
    dpTo.clear();
    wrapTo.classList.remove('has-value');
    dpFrom.update({ maxDate: null });
});


//card views filter
const viewBtns = document.querySelectorAll('.filter__button');
const cardsGrid = document.querySelector('.cards');

viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Знімаємо обидва класи і додаємо потрібний
        cardsGrid.classList.remove('cards--grid', 'cards--list');
        cardsGrid.classList.add(`cards--${btn.dataset.view}`);
    });
});